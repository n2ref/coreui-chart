
import ChartInstance from './chart.instance';
import ChartUtils    from './chart.utils';

let Chart = {

    lang: {},
    type: {},

    _instances: {},
    _settings: {
        lang: 'en',
    },


    /**
     * Создание экземпляра формы
     * @param {object} options
     * @returns {ChartInstance}
     */
    create: function (options) {

        if ( ! options.hasOwnProperty('lang')) {
            options.lang = Chart.getSetting('lang');
        }

        let langList     = this.lang.hasOwnProperty(options.lang) ? this.lang[options.lang] : {};
        options.langList = options.hasOwnProperty('langList') && ChartUtils.isObject(options.langList)
            ? $.extend(true, {}, langList, options.langList)
            : langList;

        let instance = new ChartInstance(this, options instanceof Object ? options : {});

        let chartId = instance.getId();
        this._instances[chartId] = instance;

        return instance;
    },


    /**
     * Получение экземпляра формы по id
     * @param {string} id
     * @returns {ChartInstance|null}
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


export default Chart;