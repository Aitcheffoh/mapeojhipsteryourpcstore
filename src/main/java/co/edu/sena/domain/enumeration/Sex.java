package co.edu.sena.domain.enumeration;

/**
 * The Sex enumeration.
 */
public enum Sex {
    MALE("Masculino"),
    FEMALE("Femenino");

    private final String value;

    Sex(String value) {
        this.value = value;
    }

    public String getValue() {
        return value;
    }
}
