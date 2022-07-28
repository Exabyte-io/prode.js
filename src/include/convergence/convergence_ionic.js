import _ from "underscore";

import { Property } from "../../property";
import { HighChartsConfig } from "../../charts/highcharts";

export class ConvergenceIonicProperty extends Property {

    get chartConfig() {
        const clsInstance = new ConvergenceIonicConfig(this);
        return clsInstance.config;
    }

}

class ConvergenceIonicConfig extends HighChartsConfig {
    constructor(monitor) {
        super({
            subtitle: "Ionic Energy",
            yAxisTitle: `Ionic Energy (${monitor.units})`,
            xAxisTitle: 'Steps',
            yAxisType: 'linear',
            series: [
                {
                    data: _.map(monitor.data, (value, index) => {
                        return [index + 1, value.energy];
                    })
                }
            ],
        })
    }

    tooltipFormatter() {
        return function () {
            return '<b>step:</b> ' + this.key + '<br>' + '<b>Energy:</b> ' + this.y.toFixed(4);
        }
    }

}
