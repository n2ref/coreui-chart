
CoreUI.chart.type.pie = {

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

        let that        = this;
        let type        = 'pie';
        let style       = {};
        let fillType    = 'solid';
        let fillOpacity = 0.9;
        let labelColor = '#fff';

        this._apexOptions.colors     = Object.values(this._colors);
        this._apexOptions.chart.type = 'pie';

        // Styles
        if (this._options.hasOwnProperty('options') &&
            CoreUI.chart.utils.isObject(this._options.options) &&
            this._options.options.hasOwnProperty('style') &&
            CoreUI.chart.utils.isObject(this._options.options.style)
        ) {
            style = this._options.options.style;
        }


        // Datasets
        if (this._options.hasOwnProperty('datasets') && CoreUI.chart.utils.isArray(this._options.datasets)) {
            $.each(this._options.datasets, function (key, dataset) {
                if ( ! CoreUI.chart.utils.isObject(dataset) ||
                     ! dataset.hasOwnProperty('type') ||
                     typeof dataset.type !== 'string'
                ) {
                    return;
                }


                if (['pie', 'donut', 'radialBar'].indexOf(dataset.type) >= 0) {
                    type = dataset.type;

                    that._apexOptions.chart.type = dataset.type;
                    that._apexOptions.series     = dataset.data;

                    return false;
                }
            });
        }



        if (style.hasOwnProperty('startAngle') && typeof style.startAngle === 'number') {
            if (style.startAngle < -360) {
                style.startAngle = -360;

            } else if (style.startAngle > 360) {
                style.startAngle = 360;
            }

            this._apexOptions.plotOptions.pie.startAngle       = style.startAngle;
            this._apexOptions.plotOptions.radialBar.startAngle = style.startAngle;
        }

        if (style.hasOwnProperty('endAngle') && typeof style.endAngle === 'number') {
            if (style.endAngle < -360) {
                style.endAngle = -360;

            } else if (style.endAngle > 360) {
                style.endAngle = 360;
            }

            this._apexOptions.plotOptions.pie.endAngle       = style.endAngle;
            this._apexOptions.plotOptions.radialBar.endAngle = style.endAngle;
        }

        if (style.hasOwnProperty('size') && typeof style.size === 'number') {
            if (style.size < 1) {
                style.size = 0;

            } else if (style.size > 100) {
                style.size = 100;
            }

            this._apexOptions.plotOptions.pie.donut.size = style.size + '%';
        }

        if (style.hasOwnProperty('labelColor') && typeof style.labelColor === 'string') {
            labelColor = style.labelColor;
        }

        if (style.hasOwnProperty('gradient') && style.gradient === true) {
            fillType = 'gradient';
        }

        if (style.hasOwnProperty('labels') && style.labels === true) {
            this._apexOptions.dataLabels.enabled = true;
        }

        if (style.hasOwnProperty('fill') && typeof style.fill === 'number') {
            if (style.fill < 1) {
                style.fill = 1;
            } else if (style.fill > 100) {
                style.fill = 100;
            }

            fillOpacity = style.fill / 100
        }

        // Total
        if (style.hasOwnProperty('total') &&
            typeof style.total === 'object' &&
            style.total.hasOwnProperty('label') &&
            typeof style.total.label === 'string' &&
            style.total.label !== ''
        ) {
            if (type === 'donut') {

                this._apexOptions.plotOptions.pie.donut.labels.show             = true;
                this._apexOptions.plotOptions.pie.donut.labels.value.show       = true;
                this._apexOptions.plotOptions.pie.donut.labels.total.show       = true;
                this._apexOptions.plotOptions.pie.donut.labels.total.showAlways = true;
                this._apexOptions.plotOptions.pie.donut.labels.total.label      = style.total.label;

                if (style.total.hasOwnProperty('color') && typeof style.total.color === 'string') {
                    this._apexOptions.plotOptions.pie.donut.labels.total.color = style.total.color;
                    this._apexOptions.plotOptions.pie.donut.labels.value.color = style.total.color;
                }

                if (style.total.hasOwnProperty('formatter')) {
                    if (typeof style.total.formatter === 'function') {
                        this._apexOptions.plotOptions.pie.donut.labels.total.formatter = function (w) {
                            return style.total.formatter(w.globals.seriesTotals);
                        };

                    } else if (typeof style.total.formatter === 'string') {
                        let func = CoreUI.chart.utils.getFunctionByName(style.total.formatter);

                        if (typeof func === 'function') {
                            this._apexOptions.plotOptions.pie.donut.labels.total.formatter = function (w) {
                                return func(w.globals.seriesTotals);
                            };
                        }
                    }
                }

            } else if (type === 'radialBar') {
                this._apexOptions.plotOptions.radialBar.dataLabels.show        = true;
                this._apexOptions.plotOptions.radialBar.dataLabels.value.show  = true;
                this._apexOptions.plotOptions.radialBar.dataLabels.total.show  = true;
                this._apexOptions.plotOptions.radialBar.dataLabels.total.label = style.total.label;

                if (style.total.hasOwnProperty('color') && typeof style.total.color === 'string') {
                    this._apexOptions.plotOptions.radialBar.dataLabels.total.color = style.total.color;
                    this._apexOptions.plotOptions.radialBar.dataLabels.value.color = style.total.color;
                }

                if (style.total.hasOwnProperty('formatter')) {
                    if (typeof style.total.formatter === 'function') {
                        this._apexOptions.plotOptions.radialBar.dataLabels.total.formatter = function (w) {
                            return style.total.formatter(w.globals.seriesTotals);
                        };

                    } else if (typeof style.total.formatter === 'string') {
                        let func = CoreUI.chart.utils.getFunctionByName(style.total.formatter);

                        if (typeof func === 'function') {
                            this._apexOptions.plotOptions.radialBar.dataLabels.total.formatter = function (w) {
                                return func(w.globals.seriesTotals);
                            };
                        }
                    }
                }
            }
        }

        this._apexOptions.fill.type                 = fillType;
        this._apexOptions.fill.gradient.opacityFrom = fillOpacity;
        this._apexOptions.fill.gradient.opacityTo   = 1;
        this._apexOptions.fill.opacity              = fillOpacity;

        this._apexOptions.dataLabels.style.colors = [labelColor];
    }
}