import { mix } from "mixwith";

import { Property } from "../../property";
import { TwoDimensionalHighChartConfigMixin, TwoDimensionalPlotMixin } from "../mixins/2d_plot";

export class ChargeDensityProfileProperty extends mix(Property).with(TwoDimensionalPlotMixin) {

    get subtitle() {
        return `Charge Density Profile`
    }

    get yAxisTitle() {
        return `Charge Density (${this.yAxis.units})`
    }

    get xAxisTitle() {
        return "Z Coordinate"
    }

    get chartConfig() {
        return (new ChargeDensityProfileConfig(this)).config
    }

}

export class ChargeDensityProfileConfig extends TwoDimensionalHighChartConfigMixin {

    get tooltipXAxisName() {
        return "z coordinate"
    }

    get tooltipYAxisName() {
        return "charge density"
    }

}
