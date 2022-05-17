package co.edu.sena.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import javax.persistence.*;
import javax.validation.constraints.*;

/**
 * A Combos.
 */
@Entity
@Table(name = "combos")
public class Combos implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @NotNull
    @Column(name = "price_combo", nullable = false)
    private Double priceCombo;

    @ManyToOne
    @JsonIgnoreProperties(
        value = {
            "sales",
            "combos",
            "promos",
            "queries",
            "dealer",
            "productList",
            "productSales",
            "queryProducts",
            "promosProducts",
            "combosProducts",
        },
        allowSetters = true
    )
    private Product product;

    @ManyToOne
    @JsonIgnoreProperties(
        value = {
            "sales",
            "combos",
            "promos",
            "queries",
            "dealer",
            "productList",
            "productSales",
            "queryProducts",
            "promosProducts",
            "combosProducts",
        },
        allowSetters = true
    )
    private Product comboList;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public Combos id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Double getPriceCombo() {
        return this.priceCombo;
    }

    public Combos priceCombo(Double priceCombo) {
        this.setPriceCombo(priceCombo);
        return this;
    }

    public void setPriceCombo(Double priceCombo) {
        this.priceCombo = priceCombo;
    }

    public Product getProduct() {
        return this.product;
    }

    public void setProduct(Product product) {
        this.product = product;
    }

    public Combos product(Product product) {
        this.setProduct(product);
        return this;
    }

    public Product getComboList() {
        return this.comboList;
    }

    public void setComboList(Product product) {
        this.comboList = product;
    }

    public Combos comboList(Product product) {
        this.setComboList(product);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Combos)) {
            return false;
        }
        return id != null && id.equals(((Combos) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Combos{" +
            "id=" + getId() +
            ", priceCombo=" + getPriceCombo() +
            "}";
    }
}
