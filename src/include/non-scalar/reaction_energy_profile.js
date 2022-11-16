import { mix } from "mixwith";

import { Property } from "../../property";
import {
    TwoDimensionalHighChartConfigMixin,
    TwoDimensionalPlotMixin,
} from "../mixins/2d_plot";

export class ReactionEnergyProfileProperty extends mix(Property).with(TwoDimensionalPlotMixin) {
    get subtitle() {
        return `Reaction Energy Profile`;
    }

    get yAxisTitle() {
        return `Energy (${this.yAxis.units})`;
    }

    get xAxisTitle() {
        return "Reaction Coordinate";
    }

    get chartConfig() {
        const clsInstance = new ReactionEnergyProfileConfig(this);
        return clsInstance.config;
    }
}

export class ReactionEnergyProfileConfig extends TwoDimensionalHighChartConfigMixin {
    get tooltipXAxisName() {
        return "reaction coordinate";
    }

    get tooltipYAxisName() {
        return "energy";
    }
}
