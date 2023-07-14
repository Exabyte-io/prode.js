import { ConvergenceElectronicProperty } from "./include/convergence/convergence_electronic";
import { ConvergenceIonicProperty } from "./include/convergence/convergence_ionic";
import { Pseudopotential } from "./include/meta_properties/pseudopotential";
import { AveragePotentialProfileProperty } from "./include/non-scalar/average_potential_profile";
import { BandGapsProperty } from "./include/non-scalar/band_gaps";
import { BandStructureProperty } from "./include/non-scalar/band_structure";
import { ChargeDensityProfileProperty } from "./include/non-scalar/charge_density_profile";
import { DensityOfStatesProperty } from "./include/non-scalar/density_of_states";
import { PhononDispersionsProperty } from "./include/non-scalar/phonon_dispersions";
import { PhononDOSProperty } from "./include/non-scalar/phonon_dos";
import { PotentialProfileProperty } from "./include/non-scalar/potential_profile";
import { ReactionEnergyProfileProperty } from "./include/non-scalar/reaction_energy_profile";
import { StructureProperty } from "./include/non-scalar/structure";
import { WorkflowProperty } from "./include/non-scalar/workflow";
import { ObjectProperty } from "./include/primitive/object";
import { TensorProperty } from "./include/primitive/tensor";
import { Property } from "./property";
import { PROPERTIES, PROPERTY_TYPES } from "./settings";

/**
 * @desc Used in property factory to map property names to property classes.
 */
export const PROPERTY_CLASS_MAP = {
    [PROPERTIES.pressure]: null,
    [PROPERTIES.total_force]: null,
    [PROPERTIES.total_energy]: null,
    [PROPERTIES.surface_energy]: null,
    [PROPERTIES.convergence_elec]: ConvergenceElectronicProperty,
    [PROPERTIES.convergence_ion]: ConvergenceIonicProperty,
    [PROPERTIES.fermi_energy]: null,
    [PROPERTIES.zero_point_energy]: null,
    [PROPERTIES.total_energy_contrib]: null,
    [PROPERTIES.atomic_forces]: null,
    [PROPERTIES.atomic_constraints]: null,
    [PROPERTIES.stress_tensor]: null,
    [PROPERTIES.dos]: DensityOfStatesProperty,
    [PROPERTIES.band_structure]: BandStructureProperty,
    [PROPERTIES.band_gaps]: BandGapsProperty,
    [PROPERTIES.phonon_dispersions]: PhononDispersionsProperty,
    [PROPERTIES.phonon_dos]: PhononDOSProperty,
    [PROPERTIES.predicted_properties]: null,
    [PROPERTIES.final_structure]: StructureProperty,
    [PROPERTIES.is_relaxed]: null,
    [PROPERTIES.w_ml_predict]: WorkflowProperty,
    [PROPERTIES.w_pyml_predict]: WorkflowProperty,
    [PROPERTIES.file_content]: null,
    [PROPERTIES.magnetic_moments]: null,
    [PROPERTIES.rxn_energy_barrier]: null,
    [PROPERTIES.rxn_energy_profile]: ReactionEnergyProfileProperty,
    [PROPERTIES.potential_profile]: PotentialProfileProperty,
    [PROPERTIES.charge_density_profile]: ChargeDensityProfileProperty,
    [PROPERTIES.jupyter_nb_endpoint]: null,
    [PROPERTIES.average_potential_profile]: AveragePotentialProfileProperty,
    [PROPERTIES.valence_band_offset]: null,
    [PROPERTIES.pseudopotential]: Pseudopotential,
    [PROPERTIES.boundary_conditions]: null,
};

export const PROPERTY_BRANCH_MAP = {
    [PROPERTY_TYPES.tensor]: TensorProperty,
    [PROPERTY_TYPES.object]: ObjectProperty,
    [PROPERTY_TYPES.non_scalar]: Property,
    [PROPERTY_TYPES.scalar]: Property,
};
