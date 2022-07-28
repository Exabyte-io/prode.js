import { HighChartsConfig } from "../../charts/highcharts";

export const TwoDimensionalPlotMixin = (superclass) => class extends superclass {

    get xDataArray() {
        return this.prop('xDataArray');
    }

    get yDataSeries() {
        return this.prop('yDataSeries');
    }

    get yAxis() {
        return this.prop('yAxis');
    }

    get xAxis() {
        return this.prop('xAxis');
    }

};

export class TwoDimensionalHighChartConfigMixin extends HighChartsConfig {

    constructor(property) {
        super({
            subtitle: property.subtitle,
            yAxisTitle: property.yAxisTitle,
            xAxisTitle: property.xAxisTitle,
            yAxisType: 'linear',
        });
        this.legend = false;
        this.xDataArray = property.xDataArray;
        this.yDataSeries = property.yDataSeries;
    }

    get series() {
        return _.map(this.yDataSeries, (item, index) => {
            return {
                animation: false,
                data: _.zip(this.xDataArray, item),
            };
        });
    }

    // override upon inheritance
    get tooltipXAxisName() {}

    // override upon inheritance
    get tooltipYAxisName() {}

    tooltipFormatter(xDataArray) {
        const clsInstance = this;
        return function () {
            return '<b>' + clsInstance.tooltipXAxisName + '</b> ' + xDataArray[this.point.index].toFixed(4) + '<br>' +
                '<b>' + clsInstance.tooltipYAxisName + ': </b>  ' + this.y.toFixed(4);
        }
    }

    get overrideConfig() {
        const xDataArray = this.xDataArray;
        return {
            chart: {
                animation: false,
                type: 'spline',
                zoomType: 'xy'
            },
            plotOptions: {
                spline: {
                    lineWidth: 2,
                    states: {
                        hover: {
                            lineWidth: 6
                        }
                    },
                    marker: {
                        enabled: false
                    }
                }
            },
            tooltip: {
                valueSuffix: '',
                formatter: this.tooltipFormatter(xDataArray)
            },
            legend: {
                enabled: false
            }
        }
    }
}
