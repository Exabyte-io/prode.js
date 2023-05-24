/* eslint-disable class-methods-use-this */
/* eslint-disable max-classes-per-file */
import lodash from "lodash";
import { mix } from "mixwith";

import { Property } from "../../property";
import { TwoDimensionalHighChartConfigMixin, TwoDimensionalPlotMixin } from "../mixins/2d_plot";

const NAMES = {
    0: "averageVHartree",
    1: "averageVLocal",
    2: "averageVHartreePlusLocal",
};

export class PotentialProfileConfig extends TwoDimensionalHighChartConfigMixin {
    get tooltipXAxisName() {
        return "z coordinate";
    }

    get tooltipYAxisName() {
        return "energy";
    }

    get series() {
        return lodash.map(this.yDataSeries, (item, index) => {
            return {
                animation: false,
                name: NAMES[index],
                data: lodash.zip(this.xDataArray, item),
            };
        });
    }

    get overrideConfig() {
        return {
            ...super.overrideConfig,
            legend: {
                layout: "horizontal",
                align: "center",
                verticalAlign: "bottom",
                borderWidth: 0,
            },
        };
    }
}

export class PotentialProfileProperty extends mix(Property).with(TwoDimensionalPlotMixin) {
    get subtitle() {
        return "Potential Profile";
    }

    get yAxisTitle() {
        return `Energy (${this.yAxis.units})`;
    }

    get xAxisTitle() {
        return "Z Coordinate";
    }

    get chartConfig() {
        return new PotentialProfileConfig(this).config;
    }
}
