package co.edu.sena.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import javax.persistence.*;
import javax.validation.constraints.*;

/**
 * A Shop.
 */
@Entity
@Table(name = "shop")
public class Shop implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @NotNull
    @Size(max = 45)
    @Column(name = "name_shop", length = 45, nullable = false, unique = true)
    private String nameShop;

    @NotNull
    @Size(max = 45)
    @Column(name = "place", length = 45, nullable = false, unique = true)
    private String place;

    @NotNull
    @Column(name = "phone_shop", nullable = false, unique = true)
    private Long phoneShop;

    @OneToMany(mappedBy = "listSale")
    @JsonIgnoreProperties(value = { "customer", "product", "shop", "shopper", "saleList", "listSale" }, allowSetters = true)
    private Set<Sale> sales = new HashSet<>();

    @OneToMany(mappedBy = "dealerList")
    @JsonIgnoreProperties(value = { "products", "shop", "dealerList", "productDealers" }, allowSetters = true)
    private Set<Dealer> dealers = new HashSet<>();

    @OneToMany(mappedBy = "shop")
    @JsonIgnoreProperties(value = { "customer", "product", "shop", "shopper", "saleList", "listSale" }, allowSetters = true)
    private Set<Sale> shopSales = new HashSet<>();

    @OneToMany(mappedBy = "shop")
    @JsonIgnoreProperties(value = { "products", "shop", "dealerList", "productDealers" }, allowSetters = true)
    private Set<Dealer> shopDealers = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public Shop id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNameShop() {
        return this.nameShop;
    }

    public Shop nameShop(String nameShop) {
        this.setNameShop(nameShop);
        return this;
    }

    public void setNameShop(String nameShop) {
        this.nameShop = nameShop;
    }

    public String getPlace() {
        return this.place;
    }

    public Shop place(String place) {
        this.setPlace(place);
        return this;
    }

    public void setPlace(String place) {
        this.place = place;
    }

    public Long getPhoneShop() {
        return this.phoneShop;
    }

    public Shop phoneShop(Long phoneShop) {
        this.setPhoneShop(phoneShop);
        return this;
    }

    public void setPhoneShop(Long phoneShop) {
        this.phoneShop = phoneShop;
    }

    public Set<Sale> getSales() {
        return this.sales;
    }

    public void setSales(Set<Sale> sales) {
        if (this.sales != null) {
            this.sales.forEach(i -> i.setListSale(null));
        }
        if (sales != null) {
            sales.forEach(i -> i.setListSale(this));
        }
        this.sales = sales;
    }

    public Shop sales(Set<Sale> sales) {
        this.setSales(sales);
        return this;
    }

    public Shop addSale(Sale sale) {
        this.sales.add(sale);
        sale.setListSale(this);
        return this;
    }

    public Shop removeSale(Sale sale) {
        this.sales.remove(sale);
        sale.setListSale(null);
        return this;
    }

    public Set<Dealer> getDealers() {
        return this.dealers;
    }

    public void setDealers(Set<Dealer> dealers) {
        if (this.dealers != null) {
            this.dealers.forEach(i -> i.setDealerList(null));
        }
        if (dealers != null) {
            dealers.forEach(i -> i.setDealerList(this));
        }
        this.dealers = dealers;
    }

    public Shop dealers(Set<Dealer> dealers) {
        this.setDealers(dealers);
        return this;
    }

    public Shop addDealer(Dealer dealer) {
        this.dealers.add(dealer);
        dealer.setDealerList(this);
        return this;
    }

    public Shop removeDealer(Dealer dealer) {
        this.dealers.remove(dealer);
        dealer.setDealerList(null);
        return this;
    }

    public Set<Sale> getShopSales() {
        return this.shopSales;
    }

    public void setShopSales(Set<Sale> sales) {
        if (this.shopSales != null) {
            this.shopSales.forEach(i -> i.setShop(null));
        }
        if (sales != null) {
            sales.forEach(i -> i.setShop(this));
        }
        this.shopSales = sales;
    }

    public Shop shopSales(Set<Sale> sales) {
        this.setShopSales(sales);
        return this;
    }

    public Shop addShopSales(Sale sale) {
        this.shopSales.add(sale);
        sale.setShop(this);
        return this;
    }

    public Shop removeShopSales(Sale sale) {
        this.shopSales.remove(sale);
        sale.setShop(null);
        return this;
    }

    public Set<Dealer> getShopDealers() {
        return this.shopDealers;
    }

    public void setShopDealers(Set<Dealer> dealers) {
        if (this.shopDealers != null) {
            this.shopDealers.forEach(i -> i.setShop(null));
        }
        if (dealers != null) {
            dealers.forEach(i -> i.setShop(this));
        }
        this.shopDealers = dealers;
    }

    public Shop shopDealers(Set<Dealer> dealers) {
        this.setShopDealers(dealers);
        return this;
    }

    public Shop addShopDealer(Dealer dealer) {
        this.shopDealers.add(dealer);
        dealer.setShop(this);
        return this;
    }

    public Shop removeShopDealer(Dealer dealer) {
        this.shopDealers.remove(dealer);
        dealer.setShop(null);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Shop)) {
            return false;
        }
        return id != null && id.equals(((Shop) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Shop{" +
            "id=" + getId() +
            ", nameShop='" + getNameShop() + "'" +
            ", place='" + getPlace() + "'" +
            ", phoneShop=" + getPhoneShop() +
            "}";
    }
}
