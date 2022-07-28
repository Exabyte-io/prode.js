import _ from "underscore";
import lodash from "lodash";
import { mix } from "mixwith";

import { Property } from "../../property";
import { FermiEnergyMixin } from "../mixins/fermi_energy";
import { TwoDimensionalPlotMixin } from "../mixins/2d_plot";
import { HighChartsConfig } from "../../charts/highcharts";

export class DensityOfStatesProperty extends mix(Property).with(
    TwoDimensionalPlotMixin,
    FermiEnergyMixin,
) {

    get subtitle() {
        return `Density Of States`;
    }

    get yAxisTitle() {
        return `Density Of States (${this.yAxis.units})`;
    }

    get xAxisTitle() {
        return `Energy (${this.xAxis.units})`;
    }

    get legend() {
        return this.prop('legend');
    }

    get chartConfig() {
        const clsInstance = new DensityOfStatesConfig(this);
        return clsInstance.config;
    }

}

export class DensityOfStatesConfig extends HighChartsConfig {

    constructor(property) {
        super({
            subtitle: property.subtitle,
            yAxisTitle: property.yAxisTitle,
            xAxisTitle: property.xAxisTitle,
            yAxisType: 'linear',
        });

        this.yDataSeries = property.yDataSeries;
        this.legend = property.legend;
        this.spin = property.spin;
        this.fermiEnergy = property.fermiEnergy;
        this.xDataArray = this.cleanXDataArray(property.xDataArray);
    }

    // shifting values wrt fermi energy here
    cleanXDataArray(rawData = []) {
        return _.map(_.flatten(rawData), x => {
            const value = (this.fermiEnergy) ? (x - this.fermiEnergy) : x;
            return +(value.toPrecision(4));
        });
    }

    get series() {
        const clsInstance = this;
        const series_ = _.map(this.yDataSeries, (item, index) => {
            const legend = lodash.get(clsInstance, `legend.${index}`);
            const name = legend && legend.element ? `${legend.element} ${legend.electronicState}` : 'Total';
            return {
                data: _.zip(this.xDataArray, item.map(x => +(x.toPrecision(4)))),
                name: name,
                color: name === 'Total' ? '#000000' : null,
                animation: false,
            };
        });

        return series_;
    }

    tooltipFormatter(xDataArray, yAxisName = "energy") {
        return function () {
            return '<b>state:</b> ' + this.series.name + '<br>' +
                '<b>energy:</b> ' + this.key.toFixed(4) + '<br>' +
                '<b>value: </b>  ' + this.y.toFixed(4);

        }
    }

    xAxis() {
        return {
            ...super.xAxis(),
            plotLines: this.fermiEnergy ? this.plotSingleLine({
                value: 0.0,
                label: {
                    text: "E_F",
                    style: {
                        color: 'red',
                    },
                    y: 15,
                    x: 5,
                    rotation: 0,
                }
            }) : [],
        }
    }

    get overrideConfig() {
        return {
            colors: ['#7cb5ec', '#90ed7d', '#f7a35c', '#8085e9', '#f15c80', '#e4d354', '#2b908f', '#f45b5b', '#91e8e1'],
            credits: {
                enabled: false
            },
            chart: {
                type: 'spline',
                zoomType: 'xy',
                animation: false,
            },
            legend: {
                layout: 'horizontal',
                align: 'center',
                verticalAlign: 'bottom',
                borderWidth: 0
            },
        }
    }

}

