/* eslint-disable class-methods-use-this */
// eslint-disable-next-line max-classes-per-file
import { math as codeJSMath } from "@exabyte-io/code.js/dist/math";
import { deepClone } from "@exabyte-io/code.js/dist/utils";
import lodash from "lodash";
import { mix } from "mixwith";

import { HighChartsConfig } from "../../charts/highcharts";
import { Property } from "../../property";
import { TwoDimensionalPlotMixin } from "../mixins/2d_plot";
import { FermiEnergyMixin } from "../mixins/fermi_energy";
import { ReciprocalPathMixin } from "../mixins/reciprocal_path";
import { SpinDependentMixin } from "../mixins/spin_dependent";

export const _POINT_COORDINATES_PRECISION_ = 4; // number of decimals to keep for point coordinates

export class BandStructureConfig extends HighChartsConfig {
    constructor(property) {
        super({
            subtitle: property.subtitle,
            yAxisTitle: property.yAxisTitle,
            yAxisType: "linear",
        });

        this.yDataSeries = property.yDataSeries;
        this.spin = property.spin;
        this.xDataArray = this.cleanXDataArray(property.xDataArray);

        this.pointsPath = property.pointsPath;
        this.pointsDistanceArray = this.calculatePointsDistance(this.xDataArray);

        this.fermiEnergy = property.fermiEnergy;

        this.plotXLineAtPoint = this.plotXLineAtPoint.bind(this);
        this.plotXLines = this.plotXLines.bind(this);
    }

    // round each value in array to certain precision
    cleanXDataArray(rawData = []) {
        return rawData.map(
            (p) =>
                p &&
                p.map(
                    (c) => c && codeJSMath.roundValueToNDecimals(c, _POINT_COORDINATES_PRECISION_),
                ),
        );
    }

    // returns the array of distances calculated from an array of points
    calculatePointsDistance(listOfPoints = []) {
        let pointsDistanceSum = 0;
        return listOfPoints.map((el, idx, arr) => {
            if (idx !== 0) {
                pointsDistanceSum += codeJSMath.vDist(el, arr[idx - 1]);
            }
            return pointsDistanceSum;
        });
    }

    // find index of a point inside an array of points
    findSymmetryPointIndex(xDataArray, point) {
        return xDataArray.findIndex((p) => codeJSMath.vDist(p, point) === 0);
    }

    // create config for vertical lines at high symmetry points
    plotXLines() {
        const copiedXDataArray = deepClone(this.xDataArray);
        return this.pointsPath
            .map((p) => {
                const idx = this.findSymmetryPointIndex(copiedXDataArray, p.coordinates);
                // "reset" element at index if found to avoid duplicate matches
                if (idx > -1) copiedXDataArray[idx] = [-1, -1, -1];
                return {
                    point: p.point,
                    distance: idx > -1 ? this.pointsDistanceArray[idx] : null,
                };
            })
            .map(this.plotXLineAtPoint);
    }

    plotXLineAtPoint({ point, distance }) {
        return {
            label: {
                verticalAlign: "bottom",
                rotation: 0,
                align: "center",
                y: 20,
                x: 0,
                text: point,
            },
            value: distance,
            width: 1,
            dashStyle: "solid",
            color: "#E0E0E0",
        };
    }

    get series() {
        const { fermiEnergy } = this;
        // eslint-disable-next-line no-unused-vars
        const { data } = this;

        const series_ = lodash.map(this.yDataSeries, (item, index) => {
            // shift values by fermiEnergy
            // eslint-disable-next-line no-param-reassign
            item = lodash.map(item, (x) => {
                return fermiEnergy ? x - fermiEnergy : x;
            });
            const spin = lodash.get(this, `spin.${index}`) > 0 ? "up" : "down";
            return {
                data: lodash.zip(this.pointsDistanceArray, item),
                name: spin,
                color: spin === "up" ? "#3677d9" : "#36c9d9",
                animation: false,
            };
        });

        return series_;
    }

    xAxis() {
        return {
            minorGridLineColor: "#E0E0E0",
            minorGridLineWidth: 2,
            minorTickLength: 0,
            title: {
                text: "Path in reciprocal space",
                offset: 40,
            },
            type: "linear",
            tickPositioner: () => [], // disable ticks
            plotLines: this.pointsPath ? this.plotXLines() : null,
            labels: {
                enabled: false,
            },
        };
    }

    tooltipFormatter(xDataArray, yAxisName = "energy") {
        // note 'this' below refers to Highcharts tooltip scope
        // eslint-disable-next-line func-names
        return function () {
            return (
                "<b>spin:</b> " +
                this.series.name +
                "<br>" +
                "<b>point:</b> " +
                xDataArray.map((p) => p.map((c) => c.toFixed(_POINT_COORDINATES_PRECISION_)))[
                    this.point.index
                ] +
                "<br>" +
                "<b>" +
                yAxisName +
                ": </b>  " +
                this.y.toFixed(4)
            );
        };
    }

    yAxis() {
        return {
            ...super.yAxis(),
            gridZIndex: 1,
            plotLines: this.fermiEnergy
                ? this.plotSingleLine({
                      value: 0.0,
                      width: 2, // to be shown above above grid/tickLine at zero
                      label: {
                          text: "E_F",
                          style: {
                              color: "red",
                          },
                          y: -5,
                          x: -10,
                      },
                  })
                : [],
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

export class BandStructureProperty extends mix(Property).with(
    SpinDependentMixin,
    TwoDimensionalPlotMixin,
    ReciprocalPathMixin,
    FermiEnergyMixin,
) {
    get subtitle() {
        return "Electronic Bandstructure";
    }

    get yAxisTitle() {
        return `Energy (${this.yAxis.units})`;
    }

    get chartConfig() {
        const clsInstance = new BandStructureConfig(this);
        return clsInstance.config;
    }
}
