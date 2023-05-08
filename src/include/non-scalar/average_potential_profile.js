/* eslint-disable max-classes-per-file */
import lodash from "lodash";
import { mix } from "mixwith";

import { Property } from "../../property";
import { TwoDimensionalHighChartConfigMixin, TwoDimensionalPlotMixin } from "../mixins/2d_plot";

/* eslint-disable max-classes-per-file */

const NAMES = {
    0: "planar average",
    1: "macroscopic average",
};

export class AveragePotentialProfileProperty extends mix(Property).with(TwoDimensionalPlotMixin) {
    // eslint-disable-next-line class-methods-use-this
    get subtitle() {
        return "Average Potential Profile";
    }

    get yAxisTitle() {
        return `Energy (${this.yAxis.units})`;
    }

    get xAxisTitle() {
        return `Coordinate (${this.xAxis.units})`;
    }

    get chartConfig() {
        // eslint-disable-next-line no-use-before-define
        return new AveragePotentialProfileConfig(this).config;
    }
}

export class AveragePotentialProfileConfig extends TwoDimensionalHighChartConfigMixin {
    // eslint-disable-next-line class-methods-use-this
    get tooltipXAxisName() {
        return "z coordinate";
    }

    // eslint-disable-next-line class-methods-use-this
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
