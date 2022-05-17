package co.edu.sena.web.rest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import co.edu.sena.IntegrationTest;
import co.edu.sena.domain.Combos;
import co.edu.sena.repository.CombosRepository;
import java.util.List;
import java.util.Random;
import java.util.concurrent.atomic.AtomicLong;
import javax.persistence.EntityManager;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;

/**
 * Integration tests for the {@link CombosResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class CombosResourceIT {

    private static final Double DEFAULT_PRICE_COMBO = 1D;
    private static final Double UPDATED_PRICE_COMBO = 2D;

    private static final String ENTITY_API_URL = "/api/combos";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong count = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private CombosRepository combosRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restCombosMockMvc;

    private Combos combos;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Combos createEntity(EntityManager em) {
        Combos combos = new Combos().priceCombo(DEFAULT_PRICE_COMBO);
        return combos;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Combos createUpdatedEntity(EntityManager em) {
        Combos combos = new Combos().priceCombo(UPDATED_PRICE_COMBO);
        return combos;
    }

    @BeforeEach
    public void initTest() {
        combos = createEntity(em);
    }

    @Test
    @Transactional
    void createCombos() throws Exception {
        int databaseSizeBeforeCreate = combosRepository.findAll().size();
        // Create the Combos
        restCombosMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(combos)))
            .andExpect(status().isCreated());

        // Validate the Combos in the database
        List<Combos> combosList = combosRepository.findAll();
        assertThat(combosList).hasSize(databaseSizeBeforeCreate + 1);
        Combos testCombos = combosList.get(combosList.size() - 1);
        assertThat(testCombos.getPriceCombo()).isEqualTo(DEFAULT_PRICE_COMBO);
    }

    @Test
    @Transactional
    void createCombosWithExistingId() throws Exception {
        // Create the Combos with an existing ID
        combos.setId(1L);

        int databaseSizeBeforeCreate = combosRepository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restCombosMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(combos)))
            .andExpect(status().isBadRequest());

        // Validate the Combos in the database
        List<Combos> combosList = combosRepository.findAll();
        assertThat(combosList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void checkPriceComboIsRequired() throws Exception {
        int databaseSizeBeforeTest = combosRepository.findAll().size();
        // set the field null
        combos.setPriceCombo(null);

        // Create the Combos, which fails.

        restCombosMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(combos)))
            .andExpect(status().isBadRequest());

        List<Combos> combosList = combosRepository.findAll();
        assertThat(combosList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void getAllCombos() throws Exception {
        // Initialize the database
        combosRepository.saveAndFlush(combos);

        // Get all the combosList
        restCombosMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(combos.getId().intValue())))
            .andExpect(jsonPath("$.[*].priceCombo").value(hasItem(DEFAULT_PRICE_COMBO.doubleValue())));
    }

    @Test
    @Transactional
    void getCombos() throws Exception {
        // Initialize the database
        combosRepository.saveAndFlush(combos);

        // Get the combos
        restCombosMockMvc
            .perform(get(ENTITY_API_URL_ID, combos.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(combos.getId().intValue()))
            .andExpect(jsonPath("$.priceCombo").value(DEFAULT_PRICE_COMBO.doubleValue()));
    }

    @Test
    @Transactional
    void getNonExistingCombos() throws Exception {
        // Get the combos
        restCombosMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putNewCombos() throws Exception {
        // Initialize the database
        combosRepository.saveAndFlush(combos);

        int databaseSizeBeforeUpdate = combosRepository.findAll().size();

        // Update the combos
        Combos updatedCombos = combosRepository.findById(combos.getId()).get();
        // Disconnect from session so that the updates on updatedCombos are not directly saved in db
        em.detach(updatedCombos);
        updatedCombos.priceCombo(UPDATED_PRICE_COMBO);

        restCombosMockMvc
            .perform(
                put(ENTITY_API_URL_ID, updatedCombos.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(updatedCombos))
            )
            .andExpect(status().isOk());

        // Validate the Combos in the database
        List<Combos> combosList = combosRepository.findAll();
        assertThat(combosList).hasSize(databaseSizeBeforeUpdate);
        Combos testCombos = combosList.get(combosList.size() - 1);
        assertThat(testCombos.getPriceCombo()).isEqualTo(UPDATED_PRICE_COMBO);
    }

    @Test
    @Transactional
    void putNonExistingCombos() throws Exception {
        int databaseSizeBeforeUpdate = combosRepository.findAll().size();
        combos.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restCombosMockMvc
            .perform(
                put(ENTITY_API_URL_ID, combos.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(combos))
            )
            .andExpect(status().isBadRequest());

        // Validate the Combos in the database
        List<Combos> combosList = combosRepository.findAll();
        assertThat(combosList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchCombos() throws Exception {
        int databaseSizeBeforeUpdate = combosRepository.findAll().size();
        combos.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restCombosMockMvc
            .perform(
                put(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(combos))
            )
            .andExpect(status().isBadRequest());

        // Validate the Combos in the database
        List<Combos> combosList = combosRepository.findAll();
        assertThat(combosList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamCombos() throws Exception {
        int databaseSizeBeforeUpdate = combosRepository.findAll().size();
        combos.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restCombosMockMvc
            .perform(put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(combos)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the Combos in the database
        List<Combos> combosList = combosRepository.findAll();
        assertThat(combosList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateCombosWithPatch() throws Exception {
        // Initialize the database
        combosRepository.saveAndFlush(combos);

        int databaseSizeBeforeUpdate = combosRepository.findAll().size();

        // Update the combos using partial update
        Combos partialUpdatedCombos = new Combos();
        partialUpdatedCombos.setId(combos.getId());

        partialUpdatedCombos.priceCombo(UPDATED_PRICE_COMBO);

        restCombosMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedCombos.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedCombos))
            )
            .andExpect(status().isOk());

        // Validate the Combos in the database
        List<Combos> combosList = combosRepository.findAll();
        assertThat(combosList).hasSize(databaseSizeBeforeUpdate);
        Combos testCombos = combosList.get(combosList.size() - 1);
        assertThat(testCombos.getPriceCombo()).isEqualTo(UPDATED_PRICE_COMBO);
    }

    @Test
    @Transactional
    void fullUpdateCombosWithPatch() throws Exception {
        // Initialize the database
        combosRepository.saveAndFlush(combos);

        int databaseSizeBeforeUpdate = combosRepository.findAll().size();

        // Update the combos using partial update
        Combos partialUpdatedCombos = new Combos();
        partialUpdatedCombos.setId(combos.getId());

        partialUpdatedCombos.priceCombo(UPDATED_PRICE_COMBO);

        restCombosMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedCombos.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedCombos))
            )
            .andExpect(status().isOk());

        // Validate the Combos in the database
        List<Combos> combosList = combosRepository.findAll();
        assertThat(combosList).hasSize(databaseSizeBeforeUpdate);
        Combos testCombos = combosList.get(combosList.size() - 1);
        assertThat(testCombos.getPriceCombo()).isEqualTo(UPDATED_PRICE_COMBO);
    }

    @Test
    @Transactional
    void patchNonExistingCombos() throws Exception {
        int databaseSizeBeforeUpdate = combosRepository.findAll().size();
        combos.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restCombosMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, combos.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(combos))
            )
            .andExpect(status().isBadRequest());

        // Validate the Combos in the database
        List<Combos> combosList = combosRepository.findAll();
        assertThat(combosList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchCombos() throws Exception {
        int databaseSizeBeforeUpdate = combosRepository.findAll().size();
        combos.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restCombosMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(combos))
            )
            .andExpect(status().isBadRequest());

        // Validate the Combos in the database
        List<Combos> combosList = combosRepository.findAll();
        assertThat(combosList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamCombos() throws Exception {
        int databaseSizeBeforeUpdate = combosRepository.findAll().size();
        combos.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restCombosMockMvc
            .perform(patch(ENTITY_API_URL).contentType("application/merge-patch+json").content(TestUtil.convertObjectToJsonBytes(combos)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the Combos in the database
        List<Combos> combosList = combosRepository.findAll();
        assertThat(combosList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteCombos() throws Exception {
        // Initialize the database
        combosRepository.saveAndFlush(combos);

        int databaseSizeBeforeDelete = combosRepository.findAll().size();

        // Delete the combos
        restCombosMockMvc
            .perform(delete(ENTITY_API_URL_ID, combos.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Combos> combosList = combosRepository.findAll();
        assertThat(combosList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
