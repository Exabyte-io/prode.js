export const EXTERNAL_SOURCES = {
    materials_project: 'MaterialsProject',
    icsd: 'ICSD'
};

export const PROPERTY_TYPES = {
    // by data type
    scalar: "scalar",
    non_scalar: "non-scalar",
    // non-scalar subtypes
    tensor: "tensor",
    object: "object",
};

export const PROPERTY_DOMAINS = {
    // by data type
    material: "material",
    workflow: "workflow",
};

export const PROPERTIES = {
    pressure: "pressure",
    total_force: "total_force",
    total_energy: "total_energy",
    surface_energy: "surface_energy",
    convergence_elec: "convergence_electronic",
    convergence_ion: "convergence_ionic",
    fermi_energy: "fermi_energy",
    zero_point_energy: "zero_point_energy",
    total_energy_contrib: "total_energy_contributions",
    atomic_forces: "atomic_forces",
    atomic_constraints: "atomic_constraints",
    stress_tensor: "stress_tensor",
    dos: "density_of_states",
    band_structure: "band_structure",
    band_gaps: "band_gaps",
    phonon_dispersions: "phonon_dispersions",
    phonon_dos: "phonon_dos",
    predicted_properties: "predicted_properties",
    final_structure: "final_structure",
    is_relaxed: "is_relaxed",
    w_ml_predict: "workflow:ml_predict",
    w_pyml_predict: "workflow:pyml_predict",
    file_content: "file_content",
    magnetic_moments: "magnetic_moments",
    rxn_energy_barrier: "reaction_energy_barrier",
    rxn_energy_profile: "reaction_energy_profile",
    potential_profile: "potential_profile",
    charge_density_profile: "charge_density_profile",
    jupyter_nb_endpoint: "jupyter_notebook_endpoint",
}
