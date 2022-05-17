package co.edu.sena.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import java.time.LocalDate;
import javax.persistence.*;
import javax.validation.constraints.*;

/**
 * A Query.
 */
@Entity
@Table(name = "query")
public class Query implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @NotNull
    @Column(name = "price", nullable = false)
    private Double price;

    @NotNull
    @Column(name = "date_query", nullable = false)
    private LocalDate dateQuery;

    @ManyToOne
    @JsonIgnoreProperties(value = { "queries", "sales", "rol", "userSales", "queryUsers" }, allowSetters = true)
    private Customer customer;

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
    @JsonIgnoreProperties(value = { "queries", "sales", "rol", "userSales", "queryUsers" }, allowSetters = true)
    private Customer consultant;

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
    private Product queryList;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public Query id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Double getPrice() {
        return this.price;
    }

    public Query price(Double price) {
        this.setPrice(price);
        return this;
    }

    public void setPrice(Double price) {
        this.price = price;
    }

    public LocalDate getDateQuery() {
        return this.dateQuery;
    }

    public Query dateQuery(LocalDate dateQuery) {
        this.setDateQuery(dateQuery);
        return this;
    }

    public void setDateQuery(LocalDate dateQuery) {
        this.dateQuery = dateQuery;
    }

    public Customer getCustomer() {
        return this.customer;
    }

    public void setCustomer(Customer customer) {
        this.customer = customer;
    }

    public Query customer(Customer customer) {
        this.setCustomer(customer);
        return this;
    }

    public Product getProduct() {
        return this.product;
    }

    public void setProduct(Product product) {
        this.product = product;
    }

    public Query product(Product product) {
        this.setProduct(product);
        return this;
    }

    public Customer getConsultant() {
        return this.consultant;
    }

    public void setConsultant(Customer customer) {
        this.consultant = customer;
    }

    public Query consultant(Customer customer) {
        this.setConsultant(customer);
        return this;
    }

    public Product getQueryList() {
        return this.queryList;
    }

    public void setQueryList(Product product) {
        this.queryList = product;
    }

    public Query queryList(Product product) {
        this.setQueryList(product);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Query)) {
            return false;
        }
        return id != null && id.equals(((Query) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Query{" +
            "id=" + getId() +
            ", price=" + getPrice() +
            ", dateQuery='" + getDateQuery() + "'" +
            "}";
    }
}
