package co.edu.sena.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import javax.persistence.*;
import javax.validation.constraints.*;

/**
 * A Product.
 */
@Entity
@Table(name = "product")
public class Product implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @NotNull
    @Size(max = 45)
    @Column(name = "name_product", length = 45, nullable = false)
    private String nameProduct;

    @NotNull
    @Column(name = "price", nullable = false)
    private Double price;

    @OneToMany(mappedBy = "saleList")
    @JsonIgnoreProperties(value = { "customer", "product", "shop", "shopper", "saleList", "listSale" }, allowSetters = true)
    private Set<Sale> sales = new HashSet<>();

    @OneToMany(mappedBy = "comboList")
    @JsonIgnoreProperties(value = { "product", "comboList" }, allowSetters = true)
    private Set<Combos> combos = new HashSet<>();

    @OneToMany(mappedBy = "promosList")
    @JsonIgnoreProperties(value = { "product", "promosList" }, allowSetters = true)
    private Set<Promos> promos = new HashSet<>();

    @OneToMany(mappedBy = "queryList")
    @JsonIgnoreProperties(value = { "customer", "product", "consultant", "queryList" }, allowSetters = true)
    private Set<Query> queries = new HashSet<>();

    @ManyToOne
    @JsonIgnoreProperties(value = { "products", "shop", "dealerList", "productDealers" }, allowSetters = true)
    private Dealer dealer;

    @ManyToOne
    @JsonIgnoreProperties(value = { "products", "shop", "dealerList", "productDealers" }, allowSetters = true)
    private Dealer productList;

    @OneToMany(mappedBy = "product")
    @JsonIgnoreProperties(value = { "customer", "product", "shop", "shopper", "saleList", "listSale" }, allowSetters = true)
    private Set<Sale> productSales = new HashSet<>();

    @OneToMany(mappedBy = "product")
    @JsonIgnoreProperties(value = { "customer", "product", "consultant", "queryList" }, allowSetters = true)
    private Set<Query> queryProducts = new HashSet<>();

    @OneToMany(mappedBy = "product")
    @JsonIgnoreProperties(value = { "product", "promosList" }, allowSetters = true)
    private Set<Promos> promosProducts = new HashSet<>();

    @OneToMany(mappedBy = "product")
    @JsonIgnoreProperties(value = { "product", "comboList" }, allowSetters = true)
    private Set<Combos> combosProducts = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public Product id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNameProduct() {
        return this.nameProduct;
    }

    public Product nameProduct(String nameProduct) {
        this.setNameProduct(nameProduct);
        return this;
    }

    public void setNameProduct(String nameProduct) {
        this.nameProduct = nameProduct;
    }

    public Double getPrice() {
        return this.price;
    }

    public Product price(Double price) {
        this.setPrice(price);
        return this;
    }

    public void setPrice(Double price) {
        this.price = price;
    }

    public Set<Sale> getSales() {
        return this.sales;
    }

    public void setSales(Set<Sale> sales) {
        if (this.sales != null) {
            this.sales.forEach(i -> i.setSaleList(null));
        }
        if (sales != null) {
            sales.forEach(i -> i.setSaleList(this));
        }
        this.sales = sales;
    }

    public Product sales(Set<Sale> sales) {
        this.setSales(sales);
        return this;
    }

    public Product addSale(Sale sale) {
        this.sales.add(sale);
        sale.setSaleList(this);
        return this;
    }

    public Product removeSale(Sale sale) {
        this.sales.remove(sale);
        sale.setSaleList(null);
        return this;
    }

    public Set<Combos> getCombos() {
        return this.combos;
    }

    public void setCombos(Set<Combos> combos) {
        if (this.combos != null) {
            this.combos.forEach(i -> i.setComboList(null));
        }
        if (combos != null) {
            combos.forEach(i -> i.setComboList(this));
        }
        this.combos = combos;
    }

    public Product combos(Set<Combos> combos) {
        this.setCombos(combos);
        return this;
    }

    public Product addCombos(Combos combos) {
        this.combos.add(combos);
        combos.setComboList(this);
        return this;
    }

    public Product removeCombos(Combos combos) {
        this.combos.remove(combos);
        combos.setComboList(null);
        return this;
    }

    public Set<Promos> getPromos() {
        return this.promos;
    }

    public void setPromos(Set<Promos> promos) {
        if (this.promos != null) {
            this.promos.forEach(i -> i.setPromosList(null));
        }
        if (promos != null) {
            promos.forEach(i -> i.setPromosList(this));
        }
        this.promos = promos;
    }

    public Product promos(Set<Promos> promos) {
        this.setPromos(promos);
        return this;
    }

    public Product addPromos(Promos promos) {
        this.promos.add(promos);
        promos.setPromosList(this);
        return this;
    }

    public Product removePromos(Promos promos) {
        this.promos.remove(promos);
        promos.setPromosList(null);
        return this;
    }

    public Set<Query> getQueries() {
        return this.queries;
    }

    public void setQueries(Set<Query> queries) {
        if (this.queries != null) {
            this.queries.forEach(i -> i.setQueryList(null));
        }
        if (queries != null) {
            queries.forEach(i -> i.setQueryList(this));
        }
        this.queries = queries;
    }

    public Product queries(Set<Query> queries) {
        this.setQueries(queries);
        return this;
    }

    public Product addQuery(Query query) {
        this.queries.add(query);
        query.setQueryList(this);
        return this;
    }

    public Product removeQuery(Query query) {
        this.queries.remove(query);
        query.setQueryList(null);
        return this;
    }

    public Dealer getDealer() {
        return this.dealer;
    }

    public void setDealer(Dealer dealer) {
        this.dealer = dealer;
    }

    public Product dealer(Dealer dealer) {
        this.setDealer(dealer);
        return this;
    }

    public Dealer getProductList() {
        return this.productList;
    }

    public void setProductList(Dealer dealer) {
        this.productList = dealer;
    }

    public Product productList(Dealer dealer) {
        this.setProductList(dealer);
        return this;
    }

    public Set<Sale> getProductSales() {
        return this.productSales;
    }

    public void setProductSales(Set<Sale> sales) {
        if (this.productSales != null) {
            this.productSales.forEach(i -> i.setProduct(null));
        }
        if (sales != null) {
            sales.forEach(i -> i.setProduct(this));
        }
        this.productSales = sales;
    }

    public Product productSales(Set<Sale> sales) {
        this.setProductSales(sales);
        return this;
    }

    public Product addProductSales(Sale sale) {
        this.productSales.add(sale);
        sale.setProduct(this);
        return this;
    }

    public Product removeProductSales(Sale sale) {
        this.productSales.remove(sale);
        sale.setProduct(null);
        return this;
    }

    public Set<Query> getQueryProducts() {
        return this.queryProducts;
    }

    public void setQueryProducts(Set<Query> queries) {
        if (this.queryProducts != null) {
            this.queryProducts.forEach(i -> i.setProduct(null));
        }
        if (queries != null) {
            queries.forEach(i -> i.setProduct(this));
        }
        this.queryProducts = queries;
    }

    public Product queryProducts(Set<Query> queries) {
        this.setQueryProducts(queries);
        return this;
    }

    public Product addQueryProduct(Query query) {
        this.queryProducts.add(query);
        query.setProduct(this);
        return this;
    }

    public Product removeQueryProduct(Query query) {
        this.queryProducts.remove(query);
        query.setProduct(null);
        return this;
    }

    public Set<Promos> getPromosProducts() {
        return this.promosProducts;
    }

    public void setPromosProducts(Set<Promos> promos) {
        if (this.promosProducts != null) {
            this.promosProducts.forEach(i -> i.setProduct(null));
        }
        if (promos != null) {
            promos.forEach(i -> i.setProduct(this));
        }
        this.promosProducts = promos;
    }

    public Product promosProducts(Set<Promos> promos) {
        this.setPromosProducts(promos);
        return this;
    }

    public Product addPromosProduct(Promos promos) {
        this.promosProducts.add(promos);
        promos.setProduct(this);
        return this;
    }

    public Product removePromosProduct(Promos promos) {
        this.promosProducts.remove(promos);
        promos.setProduct(null);
        return this;
    }

    public Set<Combos> getCombosProducts() {
        return this.combosProducts;
    }

    public void setCombosProducts(Set<Combos> combos) {
        if (this.combosProducts != null) {
            this.combosProducts.forEach(i -> i.setProduct(null));
        }
        if (combos != null) {
            combos.forEach(i -> i.setProduct(this));
        }
        this.combosProducts = combos;
    }

    public Product combosProducts(Set<Combos> combos) {
        this.setCombosProducts(combos);
        return this;
    }

    public Product addCombosProduct(Combos combos) {
        this.combosProducts.add(combos);
        combos.setProduct(this);
        return this;
    }

    public Product removeCombosProduct(Combos combos) {
        this.combosProducts.remove(combos);
        combos.setProduct(null);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Product)) {
            return false;
        }
        return id != null && id.equals(((Product) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Product{" +
            "id=" + getId() +
            ", nameProduct='" + getNameProduct() + "'" +
            ", price=" + getPrice() +
            "}";
    }
}
