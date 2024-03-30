import coreuiChart      from '../coreui.chart';
import coreuiChartUtils from '../coreui.chart.utils';
import apexCharts       from '../../../node_modules/apexcharts/dist/apexcharts.esm';

coreuiChart.type.line = {

    _options: {},
    _apexOptions: {},
    _apex: null,
    _colors: [],
    _datasets: [],
    _annotations: {},


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
     * Добавление новых наборов
     * @param {Array} datasets
     */
    addDatasets: function(datasets) {

        if ( ! Array.isArray(datasets)) {
            return;
        }

        let that = this;

        $.each(datasets, function (key, dataset) {
            let apexOptions = that._getDatasetOptions(dataset);

            if (apexOptions === null) {
                return;
            }

            that._apexOptions = apexOptions;
            that._datasets.push(dataset);
        });


        this._fixMarkers(this._apexOptions);


        if (this._options.hasOwnProperty('options') &&
            coreuiChartUtils.isObject(this._options.options) &&
            this._options.options.debug
        ) {
            console.log($.extend(true, {}, this._apexOptions));
        }

        this._apex.updateOptions($.extend(true, {}, this._apexOptions));
    },


    /**
     * Добавление данных в указанные наборы данных
     * @param {object} datasets
     */
    appendDataset: function(datasets) {

        let appendData = [];

        $.each(this._datasets, function(key, dataset) {
            let newData = [];

            $.each(datasets, function(name, data) {
                if (dataset.hasOwnProperty('name') &&
                    dataset.name === name &&
                    Array.isArray(data)
                ) {
                    newData = data
                    return false;
                }
            });

            appendData.push({
                data: newData
            });
        });

        if (appendData.length === 0) {
            return;
        }

        this._apex.appendData(appendData)
    },


    /**
     * Удаление набора данных
     * @param {string} name
     */
    removeDataset: function(name) {

        let datasetKey = null;

        $.each(this._datasets, function(key, dataset) {
            if (dataset.hasOwnProperty('name') && dataset.name === name) {
                datasetKey = key;
                return false;
            }
        });

        if (datasetKey === null) {
            return;
        }

        this._datasets.splice(datasetKey, 1);

        this._apexOptions.dataLabels.enabledOnSeries.splice(datasetKey, 1);
        this._apexOptions.dataLabels.style.colors.splice(datasetKey, 1);
        this._apexOptions.fill.gradient.opacityFrom.splice(datasetKey, 1);
        this._apexOptions.fill.opacity.splice(datasetKey, 1);
        this._apexOptions.fill.type.splice(datasetKey, 1);
        this._apexOptions.stroke.width.splice(datasetKey, 1);
        this._apexOptions.stroke.dashArray.splice(datasetKey, 1);
        this._apexOptions.stroke.curve.splice(datasetKey, 1);
        this._apexOptions.markers.size.splice(datasetKey, 1);
        this._apexOptions.colors.splice(datasetKey, 1);
        this._apexOptions.series.splice(datasetKey, 1);

        if (this._options.hasOwnProperty('options') &&
            coreuiChartUtils.isObject(this._options.options) &&
            this._options.options.debug
        ) {
            console.log($.extend(true, {}, this._apexOptions));
        }

        this._apex.updateOptions($.extend(true, {}, this._apexOptions));
    },


    /**
     * Удаление всех наборов данных
     */
    clearDatasets: function() {

        this._datasets = [];

        this._apexOptions.dataLabels.enabledOnSeries = [];
        this._apexOptions.dataLabels.style.colors = [];
        this._apexOptions.fill.gradient.opacityFrom = [];
        this._apexOptions.fill.opacity = [];
        this._apexOptions.fill.type = [];
        this._apexOptions.stroke.width = [];
        this._apexOptions.stroke.dashArray = [];
        this._apexOptions.stroke.curve = [];
        this._apexOptions.markers.size = [];
        this._apexOptions.colors = [];
        this._apexOptions.series = [];

        this._apex.updateSeries([]);
    },


    /**
     * Получение всех наборов данных
     * @returns {object}
     */
    getDatasets: function () {

        return $.extend(true, [], this._datasets);
    },


    /**
     * Получение экземпляра набора данных
     * @param {string} name
     * @returns {object|null}
     */
    getDataset: function (name) {

        let dataset = null;

        $.each(this._datasets, function (key, datasetItem) {
            if (datasetItem.name === name) {
                dataset = datasetItem;
                return false;
            }
        });

        return dataset;
    },


    /**
     * Получение всех аннотаций
     * @returns {Array}
     */
    getAnnotations: function () {

        return Object.values(this._annotations);
    },


    /**
     * Получение аннотации
     * @param {string} annotationId
     * @returns {object|null}
     */
    getAnnotation: function (annotationId) {

        return this._annotations.hasOwnProperty(annotationId)
            ? this._annotations(annotationId)
            : null;
    },


    /**
     * Добавление аннотации
     * @param {object} annotation
     * @returns {string|null}
     */
    addAnnotation: function (annotation) {

        if ( ! coreuiChartUtils.isObject(annotation) ||
             ! annotation.hasOwnProperty('type') ||
            typeof annotation.type !== 'string' ||
            ['yLine', 'xLine', 'point'].indexOf(annotation.type) < 0
        ) {
            return null;
        }

        if (typeof annotation.id !== 'string') {
            annotation.id = coreuiChartUtils.hashCode();
        }

        switch (annotation.type) {
            case 'yLine':
                if ( ! annotation.hasOwnProperty('y')) {
                    return null;
                }

                this._apex.addYaxisAnnotation(
                    this._getAnnotationsYLine(annotation)
                );
                break;

            case 'xLine':
                if ( ! annotation.hasOwnProperty('x')) {
                    return null;
                }

                this._apex.addXaxisAnnotation(
                    this._getAnnotationsXLine(annotation)
                );
                break;

            case 'point':
                if ( ! annotation.hasOwnProperty('x') || ! annotation.hasOwnProperty('y')) {
                    return null;
                }

                this._apex.addPointAnnotation(
                    this._getAnnotationsPoint(annotation)
                );
                break;
        }

        this._annotations[annotation.id] = annotation;

        return annotation.id;
    },


    /**
     * Удаление аннотации
     * @param {string} annotationId
     * @returns {object}
     */
    removeAnnotation: function (annotationId) {

        if (this._annotations.hasOwnProperty(annotationId)) {
            this._apex.removeAnnotation(annotationId);
            delete this._annotations[annotationId];
        }
    },


    /**
     * Удаление всех аннотаций
     */
    clearAnnotations: function () {

        this._annotations = {};
        this._apex.clearAnnotations();
    },


    /**
     * Преобразование настроек в формат apex
     */
    _buildApexOptions: function () {

        let that = this;

        this._apexOptions.chart.type = 'area';

        // Styles
        if (this._options.hasOwnProperty('options') &&
            coreuiChartUtils.isObject(this._options.options) &&
            this._options.options.hasOwnProperty('style') &&
            coreuiChartUtils.isObject(this._options.options.style)
        ) {
            this._setOptionsStyles(this._options.options.style);
        }


        // Datasets
        if (this._options.hasOwnProperty('datasets') &&
            coreuiChartUtils.isArray(this._options.datasets)
        ) {

            $.each(this._options.datasets, function (key, dataset) {

                let apexOptions = that._getDatasetOptions(dataset);

                if (apexOptions !== null) {
                    that._apexOptions = $.extend(true, {}, that._apexOptions, apexOptions);
                    that._datasets.push(dataset);
                }
            });


            this._fixMarkers(this._apexOptions);
        }


        if (this._options.hasOwnProperty('annotations') &&
            coreuiChartUtils.isArray(this._options.annotations)
        ) {
            $.each(this._options.annotations, function (key, annotation) {
                if ( ! coreuiChartUtils.isObject(annotation) ||
                    ! annotation.hasOwnProperty('type') ||
                    typeof annotation.type !== 'string'
                ) {
                    return;
                }


                if (['yLine', 'xLine', 'point'].indexOf(annotation.type) >= 0) {
                    if (typeof annotation.id !== 'string') {
                        annotation.id = coreuiChartUtils.hashCode();
                    }

                    switch (annotation.type) {
                        case 'yLine':
                            if ( ! annotation.hasOwnProperty('y')) {
                                return;
                            }

                            that._apexOptions.annotations.yaxis.push(
                                that._getAnnotationsYLine(annotation)
                            );
                            break;

                        case 'xLine':
                            if ( ! annotation.hasOwnProperty('x')) {
                                return;
                            }

                            that._apexOptions.annotations.xaxis.push(
                                that._getAnnotationsXLine(annotation)
                            );
                            break;

                        case 'point':
                            if ( ! annotation.hasOwnProperty('x') || ! annotation.hasOwnProperty('y')) {
                                return;
                            }

                            that._apexOptions.annotations.points.push(
                                that._getAnnotationsPoint(annotation)
                            );
                            break;
                    }

                    that._annotations[annotation.id] = annotation;
                }
            })
        }
    },


    /**
     * Заполнение Options.Style
     * @param style
     * @private
     */
    _setOptionsStyles: function (style) {

        let issetNoBar = false;

        if (this._options.hasOwnProperty('datasets') && coreuiChartUtils.isArray(this._options.datasets)) {
            $.each(this._options.datasets, function (key, dataset) {
                if (dataset.hasOwnProperty('type') && dataset.type !== 'bar') {
                    issetNoBar = true;
                }
            });
        }

        if ( ! issetNoBar) {
            this._apexOptions.chart.type = 'bar';
        }


        if (style.hasOwnProperty('markerType') && typeof style.markerType === 'string') {
            this._apexOptions.markers.shape = style.markerType;
        }


        if (style.hasOwnProperty('labelTotal') && style.labelTotal === true) {
            this._apexOptions.plotOptions.bar.dataLabels.total.enabled = true;
        }


        if (style.hasOwnProperty('borderRadius') && typeof style.borderRadius === 'number') {
            if (style.borderRadius < 0) {
                style.borderRadius = 0;

            } else if (style.borderRadius > 10) {
                style.borderRadius = 10;
            }

            this._apexOptions.plotOptions.bar.borderRadius = style.borderRadius;
        }

        // Работает только если все датасеты являются колонками
        if (style.hasOwnProperty('stacked') &&
            style.stacked !== false &&
            ['string', 'boolean'].indexOf(typeof style.stacked) >= 0 &&
            this._apexOptions.chart.type === 'bar'
        ) {
            if (style.stacked === true) {
                this._apexOptions.chart.stacked = true;
            } else if (style.stacked === '100%') {
                this._apexOptions.chart.stacked   = true;
                this._apexOptions.chart.stackType = '100%';
            }
        }
    },


    /**
     * Получение обработанного набора данных
     * @param {object} dataset
     * @return {object|null}
     * @private
     */
    _getDatasetOptions: function (dataset) {

        if ( ! coreuiChartUtils.isObject(dataset) ||
            ! dataset.hasOwnProperty('type') ||
            ! dataset.hasOwnProperty('name') ||
            typeof dataset.type !== 'string' ||
            typeof dataset.name !== 'string' ||
            ['line', 'bar', 'points'].indexOf(dataset.type) < 0
        ) {
            return null;
        }

        let color        = null;
        let showLabel    = false;
        let labelColor   = '#333';
        let markerSize   = 0;
        let width        = 1;
        let dash         = 0;
        let fillType     = 'solid';
        let fillOpacity  = 0.4;
        let theme        = 'straight';
        let datasetType  = 'area';
        let style        = {};
        let apexOptions  = $.extend(true, {}, this._apexOptions);


        // Styles
        if (this._options.hasOwnProperty('options') &&
            coreuiChartUtils.isObject(this._options.options) &&
            this._options.options.hasOwnProperty('style') &&
            coreuiChartUtils.isObject(this._options.options.style)
        ) {
            style = this._options.options.style;
        }

        switch(dataset.type) {
            case 'line':   datasetType = 'area'; break;
            case 'points': datasetType = 'scatter'; break;
            case 'bar':    datasetType = 'column'; break;
        }


        if (this._colors.hasOwnProperty(this._datasets.length)) {
            color = this._colors[this._datasets.length];
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

        if (style.hasOwnProperty('markerSize') && typeof style.markerSize === 'number') {
            if (style.markerSize < 0) {
                style.markerSize = 0;

            } else if (style.markerSize > 10) {
                style.markerSize = 10;
            }

            markerSize = style.markerSize;
        }

        if (style.hasOwnProperty('theme') && typeof style.theme === 'string') {
            theme = style.theme;
        }

        if (style.hasOwnProperty('labelColor') && typeof style.labelColor === 'string') {
            labelColor = style.labelColor;
        }

        if (style.hasOwnProperty('gradient') && style.gradient === true) {
            fillType = 'gradient';
        }

        if (style.hasOwnProperty('fill') && typeof style.fill === 'number') {
            if (style.fill < 1) {
                style.fill = 1;
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

            if (dataset.style.hasOwnProperty('labels') && dataset.style.labels === true) {
                showLabel = true;
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

            if (dataset.style.hasOwnProperty('markerSize') && typeof dataset.style.markerSize === 'number') {
                if (dataset.style.markerSize < 0) {
                    dataset.style.markerSize = 0;

                } else if (dataset.style.markerSize > 10) {
                    dataset.style.markerSize = 10;
                }

                markerSize = dataset.style.markerSize;
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

            if (dataset.style.hasOwnProperty('theme') && typeof dataset.style.theme === 'string') {
                theme = dataset.style.theme;
            }
        }



        if (showLabel) {
            apexOptions.dataLabels.enabledOnSeries.push(this._datasets.length);
            apexOptions.dataLabels.enabled = true;
        }

        apexOptions.dataLabels.style.colors.push(labelColor);
        apexOptions.fill.gradient.opacityFrom.push(fillOpacity);
        apexOptions.fill.opacity.push(fillOpacity);

        apexOptions.fill.type.push(fillType);
        apexOptions.stroke.width.push(width);
        apexOptions.stroke.dashArray.push(dash);
        apexOptions.stroke.curve.push(theme);

        apexOptions.markers.size.push(markerSize);
        apexOptions.colors.push((color ? color : '#66a61e'));
        apexOptions.series.push({
            type: datasetType,
            name: dataset.name,
            data: dataset.data
        });

        return apexOptions;
    },


    /**
     * Исправление потенциальной ошибки связанной с маркерами
     * где должны быть положительно заданы либо все маркеры, либо никто
     * @param apexOptions
     * @private
     */
    _fixMarkers: function (apexOptions) {

        let issetMarkers = false;
        $.each(apexOptions.markers.size, function (key, markerSize) {
            if (markerSize > 0) {
                issetMarkers = true;
            }
        });

        if (issetMarkers) {
            $.each(apexOptions.markers.size, function (key, markerSize) {
                if (markerSize === 0) {
                    apexOptions.markers.size[key] = 0.1;
                }
            });
        }
    },


    /**
     *
     * @param annotation
     * @private
     */
    _getAnnotationsYLine: function (annotation) {

        let yLine = {
            label: {
                style: {}
            }
        };

        yLine.y = annotation.y;

        if (annotation.hasOwnProperty('id')) {
            yLine.id = annotation.id;
        }

        if (annotation.hasOwnProperty('y2')) {
            yLine.y2 = annotation.y2;
        }

        if (annotation.hasOwnProperty('text') && typeof annotation.text === 'string') {
            yLine.label.text = annotation.text;
        }



        // Events
        if (annotation.hasOwnProperty('events') && coreuiChartUtils.isObject(annotation.events)) {
            if (annotation.events.hasOwnProperty('mouseEnter')) {
                if (typeof annotation.events.mouseEnter === 'function') {
                    yLine.label.mouseEnter = function() {
                        annotation.events.mouseEnter(annotation);
                    }

                } else if (typeof annotation.events.mouseEnter === 'string') {
                    let func = coreuiChartUtils.getFunctionByName(annotation.events.mouseEnter);
                    if (typeof func === 'function') {
                        yLine.label.mouseEnter = function() {
                            func(annotation);
                        }
                    }
                }
            }

            if (annotation.events.hasOwnProperty('mouseLeave')) {
                if (typeof annotation.events.mouseLeave === 'function') {
                    yLine.label.mouseLeave = function() {
                        annotation.events.mouseLeave(annotation);
                    }

                } else if (typeof annotation.events.mouseLeave === 'string') {
                    let func = coreuiChartUtils.getFunctionByName(annotation.events.mouseLeave);
                    if (typeof func === 'function') {
                        yLine.label.mouseLeave = function() {
                            func(annotation);
                        }
                    }
                }
            }

            if (annotation.events.hasOwnProperty('click')) {
                if (typeof annotation.events.click === 'function') {
                    yLine.label.click = function() {
                        annotation.events.click(annotation);
                    }

                } else if (typeof annotation.events.click === 'string') {
                    let func = coreuiChartUtils.getFunctionByName(annotation.events.click);
                    if (typeof func === 'function') {
                        yLine.label.click = function() {
                            func(annotation);
                        }
                    }
                }
            }
        }

        // Annotation style
        if (annotation.hasOwnProperty('style') && coreuiChartUtils.isObject(annotation.style)) {
            if (annotation.style.hasOwnProperty('fillColor') && typeof annotation.style.fillColor === 'string') {
                yLine.fillColor = annotation.style.fillColor;
            }

            if (annotation.style.hasOwnProperty('borderColor') && typeof annotation.style.borderColor === 'string') {
                yLine.borderColor = annotation.style.borderColor;
            }

            if (annotation.style.hasOwnProperty('opacity') && typeof annotation.style.opacity === 'number') {
                if (annotation.style.opacity < 0) {
                    annotation.style.opacity = 0;

                } else if (annotation.style.opacity > 10) {
                    annotation.style.opacity = 10;
                }

                yLine.opacity = annotation.style.opacity;
            }

            if (annotation.style.hasOwnProperty('dash') && typeof annotation.style.dash === 'number') {
                if (annotation.style.dash < 0) {
                    annotation.style.dash = 0;

                } else if (annotation.style.dash > 100) {
                    annotation.style.dash = 100;
                }

                yLine.strokeDashArray = annotation.style.dash;
            }


            // Label style
            if (annotation.style.hasOwnProperty('label') && coreuiChartUtils.isObject(annotation.style.label)) {
                if (annotation.style.label.hasOwnProperty('color') && typeof annotation.style.label.color === 'string') {
                    yLine.label.style.color = annotation.style.label.color;
                }

                if (annotation.style.label.hasOwnProperty('background') && typeof annotation.style.label.background === 'string') {
                    yLine.label.style.background = annotation.style.label.background;
                }

                if (annotation.style.label.hasOwnProperty('borderColor') && typeof annotation.style.label.borderColor === 'string') {
                    yLine.label.borderColor = annotation.style.label.borderColor;
                }

                if (annotation.style.label.hasOwnProperty('borderWidth') && typeof annotation.style.label.borderWidth === 'number') {
                    if (annotation.style.label.borderWidth < 0) {
                        annotation.style.label.borderWidth = 0;

                    } else if (annotation.style.label.borderWidth > 10) {
                        annotation.style.label.borderWidth = 10;
                    }

                    yLine.label.borderWidth = annotation.style.label.borderWidth;
                }

                if (annotation.style.label.hasOwnProperty('align') && typeof annotation.style.label.align === 'string') {
                    yLine.label.position = annotation.style.label.align;
                }

                if (annotation.style.label.hasOwnProperty('offsetY') && typeof annotation.style.label.offsetY === 'number') {
                    yLine.label.offsetY = annotation.style.label.offsetY;
                }

                if (annotation.style.label.hasOwnProperty('offsetX') && typeof annotation.style.label.offsetX === 'number') {
                    yLine.label.offsetX = annotation.style.label.offsetX;
                }
            }
        }

        return yLine;
    },


    /**
     *
     * @param annotation
     * @private
     */
    _getAnnotationsXLine: function (annotation) {

        let xLine = {
            label: {
                style: {}
            }
        };

        xLine.x = annotation.x;

        if (annotation.hasOwnProperty('id')) {
            xLine.id = annotation.id;
        }

        if (annotation.hasOwnProperty('x2')) {
            xLine.x2 = annotation.x2;
        }

        if (annotation.hasOwnProperty('text') && typeof annotation.text === 'string') {
            xLine.label.text = annotation.text;
        }


        // Events
        if (annotation.hasOwnProperty('events') && coreuiChartUtils.isObject(annotation.events)) {
            if (annotation.events.hasOwnProperty('mouseEnter')) {
                if (typeof annotation.events.mouseEnter === 'function') {
                    xLine.label.mouseEnter = function() {
                        annotation.events.mouseEnter(annotation);
                    }

                } else if (typeof annotation.events.mouseEnter === 'string') {
                    let func = coreuiChartUtils.getFunctionByName(annotation.events.mouseEnter);
                    if (typeof func === 'function') {
                        xLine.label.mouseEnter = function() {
                            func(annotation);
                        }
                    }
                }
            }

            if (annotation.events.hasOwnProperty('mouseLeave')) {
                if (typeof annotation.events.mouseLeave === 'function') {
                    xLine.label.mouseLeave = function() {
                        annotation.events.mouseLeave(annotation);
                    }

                } else if (typeof annotation.events.mouseLeave === 'string') {
                    let func = coreuiChartUtils.getFunctionByName(annotation.events.mouseLeave);
                    if (typeof func === 'function') {
                        xLine.label.mouseLeave = function() {
                            func(annotation);
                        }
                    }
                }
            }

            if (annotation.events.hasOwnProperty('click')) {
                if (typeof annotation.events.click === 'function') {
                    xLine.label.click = function() {
                        annotation.events.click(annotation);
                    }

                } else if (typeof annotation.events.click === 'string') {
                    let func = coreuiChartUtils.getFunctionByName(annotation.events.click);
                    if (typeof func === 'function') {
                        xLine.label.click = function() {
                            func(annotation);
                        }
                    }
                }
            }
        }

        // Annotation style
        if (annotation.hasOwnProperty('style') && coreuiChartUtils.isObject(annotation.style)) {
            if (annotation.style.hasOwnProperty('fillColor') && typeof annotation.style.fillColor === 'string') {
                xLine.fillColor = annotation.style.fillColor;
            }

            if (annotation.style.hasOwnProperty('borderColor') && typeof annotation.style.borderColor === 'string') {
                xLine.borderColor = annotation.style.borderColor;
            }

            if (annotation.style.hasOwnProperty('opacity') && typeof annotation.style.opacity === 'number') {
                if (annotation.style.opacity < 0) {
                    annotation.style.opacity = 0;

                } else if (annotation.style.opacity > 10) {
                    annotation.style.opacity = 10;
                }

                xLine.opacity = annotation.style.opacity;
            }

            if (annotation.style.hasOwnProperty('dash') && typeof annotation.style.dash === 'number') {
                if (annotation.style.dash < 0) {
                    annotation.style.dash = 0;

                } else if (annotation.style.dash > 100) {
                    annotation.style.dash = 100;
                }

                xLine.strokeDashArray = annotation.style.dash;
            }


            // Label style
            if (annotation.style.hasOwnProperty('label') && coreuiChartUtils.isObject(annotation.style.label)) {
                if (annotation.style.label.hasOwnProperty('color') && typeof annotation.style.label.color === 'string') {
                    xLine.label.style.color = annotation.style.label.color;
                }

                if (annotation.style.label.hasOwnProperty('background') && typeof annotation.style.label.background === 'string') {
                    xLine.label.style.background = annotation.style.label.background;
                }

                if (annotation.style.label.hasOwnProperty('borderColor') && typeof annotation.style.label.borderColor === 'string') {
                    xLine.label.borderColor = annotation.style.label.borderColor;
                }

                if (annotation.style.label.hasOwnProperty('borderWidth') && typeof annotation.style.label.borderWidth === 'number') {
                    if (annotation.style.label.borderWidth < 0) {
                        annotation.style.label.borderWidth = 0;

                    } else if (annotation.style.label.borderWidth > 10) {
                        annotation.style.label.borderWidth = 10;
                    }

                    xLine.label.borderWidth = annotation.style.label.borderWidth;
                }

                if (annotation.style.label.hasOwnProperty('align') && typeof annotation.style.label.align === 'string') {
                    xLine.label.position = annotation.style.label.align;
                }

                if (annotation.style.label.hasOwnProperty('orientation') && typeof annotation.style.label.orientation === 'string') {
                    xLine.label.orientation = annotation.style.label.orientation;
                }

                if (annotation.style.label.hasOwnProperty('offsetY') && typeof annotation.style.label.offsetY === 'number') {
                    xLine.label.offsetY = annotation.style.label.offsetY;
                }

                if (annotation.style.label.hasOwnProperty('offsetX') && typeof annotation.style.label.offsetX === 'number') {
                    xLine.label.offsetX = annotation.style.label.offsetX;
                }
            }
        }

        return xLine;
    },


    /**
     *
     * @param annotation
     * @private
     */
    _getAnnotationsPoint: function (annotation) {

        let point = {
            marker: {},
            label: {
                style: {}
            },
            image: {}
        };

        point.x = annotation.x;
        point.y = annotation.y;


        if (annotation.hasOwnProperty('id')) {
            point.id = annotation.id;
        }

        if (annotation.hasOwnProperty('text') && typeof annotation.text === 'string') {
            point.label.text = annotation.text;
        }

        // Events
        if (annotation.hasOwnProperty('events') && coreuiChartUtils.isObject(annotation.events)) {
            if (annotation.events.hasOwnProperty('mouseEnter')) {
                if (typeof annotation.events.mouseEnter === 'function') {
                    point.mouseEnter = function() {
                        annotation.events.mouseEnter(annotation);
                    }

                } else if (typeof annotation.events.mouseEnter === 'string') {
                    let func = coreuiChartUtils.getFunctionByName(annotation.events.mouseEnter);
                    if (typeof func === 'function') {
                        point.mouseEnter = function() {
                            func(annotation);
                        }
                    }
                }
            }

            if (annotation.events.hasOwnProperty('mouseLeave')) {
                if (typeof annotation.events.mouseLeave === 'function') {
                    point.mouseLeave = function() {
                        annotation.events.mouseLeave(annotation);
                    }

                } else if (typeof annotation.events.mouseLeave === 'string') {
                    let func = coreuiChartUtils.getFunctionByName(annotation.events.mouseLeave);
                    if (typeof func === 'function') {
                        point.mouseLeave = function() {
                            func(annotation);
                        }
                    }
                }
            }

            if (annotation.events.hasOwnProperty('click')) {
                if (typeof annotation.events.click === 'function') {
                    point.click = function() {
                        annotation.events.click(annotation);
                    }

                } else if (typeof annotation.events.click === 'string') {
                    let func = coreuiChartUtils.getFunctionByName(annotation.events.click);
                    if (typeof func === 'function') {
                        point.click = function() {
                            func(annotation);
                        }
                    }
                }
            }
        }

        // Annotation style
        if (annotation.hasOwnProperty('style') && coreuiChartUtils.isObject(annotation.style)) {
            if (annotation.style.hasOwnProperty('fillColor') && typeof annotation.style.fillColor === 'string') {
                point.marker.fillColor = annotation.style.fillColor;
            }

            if (annotation.style.hasOwnProperty('borderColor') && typeof annotation.style.borderColor === 'string') {
                point.marker.strokeColor = annotation.style.borderColor;
            }

            if (annotation.style.hasOwnProperty('imagePath') && typeof annotation.style.imagePath === 'string') {
                point.image.path = annotation.style.imagePath;
            }

            if (annotation.style.hasOwnProperty('borderWidth') && typeof annotation.style.borderWidth === 'number') {
                if (annotation.style.borderWidth < 0) {
                    annotation.style.borderWidth = 0;

                } else if (annotation.style.borderWidth > 10) {
                    annotation.style.borderWidth = 10;
                }

                point.marker.strokeWidth = annotation.style.borderWidth;
            }

            if (annotation.style.hasOwnProperty('size') && typeof annotation.style.size === 'number') {
                if (annotation.style.size < 0) {
                    annotation.style.size = 0;

                } else if (annotation.style.size > 100) {
                    annotation.style.size = 100;
                }

                point.marker.size = annotation.style.size;
            }


            // Label style
            if (annotation.style.hasOwnProperty('label') && coreuiChartUtils.isObject(annotation.style.label)) {
                if (annotation.style.label.hasOwnProperty('color') && typeof annotation.style.label.color === 'string') {
                    point.label.style.color = annotation.style.label.color;
                }

                if (annotation.style.label.hasOwnProperty('background') && typeof annotation.style.label.background === 'string') {
                    point.label.style.background = annotation.style.label.background;
                }

                if (annotation.style.label.hasOwnProperty('borderColor') && typeof annotation.style.label.borderColor === 'string') {
                    point.label.borderColor = annotation.style.label.borderColor;
                }

                if (annotation.style.label.hasOwnProperty('borderWidth') && typeof annotation.style.label.borderWidth === 'number') {
                    if (annotation.style.label.borderWidth < 0) {
                        annotation.style.label.borderWidth = 0;

                    } else if (annotation.style.label.borderWidth > 10) {
                        annotation.style.label.borderWidth = 10;
                    }

                    point.label.borderWidth = annotation.style.label.borderWidth;
                }

                if (annotation.style.label.hasOwnProperty('offsetY') && typeof annotation.style.label.offsetY === 'number') {
                    point.label.offsetY = annotation.style.label.offsetY;
                }

                if (annotation.style.label.hasOwnProperty('offsetX') && typeof annotation.style.label.offsetX === 'number') {
                    point.label.offsetX = annotation.style.label.offsetX;
                }
            }
        }

        return point
    }
}