
let coreuiChartUtils = {

    /**
     * Получение значения поля
     * @param {CoreUI.chart.instance} chart
     * @param {object}               fieldOptions
     * @returns {string|number|null}
     */
    getFieldValue: function (chart, fieldOptions) {

        let chartRecord = chart.getRecord();

        if (fieldOptions &&
            chartRecord &&
            typeof fieldOptions.name === 'string' &&
            typeof chartRecord === 'object' &&
            chartRecord.hasOwnProperty(fieldOptions.name) &&
            ['string', 'number', 'object'].indexOf(typeof chartRecord[fieldOptions.name]) >= 0
        ) {
            return chartRecord[fieldOptions.name];
        }

        return '';
    },


    /**
     * Получение функции из указанного текста
     * @param functionName
     * @param context
     * @returns {null|Window}
     * @private
     */
    getFunctionByName: function(functionName, context) {

        let namespaces = functionName.split(".");
        let func       = namespaces.pop();

        context = context || window;

        for (let i = 0; i < namespaces.length; i++) {
            if (context.hasOwnProperty(namespaces[i])) {
                context = context[namespaces[i]];
            } else {
                return null;
            }
        }

        if (typeof context[func] === 'function') {
            return context[func];
        }

        return null;
    },


    /**
     * Обработка полей в полях
     * @param chart
     * @param defaultOptions
     * @param fieldOptions
     */
    mergeFieldOptions: function (chart, defaultOptions, fieldOptions) {

        let options = $.extend(true, {}, defaultOptions);

        if (fieldOptions) {
            if (options.hasOwnProperty('attr') && typeof options.attr === 'object' &&
                fieldOptions.hasOwnProperty('attr') && typeof fieldOptions.attr === 'object'
            ) {
                fieldOptions.attr = this.mergeAttr(options.attr, fieldOptions.attr);
            }

            options = $.extend(true, {}, options, fieldOptions);
        }

        if (options.hasOwnProperty('width')) {
            if (options.width) {
                let unit = typeof options.width === 'number' ? 'px' : '';
                options.width = options.width + unit;

            } else if (chart._options.fieldWidth && options.type !== 'color') {
                let unit = typeof chart._options.fieldWidth === 'number' ? 'px' : '';
                options.width = chart._options.fieldWidth + unit;
            }
        }

        if (options.hasOwnProperty('labelWidth')) {
            if (options.labelWidth >= 0 && options.labelWidth !== null) {
                let unit = typeof options.labelWidth === 'number' ? 'px' : '';
                options.labelWidth = options.labelWidth + unit;

            } else if (chart._options.labelWidth) {
                let unit = typeof chart._options.labelWidth === 'number' ? 'px' : '';
                options.labelWidth = chart._options.labelWidth + unit;
            }
        }

        return options
    },


    /**
     * Объединение атрибутов
     * @param attr1
     * @param attr2
     * @returns {object}
     */
    mergeAttr: function (attr1, attr2) {

        let mergeAttr = Object.assign({}, attr1);

        if (typeof attr2 === 'object') {
            $.each(attr2, function (name, value) {
                if (mergeAttr.hasOwnProperty(name)) {
                    if (name === 'class') {
                        mergeAttr[name] += ' ' + value;

                    } else if (name === 'style') {
                        mergeAttr[name] += ';' + value;

                    } else {
                        mergeAttr[name] = value;
                    }

                } else {
                    mergeAttr[name] = value;
                }
            });
        }

        return mergeAttr;
    },


    /**
     * Инициализация и рендер дополнительных полей
     * @param {CoreUI.chart.instance} chart
     * @param {object}               options
     * @returns {object}
     * @private
     */
    getAttacheFields: function(chart, options) {

        let fields = [];

        if (typeof options === 'object' &&
            typeof(options.fields) === 'object' &&
            Array.isArray(options.fields)
        ) {
            $.each(options.fields, function (key, field) {
                let instance = chart.initField(field);

                if (typeof instance !== 'object') {
                    return;
                }

                fields.push({
                    hash: instance._hash,
                    direction: options.hasOwnProperty('fieldsDirection') ? options.fieldsDirection : 'row',
                    content: instance.renderContent()
                });
            });
        }

        return fields;
    },


    /**
     * Форматирование даты
     * @param {string} value
     * @return {string}
     */
    chartatDate: function (value) {

        if (value && value.length === 10) {
            let date  = new Date(value);
            let year  = date.getFullYear();
            let month = date.getMonth() + 1;
            let day   = date.getDate();

            day   = day < 10 ? '0' + day : day;
            month = month < 10 ? '0' + month : month;

            value = day + '.' + month + '.' + year;
        }

        return value;
    },


    /**
     * Форматирование даты со временем
     * @param {string} value
     * @return {string}
     */
    chartatDateTime: function (value) {

        if (value && value.length >= 10) {
            let date  = new Date(value);
            let year  = date.getFullYear();
            let month = date.getMonth() + 1;
            let day   = date.getDate();
            let hour  = ("00" + date.getHours()).slice(-2);
            let min   = ("00" + date.getMinutes()).slice(-2);
            let sec   = ("00" + date.getSeconds()).slice(-2);

            day   = day < 10 ? '0' + day : day;
            month = month < 10 ? '0' + month : month;

            value = day + '.' + month + '.' + year + ' ' + hour + ':' + min + ':' + sec;
        }

        return value;
    },


    /**
     * Форматирование даты со временем
     * @param {string} value
     * @param {object} lang
     * @return {string}
     */
    chartatDateMonth: function (value, lang) {

        if (value && value.length === 7) {
            let date  = new Date(value);
            let year  = date.getFullYear();
            let month = date.getMonth();

            let monthLang = lang.date_months.hasOwnProperty(month) ? lang.date_months[month] : '';

            value = monthLang + ' ' + year;
        }

        return value;
    },


    /**
     * Форматирование даты со временем
     * @param {string} value
     * @param {object} lang
     * @return {string}
     */
    chartatDateWeek: function (value, lang) {

        if (value && value.length >= 7) {
            let year = value.substring(0, 4);
            let week = value.substring(6);

            value = year + ' ' + lang.date_week + ' ' + week;
        }

        return value;
    },


    /**
     * Проверка на число
     * @param num
     * @returns {boolean}
     * @private
     */
    isNumeric: function(num) {
        return (typeof(num) === 'number' || typeof(num) === "string" && num.trim() !== '') && ! isNaN(num);
    },


    /**
     * Проверка на объект
     * @param value
     */
    isObject: function (value) {

        return typeof value === 'object' &&
               ! Array.isArray(value) &&
               value !== null;
    },


    /**
     * Проверка на массив
     * @param value
     */
    isArray: function (value) {

        return Array.isArray(value);
    },


    /**
     * @returns {string}
     * @private
     */
    hashCode: function() {
        return this.crc32((new Date().getTime() + Math.random()).toString()).toString(16);
    },


    /**
     * Hash crc32
     * @param str
     * @returns {number}
     * @private
     */
    crc32: function (str) {

        for (var a, o = [], c = 0; c < 256; c++) {
            a = c;
            for (var f = 0; f < 8; f++) {
                a = 1 & a ? 3988292384 ^ a >>> 1 : a >>> 1
            }
            o[c] = a
        }

        for (var n = -1, t = 0; t < str.length; t++) {
            n = n >>> 8 ^ o[255 & (n ^ str.charCodeAt(t))]
        }

        return (-1 ^ n) >>> 0;
    },


    /**
     * Округление
     * @param number
     * @param precision
     * @returns {number}
     */
    round: function (number, precision) {

        precision = typeof precision !== 'undefined' ? parseInt(precision) : 0;

        if (precision === 0) {
            return Math.round(number);

        } else if (precision > 0) {
            let pow = Math.pow(10, precision);
            return Math.round(number * pow) / pow;

        } else {
            let pow = Math.pow(10, precision);
            return Math.round(number / pow) * pow;
        }
    },


    /**
     * Палитра
     * @return {string[]}
     */
    getPaletteClassic: function () {

        return [
            '#7EB26D', '#EAB839', '#6ED0E0', '#EF843C', '#E24D42', '#1F78C1', '#BA43A9', '#705DA0', '#508642',
            '#CCA300', '#447EBC', '#C15C17', '#890F02', '#0A437C', '#6D1F62', '#584477', '#B7DBAB', '#F4D598',
            '#70DBED', '#F9BA8F', '#F29191', '#82B5D8', '#E5A8E2', '#AEA2E0', '#629E51', '#E5AC0E', '#64B0C8',
            '#E0752D', '#BF1B00', '#0A50A1', '#962D82', '#614D93', '#9AC48A', '#F2C96D', '#65C5DB', '#F9934E',
            '#EA6460', '#5195CE', '#D683CE', '#806EB7', '#3F6833', '#967302', '#2F575E', '#99440A', '#58140C',
            '#052B51', '#511749', '#3F2B5B', '#E0F9D7', '#FCEACA', '#CFFAFF', '#F9E2D2', '#FCE2DE', '#BADFF4',
            '#F9D9F9', '#DEDAF7',
        ]
    }
}

export default coreuiChartUtils;