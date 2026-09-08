import type { Constructor } from "@mat3ra/code/dist/js/utils/types";
import type { HysteresisLoopPropertySchema } from "@mat3ra/esse/dist/js/types";
import type { Options } from "highcharts";

import {
    HysteresisLoopPropertySchemaMixin,
    hysteresisLoopPropertySchemaMixin,
} from "../../generated/HysteresisLoopPropertySchemaMixin";
import Property from "../../Property";
import { PropertyName, PropertyType } from "../../settings";
import {
    type TwoDimensionalHighChartConfigMixinParams,
    TwoDimensionalHighChartConfigMixin,
} from "../include/mixins/2d_plot";

type Schema = HysteresisLoopPropertySchema;

const FIELD_CONDITION_NAMES: Record<string, string> = {
    on: "On-field",
    off: "Off-field",
};

export class HysteresisLoopConfig extends TwoDimensionalHighChartConfigMixin {
    readonly tooltipXAxisName: string = "bias";

    readonly tooltipYAxisName: string;

    readonly seriesNames: Schema["legend"];

    constructor(
        property: TwoDimensionalHighChartConfigMixinParams & Pick<Schema, "yAxis" | "legend">,
    ) {
        super({
            subtitle: property.subtitle,
            yAxisTitle: property.yAxisTitle,
            xAxisTitle: property.xAxisTitle,
            xDataArray: property.xDataArray,
            yDataSeries: property.yDataSeries,
        });
        this.tooltipYAxisName = property.yAxis.label;
        this.seriesNames = property.legend;
    }

    get series() {
        return super.series.map((series, index) => {
            const seriesName = this.seriesNames?.[index];
            return {
                ...series,
                name: (seriesName && FIELD_CONDITION_NAMES[seriesName]) || seriesName,
            };
        });
    }

    get overrideConfig() {
        return {
            ...super.overrideConfig,
            legend: {
                enabled: true,
                layout: "horizontal",
                align: "center",
                verticalAlign: "bottom",
                borderWidth: 0,
            },
        };
    }
}

type Base = typeof Property<Schema> & Constructor<HysteresisLoopPropertySchemaMixin>;

class HysteresisLoopProperty extends (Property as Base) implements Schema {
    readonly subtitle: string = "Hysteresis Loop";

    readonly yAxisTitle: string = `${Property.prettifyName(this.yAxis.label)} (${
        this.yAxis.units
    })`;

    readonly xAxisTitle: string = `Bias (${this.xAxis.units})`;

    readonly chartConfig: Options = new HysteresisLoopConfig(this).config;

    static readonly isRefined = true;

    static readonly propertyName = PropertyName.hysteresis_loop;

    static readonly propertyType = PropertyType.non_scalar;

    constructor(config: Omit<Schema, "name">) {
        super({ ...config, name: HysteresisLoopProperty.propertyName });
    }
}

hysteresisLoopPropertySchemaMixin(HysteresisLoopProperty.prototype);

export default HysteresisLoopProperty;
