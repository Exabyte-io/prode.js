/**
 * @summary Forms the object that is used to generate a Highcharts chart containing comparing data.
 * @param title {String} Chart title
 * @param items {Object} Comparing values. E.g. [{name: 'Si2', value: 10}, {name: 'Li2', value: 12}]
 */
export function compareChartConfig(title, items) {
    const series = items.map((item, index) => {
        return {
            name: item.name,
            data: (Number.isFinite(item.value)) ? [[index, item.value]] : [],
        };
    });
    return {
        credits: {
            enabled: false,
        },
        chart: {
            type: "scatter",
            zoomType: "xy",
        },
        title: {
            text: "",
        },
        subtitle: {
            text: "",
        },
        exporting: {
            enabled: true,
        },
        xAxis: {
            labels: {
                enabled: false,
            },
            title: {
                enabled: true,
                text: "",
            },
            startOnTick: true,
            endOnTick: true,
            showLastLabel: true,
        },
        yAxis: {
            title: {
                text: title,
            },
        },
        legend: {
            verticalAlign: "bottom",
            backgroundColor: (Highcharts.theme && Highcharts.theme.legendBackgroundColor) || "#FFFFFF",
        },
        plotOptions: {
            scatter: {
                marker: {
                    radius: 5,
                    states: {
                        hover: {
                            enabled: true,
                            lineColor: "rgb(100,100,100)",
                        },
                    },
                },
                states: {
                    hover: {
                        marker: {
                            enabled: false,
                        },
                    },
                },
                tooltip: {
                    headerFormat: "<b>{series.name}</b><br>",
                    pointFormat: "{point.y}",
                },
            },
        },
        series,

    };
}
