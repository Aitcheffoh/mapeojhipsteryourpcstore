package co.edu.sena.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import javax.persistence.*;
import javax.validation.constraints.*;

/**
 * A Rol.
 */
@Entity
@Table(name = "rol")
public class Rol implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @NotNull
    @Size(max = 10)
    @Column(name = "role_name", length = 10, nullable = false, unique = true)
    private String roleName;

    @OneToMany(mappedBy = "rol")
    @JsonIgnoreProperties(value = { "queries", "sales", "rol", "userSales", "queryUsers" }, allowSetters = true)
    private Set<Customer> roleNames = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public Rol id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getRoleName() {
        return this.roleName;
    }

    public Rol roleName(String roleName) {
        this.setRoleName(roleName);
        return this;
    }

    public void setRoleName(String roleName) {
        this.roleName = roleName;
    }

    public Set<Customer> getRoleNames() {
        return this.roleNames;
    }

    public void setRoleNames(Set<Customer> customers) {
        if (this.roleNames != null) {
            this.roleNames.forEach(i -> i.setRol(null));
        }
        if (customers != null) {
            customers.forEach(i -> i.setRol(this));
        }
        this.roleNames = customers;
    }

    public Rol roleNames(Set<Customer> customers) {
        this.setRoleNames(customers);
        return this;
    }

    public Rol addRoleName(Customer customer) {
        this.roleNames.add(customer);
        customer.setRol(this);
        return this;
    }

    public Rol removeRoleName(Customer customer) {
        this.roleNames.remove(customer);
        customer.setRol(null);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Rol)) {
            return false;
        }
        return id != null && id.equals(((Rol) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Rol{" +
            "id=" + getId() +
            ", roleName='" + getRoleName() + "'" +
            "}";
    }
}
