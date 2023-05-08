/* eslint-disable max-classes-per-file */
import lodash from "lodash";

import { HighChartsConfig } from "../../charts/highcharts";

/* eslint-disable max-classes-per-file */

export const TwoDimensionalPlotMixin = (superclass) =>
    class extends superclass {
        get xDataArray() {
            return this.prop("xDataArray");
        }

        get yDataSeries() {
            return this.prop("yDataSeries");
        }

        get yAxis() {
            return this.prop("yAxis");
        }

        get xAxis() {
            return this.prop("xAxis");
        }
    };

export class TwoDimensionalHighChartConfigMixin extends HighChartsConfig {
    constructor(property) {
        super({
            subtitle: property.subtitle,
            yAxisTitle: property.yAxisTitle,
            xAxisTitle: property.xAxisTitle,
            yAxisType: "linear",
        });
        this.legend = false;
        this.xDataArray = property.xDataArray;
        this.yDataSeries = property.yDataSeries;
    }

    get series() {
        return lodash.map(this.yDataSeries, (item) => {
            return {
                animation: false,
                data: lodash.zip(this.xDataArray, item),
            };
        });
    }

    // override upon inheritance
    // eslint-disable-next-line class-methods-use-this
    get tooltipXAxisName() {
        return "";
    }

    // override upon inheritance
    // eslint-disable-next-line class-methods-use-this
    get tooltipYAxisName() {
        return "";
    }

    tooltipFormatter(xDataArray) {
        const clsInstance = this;
        // note 'this' below refers to Highcharts tooltip scope, thus arrow functions won't work.
        // eslint-disable-next-line func-names
        return function () {
            return (
                "<b>" +
                clsInstance.tooltipXAxisName +
                "</b> " +
                xDataArray[this.point.index].toFixed(4) +
                "<br><b>" +
                clsInstance.tooltipYAxisName +
                ": </b>  " +
                this.y.toFixed(4)
            );
        };
    }

    get overrideConfig() {
        const { xDataArray } = this;
        return {
            chart: {
                animation: false,
                type: "spline",
                zoomType: "xy",
            },
            plotOptions: {
                spline: {
                    lineWidth: 2,
                    states: {
                        hover: {
                            lineWidth: 6,
                        },
                    },
                    marker: {
                        enabled: false,
                    },
                },
            },
            tooltip: {
                valueSuffix: "",
                formatter: this.tooltipFormatter(xDataArray),
            },
            legend: {
                enabled: false,
            },
        };
    }
}
