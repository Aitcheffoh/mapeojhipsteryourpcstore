package co.edu.sena.domain;

import co.edu.sena.domain.enumeration.Sex;
import co.edu.sena.domain.enumeration.State;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;
import javax.persistence.*;
import javax.validation.constraints.*;

/**
 * A Customer.
 */
@Entity
@Table(name = "customer")
public class Customer implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @NotNull
    @Size(max = 45)
    @Column(name = "names", length = 45, nullable = false, unique = true)
    private String names;

    @NotNull
    @Size(max = 45)
    @Column(name = "last_names", length = 45, nullable = false, unique = true)
    private String lastNames;

    @NotNull
    @Size(max = 45)
    @Column(name = "email", length = 45, nullable = false, unique = true)
    private String email;

    @NotNull
    @Size(max = 45)
    @Column(name = "password", length = 45, nullable = false)
    private String password;

    @NotNull
    @Column(name = "phone", nullable = false)
    private Long phone;

    @NotNull
    @Column(name = "celphone", nullable = false)
    private Long celphone;

    @NotNull
    @Column(name = "date", nullable = false)
    private LocalDate date;

    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(name = "sex_type", nullable = false)
    private Sex sexType;

    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(name = "state", nullable = false)
    private State state;

    @OneToMany(mappedBy = "consultant")
    @JsonIgnoreProperties(value = { "customer", "product", "consultant", "queryList" }, allowSetters = true)
    private Set<Query> queries = new HashSet<>();

    @OneToMany(mappedBy = "shopper")
    @JsonIgnoreProperties(value = { "customer", "product", "shop", "shopper", "saleList", "listSale" }, allowSetters = true)
    private Set<Sale> sales = new HashSet<>();

    @ManyToOne
    @JsonIgnoreProperties(value = { "roleNames" }, allowSetters = true)
    private Rol rol;

    @OneToMany(mappedBy = "customer")
    @JsonIgnoreProperties(value = { "customer", "product", "shop", "shopper", "saleList", "listSale" }, allowSetters = true)
    private Set<Sale> userSales = new HashSet<>();

    @OneToMany(mappedBy = "customer")
    @JsonIgnoreProperties(value = { "customer", "product", "consultant", "queryList" }, allowSetters = true)
    private Set<Query> queryUsers = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public Customer id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNames() {
        return this.names;
    }

    public Customer names(String names) {
        this.setNames(names);
        return this;
    }

    public void setNames(String names) {
        this.names = names;
    }

    public String getLastNames() {
        return this.lastNames;
    }

    public Customer lastNames(String lastNames) {
        this.setLastNames(lastNames);
        return this;
    }

    public void setLastNames(String lastNames) {
        this.lastNames = lastNames;
    }

    public String getEmail() {
        return this.email;
    }

    public Customer email(String email) {
        this.setEmail(email);
        return this;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return this.password;
    }

    public Customer password(String password) {
        this.setPassword(password);
        return this;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public Long getPhone() {
        return this.phone;
    }

    public Customer phone(Long phone) {
        this.setPhone(phone);
        return this;
    }

    public void setPhone(Long phone) {
        this.phone = phone;
    }

    public Long getCelphone() {
        return this.celphone;
    }

    public Customer celphone(Long celphone) {
        this.setCelphone(celphone);
        return this;
    }

    public void setCelphone(Long celphone) {
        this.celphone = celphone;
    }

    public LocalDate getDate() {
        return this.date;
    }

    public Customer date(LocalDate date) {
        this.setDate(date);
        return this;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    public Sex getSexType() {
        return this.sexType;
    }

    public Customer sexType(Sex sexType) {
        this.setSexType(sexType);
        return this;
    }

    public void setSexType(Sex sexType) {
        this.sexType = sexType;
    }

    public State getState() {
        return this.state;
    }

    public Customer state(State state) {
        this.setState(state);
        return this;
    }

    public void setState(State state) {
        this.state = state;
    }

    public Set<Query> getQueries() {
        return this.queries;
    }

    public void setQueries(Set<Query> queries) {
        if (this.queries != null) {
            this.queries.forEach(i -> i.setConsultant(null));
        }
        if (queries != null) {
            queries.forEach(i -> i.setConsultant(this));
        }
        this.queries = queries;
    }

    public Customer queries(Set<Query> queries) {
        this.setQueries(queries);
        return this;
    }

    public Customer addQuery(Query query) {
        this.queries.add(query);
        query.setConsultant(this);
        return this;
    }

    public Customer removeQuery(Query query) {
        this.queries.remove(query);
        query.setConsultant(null);
        return this;
    }

    public Set<Sale> getSales() {
        return this.sales;
    }

    public void setSales(Set<Sale> sales) {
        if (this.sales != null) {
            this.sales.forEach(i -> i.setShopper(null));
        }
        if (sales != null) {
            sales.forEach(i -> i.setShopper(this));
        }
        this.sales = sales;
    }

    public Customer sales(Set<Sale> sales) {
        this.setSales(sales);
        return this;
    }

    public Customer addSale(Sale sale) {
        this.sales.add(sale);
        sale.setShopper(this);
        return this;
    }

    public Customer removeSale(Sale sale) {
        this.sales.remove(sale);
        sale.setShopper(null);
        return this;
    }

    public Rol getRol() {
        return this.rol;
    }

    public void setRol(Rol rol) {
        this.rol = rol;
    }

    public Customer rol(Rol rol) {
        this.setRol(rol);
        return this;
    }

    public Set<Sale> getUserSales() {
        return this.userSales;
    }

    public void setUserSales(Set<Sale> sales) {
        if (this.userSales != null) {
            this.userSales.forEach(i -> i.setCustomer(null));
        }
        if (sales != null) {
            sales.forEach(i -> i.setCustomer(this));
        }
        this.userSales = sales;
    }

    public Customer userSales(Set<Sale> sales) {
        this.setUserSales(sales);
        return this;
    }

    public Customer addUserSales(Sale sale) {
        this.userSales.add(sale);
        sale.setCustomer(this);
        return this;
    }

    public Customer removeUserSales(Sale sale) {
        this.userSales.remove(sale);
        sale.setCustomer(null);
        return this;
    }

    public Set<Query> getQueryUsers() {
        return this.queryUsers;
    }

    public void setQueryUsers(Set<Query> queries) {
        if (this.queryUsers != null) {
            this.queryUsers.forEach(i -> i.setCustomer(null));
        }
        if (queries != null) {
            queries.forEach(i -> i.setCustomer(this));
        }
        this.queryUsers = queries;
    }

    public Customer queryUsers(Set<Query> queries) {
        this.setQueryUsers(queries);
        return this;
    }

    public Customer addQueryUser(Query query) {
        this.queryUsers.add(query);
        query.setCustomer(this);
        return this;
    }

    public Customer removeQueryUser(Query query) {
        this.queryUsers.remove(query);
        query.setCustomer(null);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Customer)) {
            return false;
        }
        return id != null && id.equals(((Customer) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Customer{" +
            "id=" + getId() +
            ", names='" + getNames() + "'" +
            ", lastNames='" + getLastNames() + "'" +
            ", email='" + getEmail() + "'" +
            ", password='" + getPassword() + "'" +
            ", phone=" + getPhone() +
            ", celphone=" + getCelphone() +
            ", date='" + getDate() + "'" +
            ", sexType='" + getSexType() + "'" +
            ", state='" + getState() + "'" +
            "}";
    }
}
