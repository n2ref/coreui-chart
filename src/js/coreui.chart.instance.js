
CoreUI.chart.instance = {

    _options: {
        id: null,
        labels: [],
        datasets: [],
        annotations: [],
        options: {
            lang: 'en',
            dataUrl: null,
            width: null,
            height: null,
            title: {},
            enabled: {},
            legend: {},
            tooltip: {},
            theme: {},
            axis: {},
            style: {},
            events: {},
        }
    },

    _container: null,
    _apex: null,
    _typeInstance: null,
    _events: {},


    /**
     * Инициализация
     * @param {object} options
     * @private
     */
    _init: function (options) {

        this._options.options.lang = CoreUI.chart.getSetting('lang');

        this._options = $.extend(true, {}, this._options, options);

        if ( ! this._options.id) {
            this._options.id = CoreUI.chart.utils.hashCode();
        }

        this._options.datasets = typeof this._options.datasets === 'object' && Array.isArray(this._options.datasets)
            ? this._options.datasets
            : [];
        this._options.labels = typeof this._options.labels === 'object' && Array.isArray(this._options.labels)
            ? this._options.labels
            : [];
        this._options.annotations = typeof this._options.annotations === 'object' && Array.isArray(this._options.annotations)
            ? this._options.annotations
            : [];
    },


    /**
     * Формирование html компонента
     * @param element
     * @return {string|*|string|Promise<void>}
     */
    render: function(element) {

        let container =
            '<div id="coreui-chart-' + this._options.id + '" class="coreui-chart">' +
                '<div class="coreui-chart-container"></div>' +
            '</div>';

        if (element === undefined) {
            return container;
        }

        if (typeof element === 'string') {
            let domElement = document.getElementById(element);

            if ( ! domElement) {
                return;
            }

            this._container = domElement;

        } else if (element instanceof HTMLElement) {
            this._container = element;
        }

        if (this._container) {
            $(this._container).append(container);
            this._container = document.querySelector('#coreui-chart-' + this._options.id + ' > .coreui-chart-container');
        }

        this.initEvents();
    },


    /**
     * Инициализация событий компонента
     */
    initEvents: function () {

        if ( ! this._container) {
            this._container = document.querySelector('#coreui-chart-' + this._options.id + ' > .coreui-chart-container');
        }

        if (this._container) {
            let type = this._getTypeChart();

            if ( ! CoreUI.chart.type.hasOwnProperty(type)) {
                console.error('Chart type not found: ' + type);
                return;
            }

            let apexOptions = {};

            if (this._options.hasOwnProperty('custom') && CoreUI.chart.utils.isObject(custom)) {
                apexOptions = this._options.custom;
            } else {
                apexOptions = this._convertToApex(this._options);
            }


            this._typeInstance = $.extend(true, {}, CoreUI.chart.type[type]);
            this._typeInstance.init(this._options, apexOptions, this._getColors());

            this._apex = this._typeInstance.render(this._container);


            if (this._options.options.hasOwnProperty('dataUrl') &&
                typeof this._options.options.dataUrl === 'string' &&
                this._options.options.dataUrl
            ) {
                this.loadData(this._options.options.dataUrl);
            }

            this._trigger('shown.coreui.chart');
        }
    },


    /**
     * Получение id графика
     * @return {string|null}
     */
    getId: function () {

        return this._options.id;
    },


    /**
     * Получение параметров
     * @returns {object}
     */
    getOptions: function () {

        return $.extend(true, {}, this._options);
    },


    /**
     * Блокировка
     * @param {string} text
     */
    lock: function (text) {

        let container = document.querySelector('#coreui-chart-' + this._options.id);

        if (container && ! $(container).find('.coreui-chart-lock')[0]) {
            $(container).prepend(
                '<div class="coreui-chart-lock">' +
                    '<div class="coreui-chart-message">' +
                        '<div class="spinner-border spinner-border-sm"></div> ' +
                        (text ? '<span>' + text + '</span>' : '') +
                    '</span>' +
                '</div>'
            );
        }
    },


    /**
     * Разблокировка
     */
    unlock: function () {

        $('#coreui-chart-' + this._options.id + ' > .coreui-chart-lock').fadeOut(50, function () {
            $(this).remove();
        });
    },


    /**
     * Получение данных графика
     * @param {string} url
     */
    loadData: function (url) {

        this._trigger('load-data.coreui.chart', this, [ this ]);

        if ( ! this._options.options.enabled.hasOwnProperty('preloader') ||
            this._options.options.enabled.preloader === true
        ) {
            this.lock(this.getLang().loading);
        }

        let that = this;

        $.ajax({
            url: url,
            method: 'get',
            dataType: "json",
            beforeSend: function(xhr) {
                that._trigger('start-load-data.coreui.chart', that, [ that, xhr ]);
            },
            success: function (result) {

                that.clearDatasets();

                if (result.hasOwnProperty('datasets') && Array.isArray(result.datasets)) {
                    that.addDatasets(result.datasets);
                }

                that._trigger('success-load-data.coreui.chart', that, [ that, result ]);
            },
            error: function(xhr, textStatus, errorThrown) {
                that._trigger('error-load-data.coreui.chart', that, [ that, xhr, textStatus, errorThrown ]);
            },
            complete: function(xhr, textStatus) {
                that.unlock();
                that._trigger('end-load-data.coreui.chart', that, [ that, xhr, textStatus ]);
            },
        });
    },


    /**
     * Добавление новых наборов
     * @param {Array} datasets
     */
    addDatasets: function(datasets) {

        if (this._typeInstance && typeof this._typeInstance.addDatasets === 'function') {
            this._typeInstance.addDatasets(datasets)
        }
    },


    /**
     * Добавление данных в указанный набор
     * @param {object} datasets
     */
    appendDataset: function(datasets) {

        if (this._typeInstance && typeof this._typeInstance.appendDataset === 'function') {
            this._typeInstance.appendDataset(datasets)
        }
    },


    /**
     * Удаление набора данных по имени
     * @param {string} name
     */
    removeDataset: function(name) {

        if (this._typeInstance && typeof this._typeInstance.removeDataset === 'function') {
            this._typeInstance.removeDataset(name)
        }
    },


    /**
     * Удаление всех наборов данных
     */
    clearDatasets: function() {

        if (this._typeInstance && typeof this._typeInstance.clearDatasets === 'function') {
            this._typeInstance.clearDatasets()
        }
    },


    /**
     * Получение всех наборов данных
     * @returns {Array}
     */
    getDatasets: function () {

        let datasets = [];

        if (this._typeInstance && typeof this._typeInstance.getDatasets === 'function') {
            datasets = this._typeInstance.getDatasets()
        }

        return datasets;
    },


    /**
     * Получение экземпляра набора данных
     * @param {string} name
     * @returns {object|null}
     */
    getDataset: function (name) {

        let dataset = null;

        if (this._typeInstance && typeof this._typeInstance.getDataset === 'function') {
            dataset = this._typeInstance.getDataset(name)
        }

        return dataset;
    },


    /**
     * Получение всех аннотаций
     * @returns {Array}
     */
    getAnnotations: function () {

        let annotations = {};

        if (this._typeInstance && typeof this._typeInstance.getAnnotations === 'function') {
            annotations = this._typeInstance.getAnnotations()
        }

        return annotations;
    },


    /**
     * Получение аннотации
     * @param {string} annotationId
     * @returns {object|null}
     */
    getAnnotation: function (annotationId) {

        let annotation = null;

        if (this._typeInstance && typeof this._typeInstance.getAnnotation === 'function') {
            annotation = this._typeInstance.getAnnotation(annotationId)
        }

        return annotation;
    },


    /**
     * Добавление аннотации
     * @param {object} annotation
     * @returns {string|null}
     */
    addAnnotation: function (annotation) {

        let annotationId = null;

        if (this._typeInstance && typeof this._typeInstance.addAnnotation === 'function') {
            annotationId = this._typeInstance.addAnnotation(annotation)
        }

        return annotationId;
    },


    /**
     * Удаление аннотации
     * @param {string} annotationId
     * @returns {object}
     */
    removeAnnotation: function (annotationId) {

        if (this._typeInstance && typeof this._typeInstance.removeAnnotation === 'function') {
            this._typeInstance.removeAnnotation(annotationId)
        }
    },


    /**
     * Удаление всех аннотаций
     */
    clearAnnotations: function () {

        if (this._typeInstance && typeof this._typeInstance.clearAnnotations === 'function') {
            this._typeInstance.clearAnnotations()
        }
    },


    /**
     * Изменение масштаба на графике
     * @param {string|numeric} start
     * @param {string|numeric} end
     */
    zoomX: function (start, end) {

        this._apex.zoomX(start, end);
    },


    /**
     * Регистрация функции вызываемой при наступлении указанного события
     * @param eventName
     * @param callback
     * @param context
     * @param singleExec
     */
    on: function(eventName, callback, context, singleExec) {
        if (typeof this._events[eventName] !== 'object') {
            this._events[eventName] = [];
        }
        this._events[eventName].push({
            context : context || this,
            callback: callback,
            singleExec: !! singleExec,
        });
    },


    /**
     * Уничтожение графика
     */
    destruct: function () {

        this._apex.destroy();
        delete CoreUI.chart._instances[this.getId()];
    },


    /**
     * Получение настроек языка
     * @private
     */
    getLang: function () {

        return CoreUI.chart.lang.hasOwnProperty(this._options.options.lang)
            ? CoreUI.chart.lang[this._options.options.lang]
            : CoreUI.chart.lang['en'];
    },


    /**
     * @param name
     * @param context
     * @param params
     * @return {object}
     * @private
     */
    _trigger: function(name, context, params) {

        params = params || [];
        let results = [];

        if (this._events[name] instanceof Object && this._events[name].length > 0) {
            for (var i = 0; i < this._events[name].length; i++) {
                let callback = this._events[name][i].callback;

                context = context || this._events[name][i].context;

                results.push(
                    callback.apply(context, params)
                );

                if (this._events[name][i].singleExec) {
                    this._events[name].splice(i, 1);
                }
            }
        }

        return results;
    },


    /**
     * Сборка опций для библиотеки apex
     * @param {object} chart
     * @private
     */
    _convertToApex: function (chart) {

        let that        = this;
        let apexOptions = {
            series: [],
            annotations: {
                yaxis: [],
                xaxis: [],
                points: []
            },
            theme: {
                mode: 'light',
                palette: 'palette1',
                monochrome: {
                    enabled: false,
                    color: '#255aee',
                    shadeTo: 'light',
                    shadeIntensity: 0.65
                },
            },
            chart: {
                zoom: {
                    enabled: false
                },
                animations: {
                    enabled: false
                },
                toolbar: {
                    show: false,
                    tools: {
                        zoom: true,
                        zoomin: true,
                        zoomout: true,
                        pan: false,
                        reset: false
                    }
                },
                events: {
                    mouseMove: function(event, chartContext, config) {
                        if ( ! config.globals.tooltip.hasOwnProperty('tooltipRect')) {
                            return;
                        }

                        let seriesBound = config.globals.dom.elWrap.getBoundingClientRect();
                        let x           = config.globals.clientX - seriesBound.left - (config.globals.tooltip.tooltipRect.ttWidth / 2);
                        let y           = config.globals.clientY - seriesBound.top - (config.globals.tooltip.tooltipRect.ttHeight / 2);
                        let tooltip     = chartContext.el.querySelector('#apexcharts' + config.globals.chartID + ' > .apexcharts-tooltip');

                        if (x > config.globals.gridWidth / 2) {
                            tooltip.classList.add("apexcharts-tooltip-left");
                            tooltip.classList.remove("apexcharts-tooltip-right");
                        } else {
                            tooltip.classList.remove("apexcharts-tooltip-left");
                            tooltip.classList.add("apexcharts-tooltip-right");
                        }

                        if (y > config.globals.gridHeight / 3.3) {
                            tooltip.classList.add("apexcharts-tooltip-top");
                            tooltip.classList.remove("apexcharts-tooltip-bottom");
                        } else {
                            tooltip.classList.remove("apexcharts-tooltip-top");
                            tooltip.classList.add("apexcharts-tooltip-bottom");
                        }
                    }
                }
            },
            title: {
                text: "",
                align: 'left',
                style : {
                    fontSize  : '14px',
                    fontWeight: 'bold',
                    fontFamily: '"Segoe UI",Roboto,"Helvetica Neue","Noto Sans","Liberation Sans",Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji"',
                    color     : '#333'
                }
            },
            subtitle: {
                text: "",
                align: 'left',
                margin: 5,
                style : {
                    fontSize  : '12px',
                    fontWeight: 'normal',
                    fontFamily: '"Segoe UI",Roboto,"Helvetica Neue","Noto Sans","Liberation Sans",Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji"',
                    color     : '#666'
                }
            },
            stroke: {
                width: [],
                curve: [],
                dashArray: [],
            },
            legend: {
                show: true,
                position: 'bottom',
                horizontalAlign: 'left',
                markers: {
                    width: 12,
                    height: 4,
                    radius: 1,
                    onClick: undefined,
                    offsetY: -2
                }
            },
            markers: {
                size: [],
                strokeWidth: 1,
                strokeOpacity: 0.5,
                shape: 'circle',
                hover: {
                    size: 5,
                    sizeOffset: 5
                }
            },
            dataLabels: {
                enabled: false,
                enabledOnSeries: [],
                style: {
                    colors: []
                }
            },
            fill: {
                type:  [],
                opacity: [],
                gradient: {
                    type: "vertical",
                    shadeIntensity: 0,
                    inverseColors: false,
                    opacityFrom: [],
                    opacityTo: 0,
                    stops: [40, 100, 100, 100]
                }
            },
            plotOptions: {
                bar: {
                    borderRadius: 0,
                    horizontal: false,
                    columnWidth: '70%',
                    barHeight: '70%',
                    dataLabels: {
                        total: {
                            enabled: false
                        }
                    }
                },
                pie: {
                    startAngle: 0,
                    endAngle: 360,
                    donut: {
                        size: '65%',
                        labels: {
                            value: {
                                show: false,
                            },
                            total: {
                                show: false,
                                showAlways: false,
                                label: 'Total',
                            }
                        }
                    }
                },
                radialBar: {
                    startAngle: 0,
                    endAngle: 360,
                    hollow: {
                        size: '40%'
                    },
                    track: {
                        show: true,
                        background: '#f2f2f2',
                        dropShadow: {
                            enabled: false,
                            top: 0,
                            left: 0,
                            blur: 3,
                            opacity: 0.15
                        }
                    },
                    dataLabels: {
                        name: {
                            offsetY: undefined,
                        },
                        value: {
                            show: false,
                            fontSize: '22px',
                            offsetY: undefined,
                        },
                        total: {
                            show: false,
                            showAlways: false,
                            label: 'Total',
                            fontSize: '16px',
                            fontWeight: 400,
                        }
                    }
                },
                candlestick: {
                    colors: {
                        upward:   '#00B746',
                        downward: '#EF403C'
                    },
                    wick: {
                        useFillColor: true
                    }
                },
                boxPlot: {
                    colors: {
                        upper: '#5C4742',
                        lower: '#A5978B'
                    }
                }
            },
            colors: [],
            tooltip: {
                enabled: true,
                followCursor: true,
                shared: true,
                intersect: false,
                style: {
                    fontSize: '12px'
                },
                x: {
                    formatter: function (val) {
                        if (typeof val === 'string') {
                            return val;
                        }

                        return this.hasOwnProperty('categoryLabels') &&
                               this.categoryLabels.hasOwnProperty(val-1) &&
                               this.categoryLabels[val-1] !== undefined
                            ? this.categoryLabels[val-1]
                            : null;
                    }
                },
                y: {
                    formatter: undefined,
                }
            },
            grid: {
                show: true,
                borderColor: '#f5f5f5',
                strokeDashArray: 0,
                xaxis: {
                    lines: {
                        show: true
                    }
                },
                yaxis: {
                    lines: {
                        show: true
                    }
                }
            },
            yaxis: {
                opposite: false,
                logarithmic: false,
                logBase: 10,
                tooltip: {
                    enabled: false
                },
                axisBorder: {
                    show: false,
                    color: '#78909C'
                },
                axisTicks: {
                    show: false,
                    borderType: 'solid',
                    color: '#78909C',
                    width: 6,
                    offsetX: 0,
                    offsetY: 0
                },
                title: {
                    text: undefined,
                    style: {
                        color: '#78909C',
                        fontSize: '12px',
                        fontFamily: 'Helvetica, Arial, sans-serif',
                        fontWeight: 600,
                        cssClass: 'apexcharts-yaxis-title',
                    },
                },
                labels: {
                    style: {
                        colors: '#78909C',
                    }
                }
            },
            xaxis: {
                type: 'category',
                categories: [],
                tooltip: {
                    enabled: false
                },
                axisBorder: {
                    show: false,
                    color: '#78909C'
                },
                axisTicks: {
                    show: false,
                    borderType: 'solid',
                    color: '#78909C',
                    width: 6,
                    offsetX: 0,
                    offsetY: 0
                },
                title: {
                    text: undefined,
                    style: {
                        color: '#78909C',
                        fontSize: '12px',
                        fontFamily: 'Helvetica, Arial, sans-serif',
                        fontWeight: 600,
                        cssClass: 'apexcharts-yaxis-title',
                    },
                },
                labels: {
                    style: {
                        colors: '#78909C',
                    }
                },
                crosshairs: {
                    show: true,
                    width: 1,
                    position: 'back',
                    opacity: 1,
                    stroke: {
                        color: '#666',
                        width: 1,
                        dashArray: 3,
                    }
                },
            }
        };


        if (chart.hasOwnProperty('labels') && CoreUI.chart.utils.isArray(chart.labels)) {
            apexOptions.labels = chart.labels;
        }
        if (chart.hasOwnProperty('options') && CoreUI.chart.utils.isObject(chart.options)) {
            if (chart.options.hasOwnProperty('lang')) {
                apexOptions.chart.defaultLocale = chart.options.lang;
                apexOptions.chart.locales       = [ {
                    name:    chart.options.lang,
                    options: this.getLang()
                } ];
            }
            if (chart.options.hasOwnProperty('width') && ['string', 'number'].indexOf(typeof chart.options.width) >= 0) {
                apexOptions.chart.width = chart.options.width;
            }
            if (chart.options.hasOwnProperty('height') && ['string', 'number'].indexOf(typeof chart.options.height) >= 0) {
                apexOptions.chart.height = chart.options.height;
            }

            // Title
            if (chart.options.hasOwnProperty('title') && CoreUI.chart.utils.isObject(chart.options.title)) {
                that._setOptionsTitle(apexOptions, chart.options.title);
            }

            // Legend
            if (chart.options.hasOwnProperty('legend') && CoreUI.chart.utils.isObject(chart.options.legend)) {
                let title = chart.options.hasOwnProperty('title') ? chart.options.title : {};
                that._setOptionsLegend(apexOptions, chart.options.legend, title);
            }

            // Enabled
            if (chart.options.hasOwnProperty('enabled') && CoreUI.chart.utils.isObject(chart.options.enabled)) {
                that._setOptionsEnabled(apexOptions, chart.options.enabled);
            }

            // Tooltip
            if (chart.options.hasOwnProperty('tooltip') && CoreUI.chart.utils.isObject(chart.options.tooltip)) {
                that._setOptionsTooltip(apexOptions, chart.options.tooltip);
            }

            // Axis
            if (chart.options.hasOwnProperty('axis') && CoreUI.chart.utils.isObject(chart.options.axis)) {
                that._setOptionsAxis(apexOptions, chart.options.axis);
            }

            // theme
            if (chart.options.hasOwnProperty('theme') && CoreUI.chart.utils.isObject(chart.options.theme)) {
                that._setOptionsTheme(apexOptions, chart.options.theme);
            }

            // Events
            if (chart.options.hasOwnProperty('events') && CoreUI.chart.utils.isObject(chart.options.events)) {
                if (chart.options.events.hasOwnProperty('markerClick')) {
                    if (typeof chart.options.events.markerClick === 'function') {
                        apexOptions.chart.events.markerClick = function(event, chartContext, marker) {
                            chart.options.events.markerClick(event, chartContext, marker);
                        }

                    } else if (typeof chart.options.events.markerClick === 'string') {
                        let func = CoreUI.chart.utils.getFunctionByName(chart.options.events.markerClick);
                        if (typeof func === 'function') {
                            apexOptions.chart.events.markerClick = func;
                        }
                    }
                }

                if (chart.options.events.hasOwnProperty('legendClick')) {
                    if (typeof chart.options.events.legendClick === 'function') {
                        apexOptions.chart.events.legendClick = function(chartContext, seriesIndex) {
                            chart.options.events.legendClick(chartContext, seriesIndex);
                        }

                    } else if (typeof chart.options.events.legendClick === 'string') {
                        let func = CoreUI.chart.utils.getFunctionByName(chart.options.events.legendClick);
                        if (typeof func === 'function') {
                            apexOptions.chart.events.legendClick = func;
                        }
                    }
                }

                if (chart.options.events.hasOwnProperty('zoomed')) {
                    if (typeof chart.options.events.zoomed === 'function') {
                        apexOptions.chart.events.zoomed = function(chartContext, axis) {
                            chart.options.events.zoomed(chartContext, axis);
                        }

                    } else if (typeof chart.options.events.zoomed === 'string') {
                        let func = CoreUI.chart.utils.getFunctionByName(chart.options.events.zoomed);
                        if (typeof func === 'function') {
                            apexOptions.chart.events.zoomed = func;
                        }
                    }
                }
            }
        }


        return apexOptions;
    },


    /**
     * Определение типа графика
     * @return {*}
     * @private
     */
    _getTypeChart: function () {

        let type = this._options.hasOwnProperty('options') &&
                CoreUI.chart.utils.isObject(this._options.options) &&
                this._options.options.hasOwnProperty('type') &&
                typeof this._options.options.type === 'string'
            ? this._options.options.type
            : 'line';

        if (['line', 'hBar', 'pie', 'radar', 'rangeArea', 'rangeBar', 'polarArea', 'candlestick', 'box'].indexOf(type) <= 0) {
            type = 'line';
        } else {
            type = this._options.options.type;
        }

        return type;
    },


    /**
     * Получение набора цветов
     * @private
     */
    _getColors: function () {

        let colorScheme = 'classic';
        let colors      = null;

        // Получение цветов палитры
        if (colorScheme) {
            if (colorScheme === 'classic') {
                colors = CoreUI.chart.utils.getPaletteClassic();

            } else {
                colors = CoreUI.chart.palette(colorScheme, 65);

                // не удалось получить столько цветов
                if (colors === null) {
                    $.each(CoreUI.chart.palette.listSchemes('all'), function (key, scheme) {
                        if (scheme.scheme_name === colorScheme) {
                            colors = CoreUI.chart.palette(colorScheme, scheme.max);
                            return false;
                        }
                    });

                    // Некорректная схема
                    if (colors === null) {
                        colors = CoreUI.chart.utils.getPaletteClassic();
                    }
                }
            }
        }

        return colors;
    },


    /**
     * Заполнение Options.Title
     * @param apexOptions
     * @param title
     * @private
     */
    _setOptionsTitle: function (apexOptions, title) {

        if (title.hasOwnProperty('text') && typeof title.text === 'string') {
            apexOptions.title.text = title.text;
        }
        if (title.hasOwnProperty('align') && typeof title.align === 'string') {
            apexOptions.title.align = title.align;
        }
        if (title.hasOwnProperty('fontSize') && typeof title.fontSize === 'string') {
            apexOptions.title.style.fontSize = title.fontSize;
        }
        if (title.hasOwnProperty('fontWeight') && typeof title.fontWeight === 'string') {
            apexOptions.title.style.fontWeight = title.fontWeight;
        }
        if (title.hasOwnProperty('fontFamily') && typeof title.fontFamily === 'string') {
            apexOptions.title.style.fontFamily = title.fontFamily;
        }
        if (title.hasOwnProperty('color') && typeof title.color === 'string') {
            apexOptions.title.style.color = title.color;
        }

        // Description
        if (title.hasOwnProperty('description') && CoreUI.chart.utils.isObject(title.description)) {
            if (title.description.hasOwnProperty('text') && typeof title.description.text === 'string') {
                apexOptions.subtitle.text = title.description.text;
            }
            if (title.description.hasOwnProperty('align') && typeof title.description.align === 'string') {
                apexOptions.subtitle.align = title.description.align;
            }
            if (title.description.hasOwnProperty('fontSize') && typeof title.description.fontSize === 'string') {
                apexOptions.subtitle.style.fontSize = title.description.fontSize;
            }
            if (title.description.hasOwnProperty('fontWeight') && typeof title.description.fontWeight === 'string') {
                apexOptions.subtitle.style.fontWeight = title.description.fontWeight;
            }
            if (title.description.hasOwnProperty('fontFamily') && typeof title.description.fontFamily === 'string') {
                apexOptions.subtitle.style.fontFamily = title.description.fontFamily;
            }
            if (title.description.hasOwnProperty('color') && typeof title.description.color === 'string') {
                apexOptions.subtitle.style.color = title.description.color;
            }
        }
    },


    /**
     * Заполнение Options.Legend
     * @param apexOptions
     * @param legend
     * @param title
     * @private
     */
    _setOptionsLegend: function (apexOptions, legend, title) {

        if (legend.hasOwnProperty('position') && typeof legend.position === 'string') {
            apexOptions.legend.position = legend.position;
        }
        if (legend.hasOwnProperty('horizontalAlign') && typeof legend.horizontalAlign === 'string') {
            apexOptions.legend.horizontalAlign = legend.horizontalAlign;

            if (['left', 'right'].indexOf(legend.position) >= 0 &&
                CoreUI.chart.utils.isObject(title) &&
                (
                    (title.hasOwnProperty('text') && typeof title.text === 'string' && title.text) ||
                    (title.description.hasOwnProperty('text') && typeof title.description.text === 'string' && title.description.text)
                )
            ) {
                let offsetY = 0;

                if (title.hasOwnProperty('text') &&
                    typeof title.text === 'string' &&
                    title.text
                ) {
                    offsetY += 20;
                }

                if (title.description.hasOwnProperty('text') &&
                    typeof title.description.text === 'string' &&
                    title.description.text
                ) {
                    offsetY += 20;
                }

                apexOptions.legend.offsetY = offsetY;

            } else if (legend.position === 'top') {
                apexOptions.legend.offsetY = 0;
            }
        }
    },


    /**
     * Заполнение Options.Enabled
     * @param apexOptions
     * @param enabled
     * @private
     */
    _setOptionsEnabled: function (apexOptions, enabled) {

        if (enabled.hasOwnProperty('animations') && typeof enabled.animations === 'boolean') {
            apexOptions.chart.animations.enabled = enabled.animations;
        }
        if (enabled.hasOwnProperty('zoom') && typeof enabled.zoom === 'boolean') {
            apexOptions.chart.zoom.enabled = enabled.zoom;
        }
        if (enabled.hasOwnProperty('toolbar') && typeof enabled.toolbar === 'boolean') {
            apexOptions.chart.toolbar.show = enabled.toolbar;
        }
        if (enabled.hasOwnProperty('legend') && typeof enabled.legend === 'boolean') {
            apexOptions.legend.show = enabled.legend;
        }
        if (enabled.hasOwnProperty('labels') && typeof enabled.labels === 'boolean') {
            apexOptions.dataLabels.enabled = enabled.labels;
        }
        if (enabled.hasOwnProperty('tooltip') && typeof enabled.tooltip === 'boolean') {
            apexOptions.tooltip.enabled = enabled.tooltip;
        }
    },


    /**
     * Заполнение Options.Tooltip
     * @param apexOptions
     * @param tooltip
     * @private
     */
    _setOptionsTooltip: function (apexOptions, tooltip) {

        if (tooltip.hasOwnProperty('mode') && typeof tooltip.mode === 'string') {
            if (tooltip.mode === 'all') {
                apexOptions.tooltip.shared = true;
                apexOptions.tooltip.intersect = false;

            } else if (tooltip.mode === 'single') {
                apexOptions.tooltip.shared = false;
                apexOptions.tooltip.intersect = true;
            }
        }

        if (tooltip.hasOwnProperty('formatter')) {
            if (typeof tooltip.formatter === 'function') {
                apexOptions.tooltip.y.formatter = tooltip.formatter;

            } else if (typeof tooltip.formatter === 'string') {
                let func = CoreUI.chart.utils.getFunctionByName(tooltip.formatter);
                if (typeof func === 'function') {
                    apexOptions.tooltip.y.formatter = func;
                }
            }

        } else if (
            (tooltip.hasOwnProperty('valueSuffix') && typeof tooltip.valueSuffix === 'string') ||
            (tooltip.hasOwnProperty('valuePrefix') && typeof tooltip.valuePrefix === 'string')
        ) {
            let valueSuffix = '';
            let valuePrefix = '';

            if (tooltip.hasOwnProperty('valueSuffix') && typeof tooltip.valueSuffix === 'string') {
                valueSuffix = tooltip.valueSuffix;
            }
            if (tooltip.hasOwnProperty('valuePrefix') && typeof tooltip.valuePrefix === 'string') {
                valuePrefix = tooltip.valuePrefix;
            }
            apexOptions.tooltip.y.formatter = function(val, data) {
                return valuePrefix + val + valueSuffix;
            };
        }
    },


    /**
     * Заполнение Options.Styles.Bar
     * @param apexOptions
     * @param axis
     * @private
     */
    _setOptionsAxis: function (apexOptions, axis) {

        // Xaxis
        if (axis.hasOwnProperty('xaxis') && CoreUI.chart.utils.isObject(axis.xaxis)) {
            if (axis.xaxis.hasOwnProperty('show') && typeof axis.xaxis.show === 'boolean') {
                apexOptions.xaxis.show = axis.xaxis.show;
            }
            if (axis.xaxis.hasOwnProperty('title') && typeof axis.xaxis.title === 'string') {
                apexOptions.xaxis.title.text = axis.xaxis.title;
            }
            if (axis.xaxis.hasOwnProperty('type') && typeof axis.xaxis.type === 'string') {
                apexOptions.xaxis.type = axis.xaxis.type;
            }
            if (axis.xaxis.hasOwnProperty('position') && typeof axis.xaxis.position === 'string') {
                apexOptions.xaxis.position = axis.xaxis.position;
            }
            if (axis.xaxis.hasOwnProperty('border') && typeof axis.xaxis.border === 'boolean') {
                apexOptions.xaxis.axisBorder.show = axis.xaxis.border;
                apexOptions.xaxis.axisTicks.show  = axis.xaxis.border;
            }
            if (axis.xaxis.hasOwnProperty('color') && typeof axis.xaxis.color === 'string') {
                apexOptions.xaxis.axisBorder.color   = axis.xaxis.color;
                apexOptions.xaxis.axisTicks.color    = axis.xaxis.color;
                apexOptions.xaxis.title.style.color  = axis.xaxis.color;
                apexOptions.xaxis.labels.style.colors = axis.xaxis.color;
            }
        }

        // Yaxis
        if (axis.hasOwnProperty('yaxis') && CoreUI.chart.utils.isObject(axis.yaxis)) {
            if (axis.yaxis.hasOwnProperty('show') && typeof axis.xaxis.show === 'boolean') {
                apexOptions.yaxis.show = axis.yaxis.show;
            }
            if (axis.yaxis.hasOwnProperty('logarithmic') && typeof axis.yaxis.logarithmic === 'boolean') {
                apexOptions.yaxis.logarithmic = axis.yaxis.logarithmic;
            }
            if (axis.yaxis.hasOwnProperty('title') && typeof axis.yaxis.title === 'string') {
                apexOptions.yaxis.title.text = axis.yaxis.title;
            }
            if (axis.yaxis.hasOwnProperty('position') && typeof axis.yaxis.position === 'string') {
                apexOptions.yaxis.opposite = axis.yaxis.position === 'right';
            }
            if (axis.yaxis.hasOwnProperty('logBase') && typeof axis.yaxis.logBase === 'number') {
                apexOptions.yaxis.logBase = axis.yaxis.logBase;
            }
            if (axis.yaxis.hasOwnProperty('min') && typeof axis.yaxis.min === 'number') {
                apexOptions.yaxis.min = axis.yaxis.min;
            }
            if (axis.yaxis.hasOwnProperty('max') && typeof axis.yaxis.max === 'number') {
                apexOptions.yaxis.max = axis.yaxis.max;
            }
            if (axis.yaxis.hasOwnProperty('border') && typeof axis.yaxis.border === 'boolean') {
                apexOptions.yaxis.axisBorder.show = axis.yaxis.border;
                apexOptions.yaxis.axisTicks.show  = axis.yaxis.border;
            }
            if (axis.yaxis.hasOwnProperty('color') && typeof axis.yaxis.color === 'string') {
                apexOptions.yaxis.axisBorder.color   = axis.yaxis.color;
                apexOptions.yaxis.axisTicks.color    = axis.yaxis.color;
                apexOptions.yaxis.title.style.color  = axis.yaxis.color;
                apexOptions.yaxis.labels.style.colors = axis.yaxis.color;
            }
        }

        // Grid
        if (axis.hasOwnProperty('grid') && CoreUI.chart.utils.isObject(axis.grid)) {
            if (axis.grid.hasOwnProperty('show') && typeof axis.grid.show === 'boolean') {
                apexOptions.grid.show = axis.grid.show;
            }
            if (axis.grid.hasOwnProperty('xLines') && typeof axis.grid.xLines === 'boolean') {
                apexOptions.grid.xaxis.lines.show = axis.grid.xLines;
            }
            if (axis.grid.hasOwnProperty('yLines') && typeof axis.grid.yLines === 'boolean') {
                apexOptions.grid.yaxis.lines.show = axis.grid.yLines;
            }
            if (axis.grid.hasOwnProperty('dash') && typeof axis.grid.dash === 'number') {
                apexOptions.grid.strokeDashArray = axis.grid.dash;
            }
            if (axis.grid.hasOwnProperty('color') && typeof axis.grid.color === 'string') {
                apexOptions.grid.borderColor = axis.grid.color;
            }
        }
    },


    /**
     * Заполнение Options.Theme
     * @param apexOptions
     * @param theme
     * @private
     */
    _setOptionsTheme: function (apexOptions, theme) {

        // Theme
        if (theme.hasOwnProperty('mode') && typeof theme.mode === 'string') {
            apexOptions.theme.mode = theme.mode;
        }
        if (theme.hasOwnProperty('colorScheme') && typeof theme.colorScheme === 'string') {
            if (theme.colorScheme === 'monochrome') {
                apexOptions.theme.monochrome.enabled = true;
                apexOptions.theme.palette = null;

            } else {
                apexOptions.theme.palette = theme.colorScheme
            }
        }
        if (theme.hasOwnProperty('monochromeColor') && typeof theme.monochromeColor === 'string') {
            apexOptions.theme.monochrome.color = theme.monochromeColor;
        }
        if (theme.hasOwnProperty('background') && typeof theme.background === 'string') {
            apexOptions.chart.background = theme.background;
        }
    }
}