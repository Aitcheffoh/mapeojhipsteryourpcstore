package co.edu.sena.web.rest;

import co.edu.sena.domain.Promos;
import co.edu.sena.repository.PromosRepository;
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
 * REST controller for managing {@link co.edu.sena.domain.Promos}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class PromosResource {

    private final Logger log = LoggerFactory.getLogger(PromosResource.class);

    private static final String ENTITY_NAME = "promos";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final PromosRepository promosRepository;

    public PromosResource(PromosRepository promosRepository) {
        this.promosRepository = promosRepository;
    }

    /**
     * {@code POST  /promos} : Create a new promos.
     *
     * @param promos the promos to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new promos, or with status {@code 400 (Bad Request)} if the promos has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/promos")
    public ResponseEntity<Promos> createPromos(@Valid @RequestBody Promos promos) throws URISyntaxException {
        log.debug("REST request to save Promos : {}", promos);
        if (promos.getId() != null) {
            throw new BadRequestAlertException("A new promos cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Promos result = promosRepository.save(promos);
        return ResponseEntity
            .created(new URI("/api/promos/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /promos/:id} : Updates an existing promos.
     *
     * @param id the id of the promos to save.
     * @param promos the promos to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated promos,
     * or with status {@code 400 (Bad Request)} if the promos is not valid,
     * or with status {@code 500 (Internal Server Error)} if the promos couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/promos/{id}")
    public ResponseEntity<Promos> updatePromos(
        @PathVariable(value = "id", required = false) final Long id,
        @Valid @RequestBody Promos promos
    ) throws URISyntaxException {
        log.debug("REST request to update Promos : {}, {}", id, promos);
        if (promos.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, promos.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!promosRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Promos result = promosRepository.save(promos);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, promos.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /promos/:id} : Partial updates given fields of an existing promos, field will ignore if it is null
     *
     * @param id the id of the promos to save.
     * @param promos the promos to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated promos,
     * or with status {@code 400 (Bad Request)} if the promos is not valid,
     * or with status {@code 404 (Not Found)} if the promos is not found,
     * or with status {@code 500 (Internal Server Error)} if the promos couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/promos/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<Promos> partialUpdatePromos(
        @PathVariable(value = "id", required = false) final Long id,
        @NotNull @RequestBody Promos promos
    ) throws URISyntaxException {
        log.debug("REST request to partial update Promos partially : {}, {}", id, promos);
        if (promos.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, promos.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!promosRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<Promos> result = promosRepository
            .findById(promos.getId())
            .map(existingPromos -> {
                if (promos.getDateStart() != null) {
                    existingPromos.setDateStart(promos.getDateStart());
                }
                if (promos.getDateEnd() != null) {
                    existingPromos.setDateEnd(promos.getDateEnd());
                }
                if (promos.getPricePromo() != null) {
                    existingPromos.setPricePromo(promos.getPricePromo());
                }

                return existingPromos;
            })
            .map(promosRepository::save);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, promos.getId().toString())
        );
    }

    /**
     * {@code GET  /promos} : get all the promos.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of promos in body.
     */
    @GetMapping("/promos")
    public List<Promos> getAllPromos() {
        log.debug("REST request to get all Promos");
        return promosRepository.findAll();
    }

    /**
     * {@code GET  /promos/:id} : get the "id" promos.
     *
     * @param id the id of the promos to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the promos, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/promos/{id}")
    public ResponseEntity<Promos> getPromos(@PathVariable Long id) {
        log.debug("REST request to get Promos : {}", id);
        Optional<Promos> promos = promosRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(promos);
    }

    /**
     * {@code DELETE  /promos/:id} : delete the "id" promos.
     *
     * @param id the id of the promos to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/promos/{id}")
    public ResponseEntity<Void> deletePromos(@PathVariable Long id) {
        log.debug("REST request to delete Promos : {}", id);
        promosRepository.deleteById(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();
    }
}
