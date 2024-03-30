
import coreuiChartInstance from './coreui.chart.instance';

let coreuiChart = {

    lang: {},
    type: {},

    _instances: {},
    _settings: {
        lang: 'en',
    },


    /**
     * Создание экземпляра формы
     * @param {object} options
     * @returns {CoreUI.chart.instance}
     */
    create: function (options) {
        let instance = $.extend(true, {}, coreuiChartInstance);

        if ( ! options.hasOwnProperty('lang')) {
            options.lang = coreuiChart.getSetting('lang');
        }

        instance._init(options instanceof Object ? options : {});

        let chartId = instance.getId();
        this._instances[chartId] = instance;

        return instance;
    },


    /**
     * Получение экземпляра формы по id
     * @param {string} id
     * @returns {CoreUI.chart.instance|null}
     */
    get: function (id) {

        if ( ! this._instances.hasOwnProperty(id)) {
            return null;
        }

        if ($('#coreui-chart-' + id)[0]) {
            delete this._instances[id];
            return null;
        }

        return this._instances[id];
    },


    /**
     * Установка настроек
     * @param {object} settings
     */
    setSettings: function(settings) {

        this._settings = $.extend({}, this._settings, settings);
    },


    /**
     * Получение значения настройки
     * @param {string} name
     */
    getSetting: function(name) {

        let value = null;

        if (this._settings.hasOwnProperty(name)) {
            value = this._settings[name];
        }

        return value;
    }
}


export default coreuiChart;