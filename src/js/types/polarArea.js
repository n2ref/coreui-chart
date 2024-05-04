import coreuiChart      from '../coreui.chart';
import coreuiChartUtils from '../coreui.chart.utils';
import apexCharts       from 'apexcharts/dist/apexcharts.esm';

coreuiChart.type.polarArea = {

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

        let that = this;

        this._apexOptions.chart.type   = 'polarArea';
        this._apexOptions.colors       = Object.values(this._colors);
        this._apexOptions.fill.opacity = 0.7;

        // Styles
        if (this._options.hasOwnProperty('options') &&
            coreuiChartUtils.isObject(this._options.options) &&
            this._options.options.hasOwnProperty('style') &&
            coreuiChartUtils.isObject(this._options.options.style)
        ) {
            let style = this._options.options.style;

            if (style.hasOwnProperty('fill') && typeof style.fill === 'number') {
                if (style.fill < 1) {
                    style.fill = 1;
                } else if (style.fill > 100) {
                    style.fill = 100;
                }

                this._apexOptions.fill.opacity = style.fill / 100
            }


            if (style.hasOwnProperty('labels') && style.labels === true) {
                this._apexOptions.dataLabels.enabled = true;
            }

            if (style.hasOwnProperty('labelColor') && typeof style.labelColor === 'string') {
                this._apexOptions.dataLabels.style.colors.push(style.labelColor);
            }
        }




        // Datasets
        if (this._options.hasOwnProperty('datasets') &&
            coreuiChartUtils.isArray(this._options.datasets)
        ) {
            $.each(this._options.datasets, function (key, dataset) {
                if ( ! coreuiChartUtils.isObject(dataset) ||
                     ! dataset.hasOwnProperty('type') ||
                     typeof dataset.type !== 'string'
                ) {
                    return;
                }


                if (['polarArea'].indexOf(dataset.type) >= 0) {
                    that._apexOptions.chart.type = dataset.type;
                    that._apexOptions.series     = dataset.data;

                    return false;
                }
            });
        }
    }
}