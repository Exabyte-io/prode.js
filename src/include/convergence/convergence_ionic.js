/* eslint-disable max-classes-per-file */
import _ from "underscore";

import { HighChartsConfig } from "../../charts/highcharts";
import { Property } from "../../property";

class ConvergenceIonicConfig extends HighChartsConfig {
    constructor(monitor) {
        super({
            subtitle: "Ionic Energy",
            yAxisTitle: `Ionic Energy (${monitor.units})`,
            xAxisTitle: "Steps",
            yAxisType: "linear",
            series: [
                {
                    data: _.map(monitor.data, (value, index) => {
                        return [index + 1, value.energy];
                    }),
                },
            ],
        });
    }

    // eslint-disable-next-line class-methods-use-this
    tooltipFormatter() {
        // eslint-disable-next-line func-names
        return function () {
            // eslint-disable-next-line no-useless-concat
            return "<b>step:</b> " + this.key + "<br>" + "<b>Energy:</b> " + this.y.toFixed(4);
        };
    }
}

export class ConvergenceIonicProperty extends Property {
    get chartConfig() {
        const clsInstance = new ConvergenceIonicConfig(this);
        return clsInstance.config;
    }
}
