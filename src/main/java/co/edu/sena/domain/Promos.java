package co.edu.sena.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import java.time.LocalDate;
import javax.persistence.*;
import javax.validation.constraints.*;

/**
 * A Promos.
 */
@Entity
@Table(name = "promos")
public class Promos implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @NotNull
    @Column(name = "date_start", nullable = false)
    private LocalDate dateStart;

    @NotNull
    @Column(name = "date_end", nullable = false)
    private LocalDate dateEnd;

    @NotNull
    @Column(name = "price_promo", nullable = false)
    private Long pricePromo;

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
    private Product promosList;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public Promos id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public LocalDate getDateStart() {
        return this.dateStart;
    }

    public Promos dateStart(LocalDate dateStart) {
        this.setDateStart(dateStart);
        return this;
    }

    public void setDateStart(LocalDate dateStart) {
        this.dateStart = dateStart;
    }

    public LocalDate getDateEnd() {
        return this.dateEnd;
    }

    public Promos dateEnd(LocalDate dateEnd) {
        this.setDateEnd(dateEnd);
        return this;
    }

    public void setDateEnd(LocalDate dateEnd) {
        this.dateEnd = dateEnd;
    }

    public Long getPricePromo() {
        return this.pricePromo;
    }

    public Promos pricePromo(Long pricePromo) {
        this.setPricePromo(pricePromo);
        return this;
    }

    public void setPricePromo(Long pricePromo) {
        this.pricePromo = pricePromo;
    }

    public Product getProduct() {
        return this.product;
    }

    public void setProduct(Product product) {
        this.product = product;
    }

    public Promos product(Product product) {
        this.setProduct(product);
        return this;
    }

    public Product getPromosList() {
        return this.promosList;
    }

    public void setPromosList(Product product) {
        this.promosList = product;
    }

    public Promos promosList(Product product) {
        this.setPromosList(product);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Promos)) {
            return false;
        }
        return id != null && id.equals(((Promos) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Promos{" +
            "id=" + getId() +
            ", dateStart='" + getDateStart() + "'" +
            ", dateEnd='" + getDateEnd() + "'" +
            ", pricePromo=" + getPricePromo() +
            "}";
    }
}
