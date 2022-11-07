import _ from "underscore";

import { HighChartsConfig } from "../../charts/highcharts";
import { Property } from "../../property";

/* eslint-disable max-classes-per-file */

export class ConvergenceElectronicProperty extends Property {
    get chartConfig() {
        // eslint-disable-next-line no-use-before-define
        const clsInstance = new ConvergenceElectronicConfig(this);
        return clsInstance.config;
    }

    /**
     * Data is transferred in a flat way from Rupy but it is stored in a nested array format on webapp.
     * This function is a converter (see example).
     *
     * @example
     * _convertData(
     *   [{index: 0, value: 0},
     *    {index: 0, value: 1},
     *    {index: 1, value: 2}]
     * );
     * // returns [[0,1], [2]]
     */
    // eslint-disable-next-line class-methods-use-this
    _convertData(currentData = [], newData = []) {
        let data = [];
        currentData.forEach((values, index) => {
            values.forEach((value) => {
                data.push({
                    index,
                    value,
                });
            });
        });
        data = Object.values(_.groupBy(data.concat(newData), (x) => x.index));
        return data.map((energies) => energies.map((energy) => energy.value));
    }
}

class ConvergenceElectronicConfig extends HighChartsConfig {
    constructor(monitor) {
        let iteration = 1;
        let data = { ...monitor.data };
        // Old monitors are stored in a flat list, hence data = [data]
        if (!Array.isArray(data[0])) data = [data];
        const series = _.map(data, (values, index) => {
            // TODO: format index properly
            const name = parseInt(index, 10) + 1;
            return {
                name: `step-${name}`,
                data: _.map(values, (value) => {
                    // give points unique xAxis value to show multiple series properly in highCharts
                    const point = [iteration, Math.abs(value)];
                    iteration += 1;
                    return point;
                }),
            };
        });

        super({
            subtitle: "Convergence Electronic",
            yAxisTitle: `Convergence Electronic (${monitor.units})`,
            xAxisTitle: "Iterations",
            yAxisType: "logarithmic",
            series,
            legend: series.length > 1,
        });
    }

    // eslint-disable-next-line class-methods-use-this
    tooltipFormatter() {
        return () => {
            return "<b>iteration:</b> " + this.key + "<br><b>Δ E:</b> " + this.y.toExponential(1);
        };
    }

    // yAxis() can't be a getter because of super!
    yAxis() {
        return {
            ...super.yAxis(),
            labels: {
                formatter: () => {
                    return this.value.toExponential();
                },
            },
        };
    }
}
