package co.edu.sena.repository;

import co.edu.sena.domain.Combos;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data SQL repository for the Combos entity.
 */
@SuppressWarnings("unused")
@Repository
public interface CombosRepository extends JpaRepository<Combos, Long> {}
