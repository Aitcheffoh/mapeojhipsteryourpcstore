package co.edu.sena.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import javax.persistence.*;
import javax.validation.constraints.*;

/**
 * A Dealer.
 */
@Entity
@Table(name = "dealer")
public class Dealer implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @NotNull
    @Size(max = 45)
    @Column(name = "name_dealer", length = 45, nullable = false, unique = true)
    private String nameDealer;

    @OneToMany(mappedBy = "productList")
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
    private Set<Product> products = new HashSet<>();

    @ManyToOne
    @JsonIgnoreProperties(value = { "sales", "dealers", "shopSales", "shopDealers" }, allowSetters = true)
    private Shop shop;

    @ManyToOne
    @JsonIgnoreProperties(value = { "sales", "dealers", "shopSales", "shopDealers" }, allowSetters = true)
    private Shop dealerList;

    @OneToMany(mappedBy = "dealer")
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
    private Set<Product> productDealers = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public Dealer id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNameDealer() {
        return this.nameDealer;
    }

    public Dealer nameDealer(String nameDealer) {
        this.setNameDealer(nameDealer);
        return this;
    }

    public void setNameDealer(String nameDealer) {
        this.nameDealer = nameDealer;
    }

    public Set<Product> getProducts() {
        return this.products;
    }

    public void setProducts(Set<Product> products) {
        if (this.products != null) {
            this.products.forEach(i -> i.setProductList(null));
        }
        if (products != null) {
            products.forEach(i -> i.setProductList(this));
        }
        this.products = products;
    }

    public Dealer products(Set<Product> products) {
        this.setProducts(products);
        return this;
    }

    public Dealer addProduct(Product product) {
        this.products.add(product);
        product.setProductList(this);
        return this;
    }

    public Dealer removeProduct(Product product) {
        this.products.remove(product);
        product.setProductList(null);
        return this;
    }

    public Shop getShop() {
        return this.shop;
    }

    public void setShop(Shop shop) {
        this.shop = shop;
    }

    public Dealer shop(Shop shop) {
        this.setShop(shop);
        return this;
    }

    public Shop getDealerList() {
        return this.dealerList;
    }

    public void setDealerList(Shop shop) {
        this.dealerList = shop;
    }

    public Dealer dealerList(Shop shop) {
        this.setDealerList(shop);
        return this;
    }

    public Set<Product> getProductDealers() {
        return this.productDealers;
    }

    public void setProductDealers(Set<Product> products) {
        if (this.productDealers != null) {
            this.productDealers.forEach(i -> i.setDealer(null));
        }
        if (products != null) {
            products.forEach(i -> i.setDealer(this));
        }
        this.productDealers = products;
    }

    public Dealer productDealers(Set<Product> products) {
        this.setProductDealers(products);
        return this;
    }

    public Dealer addProductDealer(Product product) {
        this.productDealers.add(product);
        product.setDealer(this);
        return this;
    }

    public Dealer removeProductDealer(Product product) {
        this.productDealers.remove(product);
        product.setDealer(null);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Dealer)) {
            return false;
        }
        return id != null && id.equals(((Dealer) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Dealer{" +
            "id=" + getId() +
            ", nameDealer='" + getNameDealer() + "'" +
            "}";
    }
}
