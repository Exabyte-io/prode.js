import { PROPERTIES, PROPERTY_DOMAINS, PROPERTY_TYPES } from "./settings";

/**
 * @description For more details about types and object keys below
 * check the [ESSE repository](https://github.com/Exabyte-io/esse).
 */
export default {
    [PROPERTIES.pressure]: {
        //        "name": "pressure",  // name is same as key unless specified explicitly
        //        "domain": PROPERTY_DOMAINS.material,  // default domain is assumed to be "material"
        //        "isAuxiliary": false,  // by default the property is non-auxiliary
        type: PROPERTY_TYPES.scalar,
        isRefined: true,
    },
    [PROPERTIES.total_force]: {
        type: PROPERTY_TYPES.scalar,
    },
    [PROPERTIES.total_energy]: {
        type: PROPERTY_TYPES.scalar,
        isRefined: true,
        isAuxiliary: true,
    },
    [PROPERTIES.surface_energy]: {
        type: PROPERTY_TYPES.scalar,
        isRefined: true,
    },
    [PROPERTIES.convergence_elec]: {
        type: PROPERTY_TYPES.non_scalar,
        domain: PROPERTY_DOMAINS.workflow,
        isConvergence: true,
    },
    [PROPERTIES.convergence_ion]: {
        type: PROPERTY_TYPES.non_scalar,
        domain: PROPERTY_DOMAINS.workflow,
        isConvergence: true,
    },
    [PROPERTIES.fermi_energy]: {
        type: PROPERTY_TYPES.scalar,
        isAuxiliary: true,
    },
    [PROPERTIES.zero_point_energy]: {
        type: PROPERTY_TYPES.scalar,
    },
    [PROPERTIES.total_energy_contrib]: {
        type: PROPERTY_TYPES.object,
        isAuxiliary: true,
    },
    [PROPERTIES.atomic_forces]: {
        type: PROPERTY_TYPES.tensor,
    },
    [PROPERTIES.atomic_constraints]: {
        type: PROPERTY_TYPES.non_scalar,
    },
    [PROPERTIES.stress_tensor]: {
        type: PROPERTY_TYPES.tensor,
    },
    [PROPERTIES.dos]: {
        type: PROPERTY_TYPES.non_scalar,
        isRefined: true,
    },
    [PROPERTIES.band_structure]: {
        type: PROPERTY_TYPES.non_scalar,
        isRefined: true,
    },
    [PROPERTIES.band_gaps]: {
        type: PROPERTY_TYPES.non_scalar,
        isRefined: true,
    },
    [PROPERTIES.phonon_dispersions]: {
        type: PROPERTY_TYPES.non_scalar,
    },
    [PROPERTIES.phonon_dos]: {
        type: PROPERTY_TYPES.non_scalar,
    },
    [PROPERTIES.predicted_properties]: {
        type: PROPERTY_TYPES.non_scalar,
    },
    [PROPERTIES.final_structure]: {
        type: PROPERTY_TYPES.non_scalar,
    },
    [PROPERTIES.is_relaxed]: {
        // only storing the refined status as this is not to be shown in job results
        isRefined: true,
    },
    [PROPERTIES.w_ml_predict]: {
        type: PROPERTY_TYPES.non_scalar,
        domain: PROPERTY_DOMAINS.workflow,
    },
    [PROPERTIES.w_pyml_predict]: {
        type: PROPERTY_TYPES.non_scalar,
        domain: PROPERTY_DOMAINS.workflow,
    },
    [PROPERTIES.file_content]: {
        type: PROPERTY_TYPES.non_scalar,
        isAbleToReturnMultipleResults: true,
    },
    [PROPERTIES.magnetic_moments]: {
        type: PROPERTY_TYPES.tensor,
    },
    [PROPERTIES.rxn_energy_barrier]: {
        type: PROPERTY_TYPES.scalar,
        isRefined: true,
        isAuxiliary: true,
    },
    [PROPERTIES.rxn_energy_profile]: {
        type: PROPERTY_TYPES.non_scalar,
        isRefined: true,
    },
    [PROPERTIES.potential_profile]: {
        type: PROPERTY_TYPES.non_scalar,
        isRefined: true,
    },
    [PROPERTIES.charge_density_profile]: {
        type: PROPERTY_TYPES.non_scalar,
        isRefined: true,
    },
    [PROPERTIES.jupyter_nb_endpoint]: {
        type: PROPERTY_TYPES.non_scalar,
        domain: PROPERTY_DOMAINS.workflow,
    },
    [PROPERTIES.average_potential_profile]: {
        type: PROPERTY_TYPES.non_scalar,
        isRefined: true,
    },
    [PROPERTIES.valence_band_offset]: {
        type: PROPERTY_TYPES.scalar,
        isRefined: true,
    },
    [PROPERTIES.pseudopotential]: {
        type: PROPERTY_TYPES.non_scalar,
    },
    [PROPERTIES.boundary_conditions]: {
        type: PROPERTY_TYPES.non_scalar,
    },
    [PROPERTIES.dielectric_tensor]: {
        type: PROPERTY_TYPES.non_scalar,
    },
};
