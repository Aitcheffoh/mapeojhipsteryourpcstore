package co.edu.sena.domain;

import static org.assertj.core.api.Assertions.assertThat;

import co.edu.sena.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class PromosTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Promos.class);
        Promos promos1 = new Promos();
        promos1.setId(1L);
        Promos promos2 = new Promos();
        promos2.setId(promos1.getId());
        assertThat(promos1).isEqualTo(promos2);
        promos2.setId(2L);
        assertThat(promos1).isNotEqualTo(promos2);
        promos1.setId(null);
        assertThat(promos1).isNotEqualTo(promos2);
    }
}
