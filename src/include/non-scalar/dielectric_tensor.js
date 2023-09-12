/* eslint-disable class-methods-use-this */
/* eslint-disable max-classes-per-file */
import zip from "lodash/zip";

import { Property } from "../../property";
import { TwoDimensionalHighChartConfigMixin } from "../mixins/2d_plot";

export class DielectricTensorProperty extends Property {
    /**
     * @returns {{part: string, spin: number, frequencies: number[], components: number[][]}[]}
     */
    get values() {
        return this.prop("values");
    }

    get subtitle() {
        return "Dielectric Tensor";
    }

    get yAxisTitle() {
        return "Dielectric Tensor Component";
    }

    get xAxisTitle() {
        return "Frequency (eV)";
    }

    get legend() {
        return this.prop("legend");
    }

    get chartConfig() {
        return this.getAllChartConfigs().map((chartConfig) => {
            // eslint-disable-next-line no-use-before-define
            const cfg = new DielectricTensorConfig(chartConfig);
            return cfg.config;
        });
    }

    /**
     *
     * @param {[number, number, number][]} matrix
     */
    rowMajorToColumnMajor(matrix) {
        return matrix.reduce(
            (accumulator, item) => {
                const [x, y, z] = item;
                accumulator[0].push(x);
                accumulator[1].push(y);
                accumulator[2].push(z);
                return accumulator;
            },
            [[], [], []],
        );
    }

    /**
     * @returns {{part: "real" | "imaginary", spin: number, frequencies: number[], components: number[][]}[][]}
     */
    getComplementaryPairs(precision = 3) {
        const groupedBySpin = {};

        this.values.forEach((item) => {
            // Round the spin value to mitigate floating-point precision issues
            const spinValue = item.spin !== undefined ? item.spin.toFixed(precision) : "undefined";
            groupedBySpin[spinValue] = groupedBySpin[spinValue] || [];
            groupedBySpin[spinValue].push(item);
        });

        return Object.values(groupedBySpin).filter(
            (group) =>
                group.length === 2 &&
                group.find((item) => item.part === "real") &&
                group.find((item) => item.part === "imaginary"),
        );
    }

    getAllChartConfigs() {
        const complementaryPairs = this.getComplementaryPairs();

        return complementaryPairs.map((pair) => {
            const xDataArray = pair[0].frequencies;
            const spinChannel = pair[0].spin ? ` - spin(${pair[0].spin})` : "";
            return {
                subtitle: `${this.subtitle}${spinChannel}`,
                xAxisTitle: this.xAxisTitle,
                yAxisTitle: this.yAxisTitle,
                yAxisType: "linear",
                xDataArray,
                yDataSeries: pair.flatMap((p) => this.rowMajorToColumnMajor(p.components)),
                legend: pair.flatMap((p) => [..."xyz"].map((char) => `eps_${char} (${p.part})`)),
            };
        });
    }
}

export class DielectricTensorConfig extends TwoDimensionalHighChartConfigMixin {
    constructor(config) {
        super(config);
        this.legend = config.legend;
    }

    /**
     * @returns {{animation: boolean, name: string, data: number[][]}[]}
     */
    get series() {
        return this.yDataSeries.map((item, index) => {
            return {
                animation: false,
                name: this.legend[index],
                data: zip(this.xDataArray, item),
            };
        });
    }

    // eslint-disable-next-line no-unused-vars
    tooltipFormatter(xDataArray, yAxisName = "frequency") {
        // eslint-disable-next-line func-names
        return function () {
            return (
                "<b>part:</b> " +
                this.series.name +
                "<br>" +
                "<b>frequency:</b> " +
                this.key.toFixed(4) +
                "<br>" +
                "<b>epsilon: </b>  " +
                this.y.toFixed(4)
            );
        };
    }

    get overrideConfig() {
        return {
            ...super.overrideConfig,
            colors: [
                "#7cb5ec",
                "#90ed7d",
                "#f7a35c",
                "#8085e9",
                "#f15c80",
                "#e4d354",
                "#2b908f",
                "#f45b5b",
                "#91e8e1",
            ],
            credits: {
                enabled: false,
            },
            chart: {
                type: "spline",
                zoomType: "xy",
                animation: false,
            },
            legend: {
                layout: "horizontal",
                align: "center",
                verticalAlign: "bottom",
                borderWidth: 0,
            },
        };
    }
}
