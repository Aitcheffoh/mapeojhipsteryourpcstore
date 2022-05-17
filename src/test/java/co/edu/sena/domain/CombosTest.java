package co.edu.sena.domain;

import static org.assertj.core.api.Assertions.assertThat;

import co.edu.sena.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class CombosTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Combos.class);
        Combos combos1 = new Combos();
        combos1.setId(1L);
        Combos combos2 = new Combos();
        combos2.setId(combos1.getId());
        assertThat(combos1).isEqualTo(combos2);
        combos2.setId(2L);
        assertThat(combos1).isNotEqualTo(combos2);
        combos1.setId(null);
        assertThat(combos1).isNotEqualTo(combos2);
    }
}
