import coreuiChart      from '../coreui.chart';
import coreuiChartUtils from '../coreui.chart.utils';
import apexCharts       from '../../../node_modules/apexcharts/dist/apexcharts.esm';

coreuiChart.type.rangeBar = {

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
        let style = {};

        this._apexOptions.chart.type                 = 'rangeBar';
        this._apexOptions.tooltip.intersect          = false;
        this._apexOptions.tooltip.shared             = false;
        this._apexOptions.plotOptions.bar.horizontal = false;

        // Styles
        if (this._options.hasOwnProperty('options') &&
            coreuiChartUtils.isObject(this._options.options) &&
            this._options.options.hasOwnProperty('style') &&
            coreuiChartUtils.isObject(this._options.options.style)
        ) {
            style = this._options.options.style;

            if (style.hasOwnProperty('horizontal') && style.horizontal === true) {
                this._apexOptions.plotOptions.bar.horizontal = true;
            }

            if (style.hasOwnProperty('borderRadius') && typeof style.borderRadius === 'number') {
                if (style.borderRadius < 0) {
                    style.borderRadius = 0;

                } else if (style.borderRadius > 10) {
                    style.borderRadius = 10;
                }

                this._apexOptions.plotOptions.bar.borderRadius = style.borderRadius;
            }

            if (style.hasOwnProperty('size') && typeof style.size === 'number') {
                if (style.size < 1) {
                    style.size = 1;
                } else if (style.size > 100) {
                    style.size = 100;
                }

                this._apexOptions.plotOptions.bar.barHeight   = style.size + '%';
                this._apexOptions.plotOptions.bar.columnWidth = style.size + '%';
            }
        }


        // Datasets
        if (this._options.hasOwnProperty('datasets') &&
            coreuiChartUtils.isArray(this._options.datasets)
        ) {

            let datasetNum = 0;

            $.each(this._options.datasets, function (key, dataset) {
                if ( ! coreuiChartUtils.isObject(dataset) ||
                    ! dataset.hasOwnProperty('type') ||
                    ! dataset.hasOwnProperty('name') ||
                    typeof dataset.type !== 'string' ||
                    typeof dataset.name !== 'string'
                ) {
                    return;
                }


                if (['bar'].indexOf(dataset.type) >= 0) {
                    let color       = null;
                    let data        = [];
                    let showLabel   = false;
                    let labelColor  = '#333';
                    let width       = 1;
                    let dash        = 0;
                    let fillType    = 'solid';
                    let fillOpacity = 0.4;


                    if (that._colors.hasOwnProperty(datasetNum)) {
                        color = that._colors[datasetNum];
                    }

                    if (style.hasOwnProperty('width') && typeof style.width === 'number') {
                        if (style.width < 0) {
                            style.width = 0;

                        } else if (style.width > 10) {
                            style.width = 10;
                        }

                        width = style.width;
                    }

                    if (style.hasOwnProperty('dash') && typeof style.dash === 'number') {
                        if (style.dash < 0) {
                            style.dash = 0;

                        } else if (style.dash > 100) {
                            style.dash = 100;
                        }

                        dash = style.dash;
                    }

                    if (style.hasOwnProperty('gradient') && style.gradient === true) {
                        fillType = 'gradient';
                    }

                    if (style.hasOwnProperty('fill') && typeof style.fill === 'number') {
                        if (style.fill < 0) {
                            style.fill = 0;
                        } else if (style.fill > 100) {
                            style.fill = 100;
                        }

                        fillOpacity = style.fill / 100
                    }

                    if (style.hasOwnProperty('labels') && style.labels === true) {
                        showLabel = true;
                    }

                    // Dataset style
                    if (dataset.hasOwnProperty('style') && coreuiChartUtils.isObject(dataset.style)) {
                        if (dataset.style.hasOwnProperty('color') && typeof dataset.style.color === 'string') {
                            color = dataset.style.color;
                        }

                        if (dataset.style.hasOwnProperty('labels') && typeof dataset.style.labels === 'boolean') {
                            showLabel = dataset.style.labels;
                        }

                        if (dataset.style.hasOwnProperty('labelColor') && typeof dataset.style.labelColor === 'string') {
                            labelColor = dataset.style.labelColor;
                        }

                        if (dataset.style.hasOwnProperty('dash') && typeof dataset.style.dash === 'number') {
                            if (dataset.style.dash < 0) {
                                dataset.style.dash = 0;

                            } else if (dataset.style.dash > 100) {
                                dataset.style.dash = 100;
                            }

                            dash = dataset.style.dash;
                        }

                        if (dataset.style.hasOwnProperty('width') && typeof dataset.style.width === 'number') {
                            if (dataset.style.width < 0) {
                                dataset.style.width = 0;

                            } else if (dataset.style.width > 10) {
                                dataset.style.width = 10;
                            }

                            width = dataset.style.width;
                        }

                        if (dataset.style.hasOwnProperty('fill') && typeof dataset.style.fill === 'number') {
                            if (dataset.style.fill < 1) {
                                dataset.style.fill = 1;
                            } else if (dataset.style.fill > 100) {
                                dataset.style.fill = 100;
                            }

                            fillOpacity = dataset.style.fill / 100;
                        }

                        if (dataset.style.hasOwnProperty('gradient')) {
                            fillType = dataset.style.gradient === true ? 'gradient' : 'solid';
                        }
                    }

                    let labelNumber = 0;
                    $.each(dataset.data, function (key, item) {
                        if (coreuiChartUtils.isArray(item)) {
                            let itemLabel = labelNumber + 1;

                            if (that._options.hasOwnProperty('labels') &&
                                coreuiChartUtils.isArray(that._options.labels) &&
                                that._options.labels.hasOwnProperty(labelNumber)
                            ) {
                                itemLabel = that._options.labels[labelNumber];
                            }

                            data.push({
                                x: itemLabel,
                                y: item,
                            });

                            labelNumber++;
                        }
                    });

                    if (showLabel) {
                        that._apexOptions.dataLabels.enabledOnSeries.push(datasetNum);
                        that._apexOptions.dataLabels.enabled = true;
                    }

                    that._apexOptions.dataLabels.style.colors.push(labelColor);
                    that._apexOptions.fill.gradient.opacityFrom.push(fillOpacity);
                    that._apexOptions.fill.opacity.push(fillOpacity);

                    that._apexOptions.fill.type.push(fillType);
                    that._apexOptions.stroke.width.push(width);
                    that._apexOptions.stroke.dashArray.push(dash);

                    that._apexOptions.colors.push((color ? color : '#66a61e'));
                    that._apexOptions.series.push({
                        name: dataset.name,
                        data: data
                    });

                    datasetNum++;
                }
            });


            // Исправление потенциальной ошибки связанной с маркерами
            // где должны быть положительно заданы либо все маркеры, либо никто
            let issetMarkers = false;
            $.each(this._apexOptions.markers.size, function (key, markerSize) {
                if (markerSize > 0) {
                    issetMarkers = true;
                }
            });

            if (issetMarkers) {
                $.each(this._apexOptions.markers.size, function (key, markerSize) {
                    if (markerSize === 0) {
                        that._apexOptions.markers.size[key] = 0.1;
                    }
                });
            }
        }
    }
}