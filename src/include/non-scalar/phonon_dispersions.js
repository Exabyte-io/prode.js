import {BandStructureProperty, BandStructureConfig} from "./band_structure";

export class PhononDispersionsProperty extends BandStructureProperty {

    get subtitle() {
        return `Phonon Dispersions`;
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

class PhononDispersionsConfig extends BandStructureConfig {

    tooltipFormatter(xDataArray, yAxisName = "frequency") {
        return super.tooltipFormatter(xDataArray, yAxisName);
    }
}
