package co.edu.sena.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import java.time.LocalDate;
import javax.persistence.*;
import javax.validation.constraints.*;

/**
 * A Sale.
 */
@Entity
@Table(name = "sale")
public class Sale implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @NotNull
    @Column(name = "date_sale", nullable = false)
    private LocalDate dateSale;

    @NotNull
    @Column(name = "value_sale", nullable = false)
    private Double valueSale;

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
    @JsonIgnoreProperties(value = { "sales", "dealers", "shopSales", "shopDealers" }, allowSetters = true)
    private Shop shop;

    @ManyToOne
    @JsonIgnoreProperties(value = { "queries", "sales", "rol", "userSales", "queryUsers" }, allowSetters = true)
    private Customer shopper;

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
    private Product saleList;

    @ManyToOne
    @JsonIgnoreProperties(value = { "sales", "dealers", "shopSales", "shopDealers" }, allowSetters = true)
    private Shop listSale;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public Sale id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public LocalDate getDateSale() {
        return this.dateSale;
    }

    public Sale dateSale(LocalDate dateSale) {
        this.setDateSale(dateSale);
        return this;
    }

    public void setDateSale(LocalDate dateSale) {
        this.dateSale = dateSale;
    }

    public Double getValueSale() {
        return this.valueSale;
    }

    public Sale valueSale(Double valueSale) {
        this.setValueSale(valueSale);
        return this;
    }

    public void setValueSale(Double valueSale) {
        this.valueSale = valueSale;
    }

    public Customer getCustomer() {
        return this.customer;
    }

    public void setCustomer(Customer customer) {
        this.customer = customer;
    }

    public Sale customer(Customer customer) {
        this.setCustomer(customer);
        return this;
    }

    public Product getProduct() {
        return this.product;
    }

    public void setProduct(Product product) {
        this.product = product;
    }

    public Sale product(Product product) {
        this.setProduct(product);
        return this;
    }

    public Shop getShop() {
        return this.shop;
    }

    public void setShop(Shop shop) {
        this.shop = shop;
    }

    public Sale shop(Shop shop) {
        this.setShop(shop);
        return this;
    }

    public Customer getShopper() {
        return this.shopper;
    }

    public void setShopper(Customer customer) {
        this.shopper = customer;
    }

    public Sale shopper(Customer customer) {
        this.setShopper(customer);
        return this;
    }

    public Product getSaleList() {
        return this.saleList;
    }

    public void setSaleList(Product product) {
        this.saleList = product;
    }

    public Sale saleList(Product product) {
        this.setSaleList(product);
        return this;
    }

    public Shop getListSale() {
        return this.listSale;
    }

    public void setListSale(Shop shop) {
        this.listSale = shop;
    }

    public Sale listSale(Shop shop) {
        this.setListSale(shop);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Sale)) {
            return false;
        }
        return id != null && id.equals(((Sale) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Sale{" +
            "id=" + getId() +
            ", dateSale='" + getDateSale() + "'" +
            ", valueSale=" + getValueSale() +
            "}";
    }
}
