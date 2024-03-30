import coreuiChart      from '../coreui.chart';
import coreuiChartUtils from '../coreui.chart.utils';
import apexCharts       from '../../../node_modules/apexcharts/dist/apexcharts.esm';

coreuiChart.type.radar = {

    _options: {},
    _apexOptions: {},
    _apex: null,
    _colors: [],
    _datasets: [],


    /**
     * Инициализация
     * @param {object} options
     * @param {object} apexOptions
     * @param {object} colors
     */
    init: function (options, apexOptions, colors) {

        this._options     = $.extend(true, {}, options);
        this._apexOptions = $.extend(true, {}, apexOptions);
        this._colors      = $.extend(true, {}, colors);
    },


    /**
     * @param container
     */
    render: function (container) {

        this._buildApexOptions();

        if (this._options.hasOwnProperty('options') &&
            coreuiChartUtils.isObject(this._options.options) &&
            this._options.options.debug
        ) {
            console.log($.extend(true, {}, this._apexOptions));
        }

        this._apex = new apexCharts(container, this._apexOptions);
        this._apex.render();
    },


    /**
     * Преобразование настроек в формат apex
     */
    _buildApexOptions: function () {

        let that  = this;
        let style = { };

        this._apexOptions.chart.type            = 'radar';
        this._apexOptions.tooltip.intersect     = true;
        this._apexOptions.tooltip.shared        = false;
        this._apexOptions.grid.show             = false;
        this._apexOptions.xaxis.crosshairs.show = false;


        // Styles
        if (this._options.hasOwnProperty('options') &&
            coreuiChartUtils.isObject(this._options.options) &&
            this._options.options.hasOwnProperty('style') &&
            coreuiChartUtils.isObject(this._options.options.style)
        ) {
            style = this._options.options.style;
        }


        // Datasets
        if (this._options.hasOwnProperty('datasets') &&
            coreuiChartUtils.isArray(this._options.datasets)
        ) {
            let datasetNum = 0;

            $.each(this._options.datasets, function (key, dataset) {
                if ( ! coreuiChartUtils.isObject(dataset) ||
                     ! dataset.hasOwnProperty('type') ||
                     typeof dataset.type !== 'string' ||
                     ! dataset.hasOwnProperty('name') ||
                     typeof dataset.name !== 'string'
                ) {
                    return;
                }


                if (['radar'].indexOf(dataset.type) >= 0) {
                    let color       = null;
                    let markerSize  = 4;
                    let dash        = 0;
                    let labelColor  = '#333';
                    let showLabel   = false;
                    let fillOpacity = 0.4;

                    if (that._colors.hasOwnProperty(datasetNum)) {
                        color = that._colors[datasetNum];
                    }

                    if (style.hasOwnProperty('markerSize') && typeof style.markerSize === 'number') {
                        if (style.markerSize < 0) {
                            style.markerSize = 0;

                        } else if (style.markerSize > 10) {
                            style.markerSize = 10;
                        }

                        markerSize = style.markerSize;
                    }

                    if (style.hasOwnProperty('fill') && typeof style.fill === 'number') {
                        if (style.fill < 1) {
                            style.fill = 1;
                        } else if (style.fill > 100) {
                            style.fill = 100;
                        }

                        fillOpacity = style.fill / 100
                    }

                    if (style.hasOwnProperty('dash') && typeof style.dash === 'number') {
                        if (style.dash < 0) {
                            style.dash = 0;

                        } else if (style.dash > 100) {
                            style.dash = 100;
                        }

                        dash = style.dash;
                    }

                    // Dataset style
                    if (dataset.hasOwnProperty('style') && coreuiChartUtils.isObject(dataset.style)) {
                        if (dataset.style.hasOwnProperty('color') && typeof dataset.style.color === 'string') {
                            color = dataset.style.color;
                        }

                        if (dataset.style.hasOwnProperty('labelColor') && typeof dataset.style.labelColor === 'string') {
                            labelColor = dataset.style.labelColor;
                        }

                        if (dataset.style.hasOwnProperty('labels') && dataset.style.labels === true) {
                            showLabel = true;
                        }

                        if (dataset.style.hasOwnProperty('markerSize') && typeof dataset.style.markerSize === 'number') {
                            if (dataset.style.markerSize < 0) {
                                dataset.style.markerSize = 0;

                            } else if (dataset.style.markerSize > 10) {
                                dataset.style.markerSize = 10;
                            }

                            markerSize = dataset.style.markerSize;
                        }

                        if (dataset.style.hasOwnProperty('dash') && typeof dataset.style.dash === 'number') {
                            if (dataset.style.dash < 0) {
                                dataset.style.dash = 0;

                            } else if (dataset.style.dash > 100) {
                                dataset.style.dash = 100;
                            }

                            dash = dataset.style.dash;
                        }

                        if (dataset.style.hasOwnProperty('fill') && typeof dataset.style.fill === 'number') {
                            if (dataset.style.fill < 1) {
                                dataset.style.fill = 1;
                            } else if (dataset.style.fill > 100) {
                                dataset.style.fill = 100;
                            }

                            fillOpacity = dataset.style.fill / 100;
                        }
                    }

                    if (showLabel && that._apexOptions.dataLabels.hasOwnProperty('enabled')) {
                        that._apexOptions.dataLabels.enabledOnSeries.push(datasetNum);
                        that._apexOptions.dataLabels.enabled = true;
                    }


                    that._apexOptions.dataLabels.style.colors.push(labelColor);
                    that._apexOptions.fill.opacity.push(fillOpacity);

                    that._apexOptions.stroke.dashArray.push(dash);

                    that._apexOptions.markers.size.push(markerSize);
                    that._apexOptions.colors.push(color ? color : '#66a61e');
                    that._apexOptions.series.push({
                        name: dataset.name,
                        data: dataset.data
                    });

                    datasetNum++;
                }
            });
        }



        if ( ! this._apexOptions.dataLabels.hasOwnProperty('enabled') ||
             ! this._apexOptions.dataLabels.enabled
        ) {
            this._apexOptions.dataLabels.enabledOnSeries = undefined;
        }
    },


    /**
     * Получение наборов данных
     * @return {object}
     */
    getDatasets: function () {

        let datasets = {};


        return this.datasets;
    },


    /**
     * Получение все аннотаций
     * @return {object}
     */
    getAnnotations: function () {

        let annotations = {};


        return annotations;
    }
}