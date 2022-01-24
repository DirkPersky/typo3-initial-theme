/*
 * Copyright (c) 2021.
 *
 * @category TYPO3
 *
 * @copyright  2020 Dirk Persky (https://github.com/DirkPersky)
 * @author     Dirk Persky <dirk.persky@gmail.com>
 * @license    AGPL v3
 */

/*
 * Copyright (c) 2021.
 *
 * @category TYPO3
 *
 * @copyright  2020 Dirk Persky (https://github.com/DirkPersky)
 * @author     Dirk Persky <dirk.persky@gmail.com>
 * @license    AGPL v3
 */

(function (Hoogi91) {
    // stop from running again, if accidently included more than once.
    if (typeof Hoogi91.hasInitialised != 'undefined') return
    /**
     * define helper functions
     */
    var util = {
        /**
         * get chart data by key
         *
         * @param key
         * @returns object
         */
        getChartData: function (key) {
            if (typeof Hoogi91.chartsData[key] === 'undefined') {
                return false;
            }
            return Hoogi91.chartsData[key];
        },

        /**
         * push chart data by key
         *
         * @param key
         * @param values
         * @returns boolean
         */
        addChartData: function (key, values) {
            if (typeof Hoogi91.chartsData[key] === 'undefined') {
                Hoogi91.chartsData[key] = values;
                return true;
            }
            return true;
        },

        /**
         * create datasets by given data and an additional mapping callback
         *
         * @param datasets
         * @param mapping
         * @returns array
         */
        createDatasets: function (datasets, mapping) {
            var keyValueMapping = mapping || null,
                processedDatasets = [];

            if (typeof keyValueMapping !== 'function') {
                return processedDatasets;
            }

            if (typeof datasets === 'object' && datasets.length > 0) {
                for (var i = 0; i < datasets.length; ++i) {
                    var set = keyValueMapping(datasets[i]);
                    processedDatasets.push(set);
                }
            }
            return processedDatasets;
        },

        getKeyOfObject: function (object, key, defaultValue) {
            var returnVal = key.split(".").reduce(function (o, x) {
                return (typeof o === 'undefined' || o === null) ? o : o[x];
            }, object);

            return typeof returnVal !== 'undefined' ? returnVal : defaultValue;
        },

        getAxisLabelConfig: function (config, axis) {
            var axisLabel = util.getKeyOfObject(config, 'axis.' + axis + '.label', '');
            if (axisLabel.length > 0) {
                return {
                    display: true,
                    labelString: axisLabel,
                };
            }
            return {};
        },

        getTicksConfig: function (config, axis) {
            var calculateAutomatic = util.getKeyOfObject(config, 'axis.' + axis + '.auto', 0) === '1';
            if (calculateAutomatic === true) {
                var stepSize = util.getKeyOfObject(config, 'axis.' + axis + '.step', null);
                return stepSize !== null && stepSize > 0 ? {stepSize: parseInt(stepSize, 10)} : {};
            }

            var ticksConf = {};
            var min = util.getKeyOfObject(config, 'axis.' + axis + '.min', null);
            if (min !== null) {
                ticksConf.min = parseInt(min, 10);
            }
            var max = util.getKeyOfObject(config, 'axis.' + axis + '.max', null);
            if (max !== null && max > min) {
                ticksConf.max = parseInt(max, 10);
            }
            var step = util.getKeyOfObject(config, 'axis.' + axis + '.step', null);
            if (step !== null && step > 0) {
                ticksConf.stepSize = parseInt(step, 10);
            }
            return ticksConf;
        },

        getChartOptions: function (element) {
            var chartConfig = {};
            try {
                chartConfig = JSON.parse(element.getAttribute('data-chart-config')) || {};
            } catch (e) {
            }

            if (Object.keys(chartConfig).length <= 0) {
                return {};
            }
            return chartConfig;
        }

    };
    // Charts Data
    Hoogi91.chartsData = Hoogi91.chartsData || {};
    // create Charts
    Hoogi91.Charts = (function(){
        let chartsContainer = null;

        return {
            /**
             * initialize all charts that can be found if available options are filled
             */
            init: function () {
                chartsContainer = document.querySelectorAll('.chart-container > .chart');
                if (chartsContainer.length > 0 ) {
                    for (var i = 0; i < chartsContainer.length; ++i) {
                        var element = chartsContainer[i];
                        var isLoaded = element.getAttribute('data-chart-created') || false ;
                        // is already set
                        if( isLoaded == '1') {
                            continue;
                        }

                        // check id, type and datakey of current chart element and break if something is not available
                        var type = element.getAttribute('data-chart-type') || '';
                        var dataKey = element.getAttribute('data-chart-data') || '';
                        if (type.length <= 0 || dataKey.length <= 0) {
                            continue;
                        }

                        var chartData = util.getChartData(dataKey);
                        // if not exist get form element
                        if(!chartData) {
                            chartData = JSON.parse(element.getAttribute('data-chart-dataset') ) || {};
                            // add to dataset
                            util.addChartData(dataKey, chartData);
                        }

                        if (chartData.length <= 0) {
                            continue;
                        }

                        // mark as Loaded
                        element.setAttribute('data-chart-created', 1);

                        var labels = chartData.labels || [];
                        var datasets = chartData.datasets || [];
                        if (labels.length > 0 && datasets.length > 0) {
                            switch (type) {
                                case 'chart_bar':
                                    this.createBarChart(element, labels, datasets);
                                    break;
                                case 'chart_line':
                                    this.createLineChart(element, labels, datasets);
                                    break;
                                case 'chart_pie':
                                    this.createPieChart(element, labels, datasets);
                                    break;
                                case 'chart_doughnut':
                                    this.createDoughnutChart(element, labels, datasets);
                                    break;
                            }
                        }
                    }
                }
            },

            /**
             * build bar chart on element with labels and datasets
             *
             * @param element
             * @param labels
             * @param datasets
             */
            createBarChart: function (element, labels, datasets) {
                var options = util.getChartOptions(element);
                return new Chart(element.getContext('2d'), {
                    type: util.getKeyOfObject(options, 'bar.horizontal', 0) === '1' ? 'horizontalBar' : 'bar',
                    data: {
                        labels: labels,
                        datasets: util.createDatasets(datasets, function (set) {
                            return {
                                label: set['label'],
                                data: set['data'],
                                backgroundColor: typeof set['background'] === 'object' ? set['background'] : [],
                                borderColor: typeof set['border'] === 'object' ? set['border'] : [],
                                borderWidth: 1
                            }
                        })
                    },
                    options: {
                        legend: {
                            display: util.getKeyOfObject(options, 'legend.active', 0) === '1',
                            position: util.getKeyOfObject(options, 'legend.position', 'top')
                        },
                        scales: {
                            xAxes: [{
                                stacked: util.getKeyOfObject(options, 'bar.stacked', 0) === '1',
                                ticks: util.getTicksConfig(options, 'x'),
                                scaleLabel: util.getAxisLabelConfig(options, 'x'),
                            }],
                            yAxes: [{
                                stacked: util.getKeyOfObject(options, 'bar.stacked', 0) === '1',
                                ticks: util.getTicksConfig(options, 'y'),
                                scaleLabel: util.getAxisLabelConfig(options, 'y'),
                            }]
                        }
                    }
                });
            },

            /**
             * build line chart on element with labels and datasets
             *
             * @param element
             * @param labels
             * @param datasets
             */
            createLineChart: function (element, labels, datasets) {
                var options = util.getChartOptions(element);
                var steppedValue = util.getKeyOfObject(options, 'line.stepped', false);
                if (steppedValue !== 'after') {
                    steppedValue = steppedValue === '1';
                }

                var tensionValue = 0.4;
                if (util.getKeyOfObject(options, 'line.interpolation', 0) !== '1') {
                    tensionValue = 0;
                }

                return new Chart(element.getContext('2d'), {
                    type: 'line',
                    data: {
                        labels: labels,
                        datasets: util.createDatasets(datasets, function (set) {
                            return {
                                label: set['label'],
                                data: set['data'],
                                backgroundColor: typeof set['border'] === 'object' ? set['border'][0] : '',
                                borderColor: typeof set['background'] === 'object' ? set['background'][0] : '',
                                fill: util.getKeyOfObject(options, 'line.fill', 0) === '1',
                            }
                        })
                    },
                    options: {
                        legend: {
                            display: util.getKeyOfObject(options, 'legend.active', 0) === '1',
                            position: util.getKeyOfObject(options, 'legend.position', 'top')
                        },
                        scales: {
                            xAxes: [{
                                ticks: util.getTicksConfig(options, 'x'),
                                scaleLabel: util.getAxisLabelConfig(options, 'x'),
                            }],
                            yAxes: [{
                                stacked: util.getKeyOfObject(options, 'line.stacked', 0) === '1',
                                ticks: util.getTicksConfig(options, 'y'),
                                scaleLabel: util.getAxisLabelConfig(options, 'y'),
                            }]
                        },
                        elements: {
                            line: {
                                stepped: steppedValue,
                                tension: tensionValue
                            }
                        }
                    }
                });
            },

            /**
             * build pie chart on element with labels and datasets
             *
             * @param element
             * @param labels
             * @param datasets
             */
            createPieChart: function (element, labels, datasets) {
                var options = util.getChartOptions(element);
                return new Chart(element.getContext('2d'), {
                    type: 'pie',
                    data: {
                        labels: labels,
                        datasets: util.createDatasets(datasets, function (set) {
                            return {
                                label: set['label'],
                                data: set['data'],
                                backgroundColor: typeof set['background'] === 'object' ? set['background'] : [],
                                borderWidth: 1
                            }
                        })
                    },
                    options: {
                        legend: {
                            display: util.getKeyOfObject(options, 'legend.active', 0) === '1',
                            position: util.getKeyOfObject(options, 'legend.position', 'top')
                        },
                    }
                });
            },

            /**
             * build doughnut chart on element with labels and datasets
             *
             * @param element
             * @param labels
             * @param datasets
             */
            createDoughnutChart: function (element, labels, datasets) {
                var options = util.getChartOptions(element);
                var cutoutValue = parseInt(util.getKeyOfObject(options, 'doughnut.cutoutPercentage', 75), 10);
                cutoutValue = cutoutValue <= 0 ? 75 : cutoutValue;

                return new Chart(element.getContext('2d'), {
                    type: 'doughnut',
                    data: {
                        labels: labels,
                        datasets: util.createDatasets(datasets, function (set) {
                            return {
                                label: set['label'],
                                data: set['data'],
                                backgroundColor: typeof set['background'] === 'object' ? set['background'] : [],
                                borderWidth: 1
                            }
                        })
                    },
                    options: {
                        legend: {
                            display: util.getKeyOfObject(options, 'legend.active', 0) === '1',
                            position: util.getKeyOfObject(options, 'legend.position', 'top')
                        },
                        cutoutPercentage: cutoutValue
                    }
                });
            },
        }
    })();
    // mark as inet
    Hoogi91.hasInitialised = true;
    // back to window
    window.Hoogi91 = Hoogi91
    // init consent
    window.addEventListener("load", function () {
        window.Hoogi91.Charts.init();
        window.Hoogi91.loaded = true;
    });
})(window.Hoogi91 || {});

window.StateManager.attach('tx-charts', function () {
    window.Hoogi91.Charts.init();
});

