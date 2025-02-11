
let ChartUtils = {


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

export default ChartUtils;