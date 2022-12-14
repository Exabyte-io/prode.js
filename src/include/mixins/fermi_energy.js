import lodash from "lodash";

export const FermiEnergyMixin = (superclass) =>
    class extends superclass {
        static Unit = null;

        // get the last fermi_energy result in the subworkflow
        get fermiEnergy() {
            if (!this.constructor.Unit) {
                throw new Error("Unit is null!");
            }
            const units = lodash
                .get(this.context, "subworkflow.units", [])
                .map((ucfg) => new this.constructor.Unit(ucfg));
            // check whether FE was intended on being calculated
            const FEUnits = units.filter((u) => u.getResultByName("fermi_energy"));
            const lastFEUnit = FEUnits && FEUnits[FEUnits.length - 1];
            // extract FE value from raw properties
            const FEProperty =
                lastFEUnit && lastFEUnit.getRawPropertiesResultByName("fermi_energy");
            return FEProperty && FEProperty.value;
        }
    };
