/*
 * Copyright (c) 2021.
 *
 * @category TYPO3
 *
 * @copyright  2020 Dirk Persky (https://github.com/DirkPersky)
 * @author     Dirk Persky <dirk.persky@gmail.com>
 * @license    AGPL v3
 */

(() => {
    "use strict";
    var t = {
        d: (e, a) => {
            for (var n in a) t.o(a, n) && !t.o(e, n) && Object.defineProperty(e, n, {enumerable: !0, get: a[n]})
        }, o: (t, e) => Object.prototype.hasOwnProperty.call(t, e)
    }, e = {};
    t.d(e, {default: () => a});
    const a = {
        chartsData: null, chartsContainer: null, init: function () {
            if ("object" == typeof window["Hoogi91.chartsData"] && (this.chartsData = window["Hoogi91.chartsData"]), this.chartsContainer = document.querySelectorAll(".chart-container > .chart"), this.chartsContainer.length > 0 && null !== this.chartsData && Object.keys(this.chartsData).length > 0) for (var t = 0; t < this.chartsContainer.length; ++t) {
                var e = this.chartsContainer[t], a = e.getAttribute("data-chart-type") || "",
                    n = e.getAttribute("data-chart-data") || "";
                if (!(a.length <= 0 || n.length <= 0)) {
                    var r = this.getChartData(n);
                    if (!(r.length <= 0)) {
                        var i = r.labels || [], o = r.datasets || [];
                        if (i.length > 0 && o.length > 0) switch (a) {
                            case"chart_bar":
                                this.createBarChart(e, i, o);
                                break;
                            case"chart_line":
                                this.createLineChart(e, i, o);
                                break;
                            case"chart_pie":
                                this.createPieChart(e, i, o);
                                break;
                            case"chart_doughnut":
                                this.createDoughnutChart(e, i, o)
                        }
                    }
                }
            }
        }, getChartData: function (t) {
            return void 0 === this.chartsData[t] ? {} : this.chartsData[t]
        }, createBarChart: function (t, e, a) {
            var n = this, r = n.getChartOptions(t);
            return new Chart(t.getContext("2d"), {
                type: "bar",
                data: {
                    labels: e, datasets: n.createDatasets(a, (function (t, e) {
                        return {
                            label: t.label,
                            data: t.data,
                            backgroundColor: 1 === a.length ? t.background || [] : t.background[e] || [],
                            borderColor: 1 === a.length ? t.border || [] : t.border[e] || [],
                            borderWidth: 1
                        }
                    }))
                },
                options: {
                    plugins: {
                        legend: {
                            display: "1" === n.getKeyOfObject(r, "legend.active", 0),
                            position: n.getKeyOfObject(r, "legend.position", "top")
                        }
                    },
                    responsive: true,
                    maintainAspectRatio: false,
                    indexAxis: "1" === n.getKeyOfObject(r, "bar.horizontal", 0) ? "y" : "x",
                    scales: {
                        x: {
                            stacked: "1" === n.getKeyOfObject(r, "bar.stacked", 0),
                            ticks: n.getTicksConfig(r, "x"),
                            title: n.getAxisLabelConfig(r, "x")
                        },
                        y: {
                            stacked: "1" === n.getKeyOfObject(r, "bar.stacked", 0),
                            ticks: n.getTicksConfig(r, "y"),
                            title: n.getAxisLabelConfig(r, "y")
                        }
                    }
                }
            })
        }, createLineChart: function (t, e, a) {
            var n = this, r = n.getChartOptions(t), i = n.getKeyOfObject(r, "line.stepped", !1);
            "after" !== i && (i = "1" === i);
            var o = .4;
            return "1" !== n.getKeyOfObject(r, "line.interpolation", 0) && (o = 0), new Chart(t.getContext("2d"), {
                type: "line",
                data: {
                    labels: e, datasets: n.createDatasets(a, (function (t, e) {
                        return {
                            label: t.label,
                            data: t.data,
                            fill: "1" === n.getKeyOfObject(r, "line.fill", 0),
                            backgroundColor: 1 === a.length ? t.border || t.background || [] : t.border[e] || t.background[e] || [],
                            borderColor: 1 === a.length ? t.background || [] : t.background[e] || []
                        }
                    }))
                },
                options: {
                    plugins: {
                        legend: {
                            display: "1" === n.getKeyOfObject(r, "legend.active", 0),
                            position: n.getKeyOfObject(r, "legend.position", "top")
                        }
                    },
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: {
                        x: {ticks: n.getTicksConfig(r, "x"), title: n.getAxisLabelConfig(r, "x")},
                        y: {
                            stacked: "1" === n.getKeyOfObject(r, "line.stacked", 0),
                            ticks: n.getTicksConfig(r, "y"),
                            title: n.getAxisLabelConfig(r, "y")
                        }
                    },
                    elements: {line: {stepped: i, tension: o}}
                }
            })
        }, createPieChart: function (t, e, a) {
            var n = this, r = n.getChartOptions(t);
            return new Chart(t.getContext("2d"), {
                type: "pie",
                data: {
                    labels: e, datasets: n.createDatasets(a, (function (t) {
                        return {
                            label: t.label,
                            data: t.data,
                            backgroundColor: "object" == typeof t.background ? t.background : [],
                            borderWidth: 1
                        }
                    }))
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            display: "1" === n.getKeyOfObject(r, "legend.active", 0),
                            position: n.getKeyOfObject(r, "legend.position", "top")
                        }
                    }
                }
            })
        }, createDoughnutChart: function (t, e, a) {
            var n = this, r = n.getChartOptions(t),
                i = parseInt(n.getKeyOfObject(r, "doughnut.cutoutPercentage", 75), 10);
            return i = i <= 0 ? 75 : i, new Chart(t.getContext("2d"), {
                type: "doughnut",
                data: {
                    labels: e, datasets: n.createDatasets(a, (function (t) {
                        return {
                            label: t.label,
                            data: t.data,
                            backgroundColor: "object" == typeof t.background ? t.background : [],
                            borderWidth: 1
                        }
                    }))
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    cutout: i + "%",
                    plugins: {
                        legend: {
                            display: "1" === n.getKeyOfObject(r, "legend.active", 0),
                            position: n.getKeyOfObject(r, "legend.position", "top")
                        }
                    }
                }
            })
        }, createDatasets: function (t, e) {
            var a = e || null, n = [];
            if ("function" != typeof a) return n;
            if ("object" == typeof t && t.length > 0) for (var r = 0; r < t.length; ++r) {
                var i = a(t[r], r);
                n.push(i)
            }
            return n
        }, getKeyOfObject: function (t, e, a) {
            var n = e.split(".").reduce((function (t, e) {
                return null == t ? t : t[e]
            }), t);
            return void 0 !== n ? n : a
        }, getAxisLabelConfig: function (t, e) {
            var a = this.getKeyOfObject(t, "axis." + e + ".label", "");
            return a.length > 0 ? {display: !0, text: a} : {}
        }, getTicksConfig: function (t, e) {
            if (!0 === ("1" === this.getKeyOfObject(t, "axis." + e + ".auto", 0))) {
                var a = this.getKeyOfObject(t, "axis." + e + ".step", null);
                return null !== a && a > 0 ? {stepSize: parseInt(a, 10)} : {}
            }
            var n = {}, r = this.getKeyOfObject(t, "axis." + e + ".min", null);
            null !== r && (n.min = parseInt(r, 10));
            var i = this.getKeyOfObject(t, "axis." + e + ".max", null);
            null !== i && i > r && (n.max = parseInt(i, 10));
            var o = this.getKeyOfObject(t, "axis." + e + ".step", null);
            return null !== o && o > 0 && (n.stepSize = parseInt(o, 10)), n
        }, getChartOptions: function (t) {
            var e = {};
            try {
                e = JSON.parse(t.getAttribute("data-chart-config")) || {}
            } catch (t) {
            }
            return Object.keys(e).length <= 0 ? {} : e
        }
    };
    window["Hoogi91.Charts"] = e.default
})();

window.StateManager.attach('tx-charts', function () {
    // draw charts
    window['Hoogi91.Charts'].init();
});

