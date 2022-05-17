package co.edu.sena.web.rest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import co.edu.sena.IntegrationTest;
import co.edu.sena.domain.Promos;
import co.edu.sena.repository.PromosRepository;
import java.time.LocalDate;
import java.time.ZoneId;
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
 * Integration tests for the {@link PromosResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class PromosResourceIT {

    private static final LocalDate DEFAULT_DATE_START = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_DATE_START = LocalDate.now(ZoneId.systemDefault());

    private static final LocalDate DEFAULT_DATE_END = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_DATE_END = LocalDate.now(ZoneId.systemDefault());

    private static final Long DEFAULT_PRICE_PROMO = 1L;
    private static final Long UPDATED_PRICE_PROMO = 2L;

    private static final String ENTITY_API_URL = "/api/promos";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong count = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private PromosRepository promosRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restPromosMockMvc;

    private Promos promos;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Promos createEntity(EntityManager em) {
        Promos promos = new Promos().dateStart(DEFAULT_DATE_START).dateEnd(DEFAULT_DATE_END).pricePromo(DEFAULT_PRICE_PROMO);
        return promos;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Promos createUpdatedEntity(EntityManager em) {
        Promos promos = new Promos().dateStart(UPDATED_DATE_START).dateEnd(UPDATED_DATE_END).pricePromo(UPDATED_PRICE_PROMO);
        return promos;
    }

    @BeforeEach
    public void initTest() {
        promos = createEntity(em);
    }

    @Test
    @Transactional
    void createPromos() throws Exception {
        int databaseSizeBeforeCreate = promosRepository.findAll().size();
        // Create the Promos
        restPromosMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(promos)))
            .andExpect(status().isCreated());

        // Validate the Promos in the database
        List<Promos> promosList = promosRepository.findAll();
        assertThat(promosList).hasSize(databaseSizeBeforeCreate + 1);
        Promos testPromos = promosList.get(promosList.size() - 1);
        assertThat(testPromos.getDateStart()).isEqualTo(DEFAULT_DATE_START);
        assertThat(testPromos.getDateEnd()).isEqualTo(DEFAULT_DATE_END);
        assertThat(testPromos.getPricePromo()).isEqualTo(DEFAULT_PRICE_PROMO);
    }

    @Test
    @Transactional
    void createPromosWithExistingId() throws Exception {
        // Create the Promos with an existing ID
        promos.setId(1L);

        int databaseSizeBeforeCreate = promosRepository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restPromosMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(promos)))
            .andExpect(status().isBadRequest());

        // Validate the Promos in the database
        List<Promos> promosList = promosRepository.findAll();
        assertThat(promosList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void checkDateStartIsRequired() throws Exception {
        int databaseSizeBeforeTest = promosRepository.findAll().size();
        // set the field null
        promos.setDateStart(null);

        // Create the Promos, which fails.

        restPromosMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(promos)))
            .andExpect(status().isBadRequest());

        List<Promos> promosList = promosRepository.findAll();
        assertThat(promosList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void checkDateEndIsRequired() throws Exception {
        int databaseSizeBeforeTest = promosRepository.findAll().size();
        // set the field null
        promos.setDateEnd(null);

        // Create the Promos, which fails.

        restPromosMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(promos)))
            .andExpect(status().isBadRequest());

        List<Promos> promosList = promosRepository.findAll();
        assertThat(promosList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void checkPricePromoIsRequired() throws Exception {
        int databaseSizeBeforeTest = promosRepository.findAll().size();
        // set the field null
        promos.setPricePromo(null);

        // Create the Promos, which fails.

        restPromosMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(promos)))
            .andExpect(status().isBadRequest());

        List<Promos> promosList = promosRepository.findAll();
        assertThat(promosList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void getAllPromos() throws Exception {
        // Initialize the database
        promosRepository.saveAndFlush(promos);

        // Get all the promosList
        restPromosMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(promos.getId().intValue())))
            .andExpect(jsonPath("$.[*].dateStart").value(hasItem(DEFAULT_DATE_START.toString())))
            .andExpect(jsonPath("$.[*].dateEnd").value(hasItem(DEFAULT_DATE_END.toString())))
            .andExpect(jsonPath("$.[*].pricePromo").value(hasItem(DEFAULT_PRICE_PROMO.intValue())));
    }

    @Test
    @Transactional
    void getPromos() throws Exception {
        // Initialize the database
        promosRepository.saveAndFlush(promos);

        // Get the promos
        restPromosMockMvc
            .perform(get(ENTITY_API_URL_ID, promos.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(promos.getId().intValue()))
            .andExpect(jsonPath("$.dateStart").value(DEFAULT_DATE_START.toString()))
            .andExpect(jsonPath("$.dateEnd").value(DEFAULT_DATE_END.toString()))
            .andExpect(jsonPath("$.pricePromo").value(DEFAULT_PRICE_PROMO.intValue()));
    }

    @Test
    @Transactional
    void getNonExistingPromos() throws Exception {
        // Get the promos
        restPromosMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putNewPromos() throws Exception {
        // Initialize the database
        promosRepository.saveAndFlush(promos);

        int databaseSizeBeforeUpdate = promosRepository.findAll().size();

        // Update the promos
        Promos updatedPromos = promosRepository.findById(promos.getId()).get();
        // Disconnect from session so that the updates on updatedPromos are not directly saved in db
        em.detach(updatedPromos);
        updatedPromos.dateStart(UPDATED_DATE_START).dateEnd(UPDATED_DATE_END).pricePromo(UPDATED_PRICE_PROMO);

        restPromosMockMvc
            .perform(
                put(ENTITY_API_URL_ID, updatedPromos.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(updatedPromos))
            )
            .andExpect(status().isOk());

        // Validate the Promos in the database
        List<Promos> promosList = promosRepository.findAll();
        assertThat(promosList).hasSize(databaseSizeBeforeUpdate);
        Promos testPromos = promosList.get(promosList.size() - 1);
        assertThat(testPromos.getDateStart()).isEqualTo(UPDATED_DATE_START);
        assertThat(testPromos.getDateEnd()).isEqualTo(UPDATED_DATE_END);
        assertThat(testPromos.getPricePromo()).isEqualTo(UPDATED_PRICE_PROMO);
    }

    @Test
    @Transactional
    void putNonExistingPromos() throws Exception {
        int databaseSizeBeforeUpdate = promosRepository.findAll().size();
        promos.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restPromosMockMvc
            .perform(
                put(ENTITY_API_URL_ID, promos.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(promos))
            )
            .andExpect(status().isBadRequest());

        // Validate the Promos in the database
        List<Promos> promosList = promosRepository.findAll();
        assertThat(promosList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchPromos() throws Exception {
        int databaseSizeBeforeUpdate = promosRepository.findAll().size();
        promos.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restPromosMockMvc
            .perform(
                put(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(promos))
            )
            .andExpect(status().isBadRequest());

        // Validate the Promos in the database
        List<Promos> promosList = promosRepository.findAll();
        assertThat(promosList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamPromos() throws Exception {
        int databaseSizeBeforeUpdate = promosRepository.findAll().size();
        promos.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restPromosMockMvc
            .perform(put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(promos)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the Promos in the database
        List<Promos> promosList = promosRepository.findAll();
        assertThat(promosList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdatePromosWithPatch() throws Exception {
        // Initialize the database
        promosRepository.saveAndFlush(promos);

        int databaseSizeBeforeUpdate = promosRepository.findAll().size();

        // Update the promos using partial update
        Promos partialUpdatedPromos = new Promos();
        partialUpdatedPromos.setId(promos.getId());

        partialUpdatedPromos.dateEnd(UPDATED_DATE_END).pricePromo(UPDATED_PRICE_PROMO);

        restPromosMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedPromos.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedPromos))
            )
            .andExpect(status().isOk());

        // Validate the Promos in the database
        List<Promos> promosList = promosRepository.findAll();
        assertThat(promosList).hasSize(databaseSizeBeforeUpdate);
        Promos testPromos = promosList.get(promosList.size() - 1);
        assertThat(testPromos.getDateStart()).isEqualTo(DEFAULT_DATE_START);
        assertThat(testPromos.getDateEnd()).isEqualTo(UPDATED_DATE_END);
        assertThat(testPromos.getPricePromo()).isEqualTo(UPDATED_PRICE_PROMO);
    }

    @Test
    @Transactional
    void fullUpdatePromosWithPatch() throws Exception {
        // Initialize the database
        promosRepository.saveAndFlush(promos);

        int databaseSizeBeforeUpdate = promosRepository.findAll().size();

        // Update the promos using partial update
        Promos partialUpdatedPromos = new Promos();
        partialUpdatedPromos.setId(promos.getId());

        partialUpdatedPromos.dateStart(UPDATED_DATE_START).dateEnd(UPDATED_DATE_END).pricePromo(UPDATED_PRICE_PROMO);

        restPromosMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedPromos.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedPromos))
            )
            .andExpect(status().isOk());

        // Validate the Promos in the database
        List<Promos> promosList = promosRepository.findAll();
        assertThat(promosList).hasSize(databaseSizeBeforeUpdate);
        Promos testPromos = promosList.get(promosList.size() - 1);
        assertThat(testPromos.getDateStart()).isEqualTo(UPDATED_DATE_START);
        assertThat(testPromos.getDateEnd()).isEqualTo(UPDATED_DATE_END);
        assertThat(testPromos.getPricePromo()).isEqualTo(UPDATED_PRICE_PROMO);
    }

    @Test
    @Transactional
    void patchNonExistingPromos() throws Exception {
        int databaseSizeBeforeUpdate = promosRepository.findAll().size();
        promos.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restPromosMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, promos.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(promos))
            )
            .andExpect(status().isBadRequest());

        // Validate the Promos in the database
        List<Promos> promosList = promosRepository.findAll();
        assertThat(promosList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchPromos() throws Exception {
        int databaseSizeBeforeUpdate = promosRepository.findAll().size();
        promos.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restPromosMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(promos))
            )
            .andExpect(status().isBadRequest());

        // Validate the Promos in the database
        List<Promos> promosList = promosRepository.findAll();
        assertThat(promosList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamPromos() throws Exception {
        int databaseSizeBeforeUpdate = promosRepository.findAll().size();
        promos.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restPromosMockMvc
            .perform(patch(ENTITY_API_URL).contentType("application/merge-patch+json").content(TestUtil.convertObjectToJsonBytes(promos)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the Promos in the database
        List<Promos> promosList = promosRepository.findAll();
        assertThat(promosList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deletePromos() throws Exception {
        // Initialize the database
        promosRepository.saveAndFlush(promos);

        int databaseSizeBeforeDelete = promosRepository.findAll().size();

        // Delete the promos
        restPromosMockMvc
            .perform(delete(ENTITY_API_URL_ID, promos.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Promos> promosList = promosRepository.findAll();
        assertThat(promosList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
