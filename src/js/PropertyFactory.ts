import type { Constructor } from "@mat3ra/code/dist/js/utils/types";
import type {
    MetaPropertyHolderSchema,
    PropertyHolderSchema,
    ProtoPropertyHolderSchema,
} from "@mat3ra/esse/dist/js/types";

import PseudopotentialProperty from "./meta_properties/PseudopotentialMetaProperty";
import type MetaProperty from "./MetaProperty";
import FormationEnergyContributionsProperty from "./properties/array-of-objects/FormationEnergyContributionsProperty";
import AveragePotentialProfileProperty from "./properties/non-scalar/AveragePotentialProfileProperty";
import BandGapsProperty from "./properties/non-scalar/BandGapsProperty";
import BandStructureProperty from "./properties/non-scalar/BandStructureProperty";
import ChargeDensityProfileProperty from "./properties/non-scalar/ChargeDensityProfileProperty";
import ConvergenceElectronicProperty from "./properties/non-scalar/convergence/ConvergenceElectronicProperty";
import ConvergenceIonicProperty from "./properties/non-scalar/convergence/ConvergenceIonicProperty";
import DensityOfStatesProperty from "./properties/non-scalar/DensityOfStatesProperty";
import DielectricTensorProperty from "./properties/non-scalar/DielectricTensorProperty";
import FileContentProperty from "./properties/non-scalar/FileContentProperty";
import FinalStructureProperty from "./properties/non-scalar/FinalStructureProperty";
import HubbardUProperty from "./properties/non-scalar/HubbardUProperty";
import HubbardVNNProperty from "./properties/non-scalar/HubbardVNNProperty";
import HubbardVProperty from "./properties/non-scalar/HubbardVProperty";
import HysteresisLoopProperty from "./properties/non-scalar/HysteresisLoopProperty";
import IsRelaxedProperty from "./properties/non-scalar/IsRelaxedProperty";
import JupyterNotebookEndpointProperty from "./properties/non-scalar/JupyterNotebookEndpointProperty";
import PhononDispersionsProperty from "./properties/non-scalar/PhononDispersionsProperty";
import PhononDOSProperty from "./properties/non-scalar/PhononDOSProperty";
import PotentialProfileProperty from "./properties/non-scalar/PotentialProfileProperty";
import ReactionEnergyProfileProperty from "./properties/non-scalar/ReactionEnergyProfileProperty";
import WavefunctionAmplitudeProperty from "./properties/non-scalar/WavefunctionAmplitudeProperty";
import WorkflowProperty from "./properties/non-scalar/WorkflowProperty";
import TotalEnergyContributionsProperty from "./properties/object/TotalEnergyContributionsProperty";
import DefectFormationEnergyProperty from "./properties/scalar/DefectFormationEnergyProperty";
import FermiEnergyProperty from "./properties/scalar/FermiEnergyProperty";
import FormationEnergyProperty from "./properties/scalar/FormationEnergyProperty";
import HOMOEnergyProperty from "./properties/scalar/HOMOEnergyProperty";
import InterfacialEnergyProperty from "./properties/scalar/InterfacialEnergyProperty";
import IonizationPotentialElementalProperty from "./properties/scalar/IonizationPotentialElementalProperty";
import LUMOEnergyProperty from "./properties/scalar/LUMOEnergyProperty";
import PressureProperty from "./properties/scalar/PressureProperty";
import ReactionEnergyBarrierProperty from "./properties/scalar/ReactionEnergyBarrierProperty";
import SurfaceEnergyProperty from "./properties/scalar/SurfaceEnergyProperty";
import ThermalCorrectionToEnergyProperty from "./properties/scalar/ThermalCorrectionToEnergyProperty";
import ThermalCorrectionToEnthalpyProperty from "./properties/scalar/ThermalCorrectionToEnthalpyProperty";
import TotalEnergyProperty from "./properties/scalar/TotalEnergyProperty";
import TotalForcesProperty from "./properties/scalar/TotalForceProperty";
import ValenceBandOffsetProperty from "./properties/scalar/ValenceBandOffsetProperty";
import ZeroPointEnergyProperty from "./properties/scalar/ZeroPointEnergyProperty";
import AtomicForcesProperty from "./properties/tensor/AtomicForcesProperty";
import MagneticMomentsProperty from "./properties/tensor/MagneticMomentsProperty";
import StressTensorProperty from "./properties/tensor/StressTensorProperty";
import type Property from "./Property";
import AtomicConstraintsProperty from "./proto_properties/AtomicConstraintsProperty";
import BoundaryConditionsProperty from "./proto_properties/BoundaryConditionsProperty";
import { PropertyName, PropertyType } from "./settings";

type AnyProperty = PropertyHolderSchema["data"];
type AnyMetaProperty = MetaPropertyHolderSchema["data"];
type AnyProtoProperty = ProtoPropertyHolderSchema["data"];

type PropertyClassMap = {
    [key in PropertyHolderSchema["data"]["name"]]:
        | Constructor<PressureProperty>
        | Constructor<TotalForcesProperty>
        | Constructor<TotalEnergyProperty>
        | Constructor<HOMOEnergyProperty>
        | Constructor<LUMOEnergyProperty>
        | Constructor<FormationEnergyProperty>
        | Constructor<SurfaceEnergyProperty>
        | Constructor<InterfacialEnergyProperty>
        | Constructor<DefectFormationEnergyProperty>
        | Constructor<ConvergenceElectronicProperty>
        | Constructor<ConvergenceIonicProperty>
        | Constructor<FermiEnergyProperty>
        | Constructor<ThermalCorrectionToEnergyProperty>
        | Constructor<ThermalCorrectionToEnthalpyProperty>
        | Constructor<ZeroPointEnergyProperty>
        | Constructor<TotalEnergyContributionsProperty>
        | Constructor<FormationEnergyContributionsProperty>
        | Constructor<AtomicForcesProperty>
        | Constructor<StressTensorProperty>
        | Constructor<DensityOfStatesProperty>
        | Constructor<BandStructureProperty>
        | Constructor<BandGapsProperty>
        | Constructor<PhononDispersionsProperty>
        | Constructor<PhononDOSProperty>
        | Constructor<FinalStructureProperty>
        | Constructor<IsRelaxedProperty>
        | Constructor<WorkflowProperty>
        | Constructor<MagneticMomentsProperty>
        | Constructor<ReactionEnergyBarrierProperty>
        | Constructor<ReactionEnergyProfileProperty>
        | Constructor<HysteresisLoopProperty>
        | Constructor<PotentialProfileProperty>
        | Constructor<WavefunctionAmplitudeProperty>
        | Constructor<ChargeDensityProfileProperty>
        | Constructor<AveragePotentialProfileProperty>
        | Constructor<ValenceBandOffsetProperty>
        | Constructor<IonizationPotentialElementalProperty>
        | Constructor<FileContentProperty>
        | Constructor<DielectricTensorProperty>
        | Constructor<HubbardUProperty>
        | Constructor<HubbardVNNProperty>
        | Constructor<HubbardVProperty>
        | Constructor<JupyterNotebookEndpointProperty>;
};

type MetaPropertyClassMap = {
    [key in MetaPropertyHolderSchema["data"]["name"]]: Constructor<PseudopotentialProperty>;
};

type ProtoPropertyClassMap = {
    [key in ProtoPropertyHolderSchema["data"]["name"]]:
        | Constructor<BoundaryConditionsProperty>
        | Constructor<AtomicConstraintsProperty>;
};

const PROPERTY_CLASS_MAP: PropertyClassMap = {
    [PressureProperty.propertyName]: PressureProperty,
    [TotalForcesProperty.propertyName]: TotalForcesProperty,
    [TotalEnergyProperty.propertyName]: TotalEnergyProperty,
    [HOMOEnergyProperty.propertyName]: HOMOEnergyProperty,
    [LUMOEnergyProperty.propertyName]: LUMOEnergyProperty,
    [FormationEnergyProperty.propertyName]: FormationEnergyProperty,
    [SurfaceEnergyProperty.propertyName]: SurfaceEnergyProperty,
    [InterfacialEnergyProperty.propertyName]: InterfacialEnergyProperty,
    [DefectFormationEnergyProperty.propertyName]: DefectFormationEnergyProperty,
    [ConvergenceElectronicProperty.propertyName]: ConvergenceElectronicProperty,
    [ConvergenceIonicProperty.propertyName]: ConvergenceIonicProperty,
    [FermiEnergyProperty.propertyName]: FermiEnergyProperty,
    [ThermalCorrectionToEnergyProperty.propertyName]: ThermalCorrectionToEnergyProperty,
    [ThermalCorrectionToEnthalpyProperty.propertyName]: ThermalCorrectionToEnthalpyProperty,
    [ZeroPointEnergyProperty.propertyName]: ZeroPointEnergyProperty,
    [TotalEnergyContributionsProperty.propertyName]: TotalEnergyContributionsProperty,
    [FormationEnergyContributionsProperty.propertyName]: FormationEnergyContributionsProperty,
    [AtomicForcesProperty.propertyName]: AtomicForcesProperty,
    [StressTensorProperty.propertyName]: StressTensorProperty,
    [DensityOfStatesProperty.propertyName]: DensityOfStatesProperty,
    [BandStructureProperty.propertyName]: BandStructureProperty,
    [BandGapsProperty.propertyName]: BandGapsProperty,
    [PhononDispersionsProperty.propertyName]: PhononDispersionsProperty,
    [PhononDOSProperty.propertyName]: PhononDOSProperty,
    [FinalStructureProperty.propertyName]: FinalStructureProperty,
    [IsRelaxedProperty.propertyName]: IsRelaxedProperty,
    [WorkflowProperty.propertyName]: WorkflowProperty,
    [MagneticMomentsProperty.propertyName]: MagneticMomentsProperty,
    [ReactionEnergyBarrierProperty.propertyName]: ReactionEnergyBarrierProperty,
    [ReactionEnergyProfileProperty.propertyName]: ReactionEnergyProfileProperty,
    [HysteresisLoopProperty.propertyName]: HysteresisLoopProperty,
    [PotentialProfileProperty.propertyName]: PotentialProfileProperty,
    [WavefunctionAmplitudeProperty.propertyName]: WavefunctionAmplitudeProperty,
    [ChargeDensityProfileProperty.propertyName]: ChargeDensityProfileProperty,
    [AveragePotentialProfileProperty.propertyName]: AveragePotentialProfileProperty,
    [ValenceBandOffsetProperty.propertyName]: ValenceBandOffsetProperty,
    [IonizationPotentialElementalProperty.propertyName]: IonizationPotentialElementalProperty,
    [FileContentProperty.propertyName]: FileContentProperty,
    [DielectricTensorProperty.propertyName]: DielectricTensorProperty,
    [HubbardUProperty.propertyName]: HubbardUProperty,
    [HubbardVNNProperty.propertyName]: HubbardVNNProperty,
    [HubbardVProperty.propertyName]: HubbardVProperty,
    [JupyterNotebookEndpointProperty.propertyName]: JupyterNotebookEndpointProperty,
};

const META_PROPERTY_CLASS_MAP: MetaPropertyClassMap = {
    [PseudopotentialProperty.propertyName]: PseudopotentialProperty,
};

const PROTO_PROPERTY_CLASS_MAP: ProtoPropertyClassMap = {
    [BoundaryConditionsProperty.propertyName]: BoundaryConditionsProperty,
    [AtomicConstraintsProperty.propertyName]: AtomicConstraintsProperty,
};

export default class PropertyFactory {
    static methodsTree: Record<string, () => void> = {};

    static getRefinedPropertyNames(): PropertyName[] {
        return this.filterPropertyNames((PropertyClass) => {
            return (PropertyClass as typeof Property).isRefined;
        });
    }

    static getConvergencePropertyNames(): PropertyName[] {
        return this.filterPropertyNames((PropertyClass) => {
            return (PropertyClass as typeof Property).isConvergence;
        });
    }

    static getMultipleResultsPropertyNames(): PropertyName[] {
        return this.filterPropertyNames((PropertyClass) => {
            return (PropertyClass as typeof Property).isAbleToReturnMultipleResults;
        });
    }

    static getScalarPropertyNames(): PropertyName[] {
        return this.filterPropertyNames((PropertyClass) => {
            return (PropertyClass as typeof Property).propertyType === PropertyType.scalar;
        });
    }

    static getNonScalarPropertyNames(): PropertyName[] {
        return this.filterPropertyNames((PropertyClass) => {
            return (PropertyClass as typeof Property).propertyType === PropertyType.non_scalar;
        });
    }

    static getArrayOfObjectsPropertyNames(): PropertyName[] {
        return this.filterPropertyNames((PropertyClass) => {
            return (
                (PropertyClass as typeof Property).propertyType === PropertyType.array_of_objects
            );
        });
    }

    private static filterPropertyNames(
        filterFn: (PropertyClass: Constructor<Property>) => boolean,
    ): PropertyName[] {
        const properties = Object.values({
            ...PROPERTY_CLASS_MAP,
            ...META_PROPERTY_CLASS_MAP,
            ...PROTO_PROPERTY_CLASS_MAP,
        });

        return properties.filter(filterFn).map((PropertyClass: Constructor<Property>) => {
            return (PropertyClass as typeof Property).propertyName;
        });
    }

    static createProperty(config: AnyProperty) {
        const PropertyClass = PROPERTY_CLASS_MAP[config.name];

        return new PropertyClass(config);
    }

    static createMetaProperty(config: AnyMetaProperty): MetaProperty {
        const { name } = config;
        const PropertyClass = META_PROPERTY_CLASS_MAP[name];
        return new PropertyClass(config);
    }

    static createProtoProperty(config: AnyProtoProperty) {
        const { name } = config;
        const PropertyClass = PROTO_PROPERTY_CLASS_MAP[name];
        return new PropertyClass(config);
    }
}
