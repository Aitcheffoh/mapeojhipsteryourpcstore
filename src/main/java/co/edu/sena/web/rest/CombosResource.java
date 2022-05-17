package co.edu.sena.web.rest;

import co.edu.sena.domain.Combos;
import co.edu.sena.repository.CombosRepository;
import co.edu.sena.web.rest.errors.BadRequestAlertException;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import javax.validation.Valid;
import javax.validation.constraints.NotNull;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import tech.jhipster.web.util.HeaderUtil;
import tech.jhipster.web.util.ResponseUtil;

/**
 * REST controller for managing {@link co.edu.sena.domain.Combos}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class CombosResource {

    private final Logger log = LoggerFactory.getLogger(CombosResource.class);

    private static final String ENTITY_NAME = "combos";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final CombosRepository combosRepository;

    public CombosResource(CombosRepository combosRepository) {
        this.combosRepository = combosRepository;
    }

    /**
     * {@code POST  /combos} : Create a new combos.
     *
     * @param combos the combos to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new combos, or with status {@code 400 (Bad Request)} if the combos has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/combos")
    public ResponseEntity<Combos> createCombos(@Valid @RequestBody Combos combos) throws URISyntaxException {
        log.debug("REST request to save Combos : {}", combos);
        if (combos.getId() != null) {
            throw new BadRequestAlertException("A new combos cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Combos result = combosRepository.save(combos);
        return ResponseEntity
            .created(new URI("/api/combos/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /combos/:id} : Updates an existing combos.
     *
     * @param id the id of the combos to save.
     * @param combos the combos to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated combos,
     * or with status {@code 400 (Bad Request)} if the combos is not valid,
     * or with status {@code 500 (Internal Server Error)} if the combos couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/combos/{id}")
    public ResponseEntity<Combos> updateCombos(
        @PathVariable(value = "id", required = false) final Long id,
        @Valid @RequestBody Combos combos
    ) throws URISyntaxException {
        log.debug("REST request to update Combos : {}, {}", id, combos);
        if (combos.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, combos.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!combosRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Combos result = combosRepository.save(combos);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, combos.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /combos/:id} : Partial updates given fields of an existing combos, field will ignore if it is null
     *
     * @param id the id of the combos to save.
     * @param combos the combos to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated combos,
     * or with status {@code 400 (Bad Request)} if the combos is not valid,
     * or with status {@code 404 (Not Found)} if the combos is not found,
     * or with status {@code 500 (Internal Server Error)} if the combos couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/combos/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<Combos> partialUpdateCombos(
        @PathVariable(value = "id", required = false) final Long id,
        @NotNull @RequestBody Combos combos
    ) throws URISyntaxException {
        log.debug("REST request to partial update Combos partially : {}, {}", id, combos);
        if (combos.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, combos.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!combosRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<Combos> result = combosRepository
            .findById(combos.getId())
            .map(existingCombos -> {
                if (combos.getPriceCombo() != null) {
                    existingCombos.setPriceCombo(combos.getPriceCombo());
                }

                return existingCombos;
            })
            .map(combosRepository::save);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, combos.getId().toString())
        );
    }

    /**
     * {@code GET  /combos} : get all the combos.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of combos in body.
     */
    @GetMapping("/combos")
    public List<Combos> getAllCombos() {
        log.debug("REST request to get all Combos");
        return combosRepository.findAll();
    }

    /**
     * {@code GET  /combos/:id} : get the "id" combos.
     *
     * @param id the id of the combos to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the combos, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/combos/{id}")
    public ResponseEntity<Combos> getCombos(@PathVariable Long id) {
        log.debug("REST request to get Combos : {}", id);
        Optional<Combos> combos = combosRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(combos);
    }

    /**
     * {@code DELETE  /combos/:id} : delete the "id" combos.
     *
     * @param id the id of the combos to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/combos/{id}")
    public ResponseEntity<Void> deleteCombos(@PathVariable Long id) {
        log.debug("REST request to delete Combos : {}", id);
        combosRepository.deleteById(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();
    }
}
