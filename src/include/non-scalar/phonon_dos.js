import { DensityOfStatesConfig, DensityOfStatesProperty } from "./density_of_states";

export class PhononDOSProperty extends DensityOfStatesProperty {
    get subtitle() {
        return `Phonon Density Of States`;
    }

    get yAxisTitle() {
        return `Density Of States (${this.yAxis.units})`;
    }

    get xAxisTitle() {
        return `Frequency (${this.xAxis.units})`;
    }

    get chartConfig() {
        const clsInstance = new PhononDOSConfig(this);
        return clsInstance.config;
    }

    get fermiEnergy() {
        // unset property
        return null;
    }
}

class PhononDOSConfig extends DensityOfStatesConfig {
    tooltipFormatter(xDataArray, yAxisName = "energy") {
        return function () {
            return "<b>state:</b> " + this.series.name + "<br>"
                + "<b>energy:</b> " + this.key.toFixed(4) + "<br>"
                + "<b>value: </b>  " + this.y.toFixed(4);
        };
    }
}
