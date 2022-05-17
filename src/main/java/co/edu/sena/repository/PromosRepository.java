package co.edu.sena.repository;

import co.edu.sena.domain.Promos;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data SQL repository for the Promos entity.
 */
@SuppressWarnings("unused")
@Repository
public interface PromosRepository extends JpaRepository<Promos, Long> {}
