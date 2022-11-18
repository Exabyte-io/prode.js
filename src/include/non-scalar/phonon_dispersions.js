/* eslint-disable class-methods-use-this */
/* eslint-disable max-classes-per-file */
import { BandStructureConfig, BandStructureProperty } from "./band_structure";

class PhononDispersionsConfig extends BandStructureConfig {
    tooltipFormatter(xDataArray, yAxisName = "frequency") {
        return super.tooltipFormatter(xDataArray, yAxisName);
    }
}

export class PhononDispersionsProperty extends BandStructureProperty {
    get subtitle() {
        return "Phonon Dispersions";
    }

    get yAxisTitle() {
        return `Frequency (${this.yAxis.units})`;
    }

    get chartConfig() {
        const clsInstance = new PhononDispersionsConfig(this);
        return clsInstance.config;
    }

    get fermiEnergy() {
        // unset property
        return null;
    }
}
