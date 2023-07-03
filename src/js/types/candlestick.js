
CoreUI.chart.type.candlestick = {

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
            CoreUI.chart.utils.isObject(this._options.options) &&
            this._options.options.debug
        ) {
            console.log($.extend(true, {}, this._apexOptions));
        }

        this._apex = new CoreUI.chart.apex(container, this._apexOptions);
        this._apex.render();
    },


    /**
     * Преобразование настроек в формат apex
     */
    _buildApexOptions: function () {

        let that  = this;
        let style = {};

        this._apexOptions.chart.type            = 'candlestick';
        this._apexOptions.tooltip.intersect     = false;
        this._apexOptions.tooltip.shared        = false;
        this._apexOptions.xaxis.crosshairs.show = false;

        // Styles
        if (this._options.hasOwnProperty('options') &&
            CoreUI.chart.utils.isObject(this._options.options) &&
            this._options.options.hasOwnProperty('style') &&
            CoreUI.chart.utils.isObject(this._options.options.style)
        ) {
            style = this._options.options.style;

            if (style.hasOwnProperty('colorUpward') && typeof style.colorUpward === 'string') {
                this._apexOptions.plotOptions.candlestick.colors.upward = style.colorUpward;
            }
            if (style.hasOwnProperty('colorDownward') && typeof style.colorDownward === 'string') {
                this._apexOptions.plotOptions.candlestick.colors.downward = style.colorDownward;
            }
        }


        // Datasets
        if (this._options.hasOwnProperty('datasets') &&
            CoreUI.chart.utils.isArray(this._options.datasets)
        ) {

            let datasetNum = 0;

            $.each(this._options.datasets, function (key, dataset) {
                if ( ! CoreUI.chart.utils.isObject(dataset) ||
                    ! dataset.hasOwnProperty('type') ||
                    ! dataset.hasOwnProperty('name') ||
                    typeof dataset.type !== 'string' ||
                    typeof dataset.name !== 'string'
                ) {
                    return;
                }


                if (['candlestick'].indexOf(dataset.type) >= 0) {
                    let color       = null;
                    let data        = [];
                    let showLabel   = false;
                    let labelColor  = '#333';
                    let width       = 1;
                    let dash        = 0;
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

                    if (style.hasOwnProperty('labels') && style.labels === true) {
                        showLabel = true;
                    }

                    if (style.hasOwnProperty('fill') && typeof style.fill === 'number') {
                        if (style.fill < 1) {
                            style.fill = 1;
                        } else if (style.fill > 100) {
                            style.fill = 100;
                        }

                        fillOpacity = style.fill / 100
                    }

                    // Dataset style
                    if (dataset.hasOwnProperty('style') && CoreUI.chart.utils.isObject(dataset.style)) {
                        if (dataset.style.hasOwnProperty('color') && typeof dataset.style.color === 'string') {
                            color = dataset.style.color;
                        }

                        if (dataset.style.hasOwnProperty('labels') && typeof dataset.style.labels === 'boolean') {
                            showLabel = dataset.style.labels;
                        }

                        if (dataset.style.hasOwnProperty('labelColor') && typeof dataset.style.labelColor === 'string') {
                            labelColor = dataset.style.labelColor;
                        }

                        if (dataset.style.hasOwnProperty('fill') && typeof dataset.style.fill === 'number') {
                            if (dataset.style.fill < 1) {
                                dataset.style.fill = 1;
                            } else if (dataset.style.fill > 100) {
                                dataset.style.fill = 100;
                            }

                            fillOpacity = dataset.style.fill / 100;
                        }

                        if (dataset.style.hasOwnProperty('width') && typeof dataset.style.width === 'number') {
                            if (dataset.style.width < 0) {
                                dataset.style.width = 0;

                            } else if (dataset.style.width > 10) {
                                dataset.style.width = 10;
                            }

                            width = dataset.style.width;
                        }
                    }

                    let labelNumber = 0;
                    $.each(dataset.data, function (key, item) {
                        if (CoreUI.chart.utils.isObject(item) && item.hasOwnProperty('y')) {
                            let itemLabel = '';

                            if (item.hasOwnProperty('x')) {
                                itemLabel = item.x;

                            } else if (that._options.hasOwnProperty('labels') &&
                                CoreUI.chart.utils.isArray(that._options.labels) &&
                                that._options.labels.hasOwnProperty(labelNumber)
                            ) {
                                itemLabel = that._options.labels[labelNumber];

                            } else {
                                itemLabel = labelNumber + 1;
                            }

                            data.push({
                                x: itemLabel,
                                y: item.y,
                            });

                            labelNumber++;

                        } else if (Array.isArray(item)) {
                            // let itemLabel = '';
                            //
                            // if (that._options.hasOwnProperty('labels') &&
                            //     CoreUI.chart.utils.isArray(that._options.labels) &&
                            //     that._options.labels.hasOwnProperty(labelNumber)
                            // ) {
                            //     itemLabel = that._options.labels[labelNumber];
                            //
                            // } else {
                            //     itemLabel = labelNumber + 1;
                            // }
                            //
                            // data.push({
                            //     x: itemLabel,
                            //     y: item
                            // });
                            data.push(item);
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

                    that._apexOptions.stroke.width.push(width);
                    that._apexOptions.stroke.dashArray.push(dash);

                    that._apexOptions.colors.push((color ? color : '#66a61e'));
                    that._apexOptions.series.push({
                        type: dataset.type,
                        name: dataset.name,
                        data: data
                    });

                    datasetNum++;
                }
            });
        }
    }
}