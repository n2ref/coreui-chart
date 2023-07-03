
var CoreUI = typeof CoreUI !== 'undefined' ? CoreUI : {};

CoreUI.chart = {

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
        let instance = $.extend(true, {}, this.instance);
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

        if ($('#coreui-chart-' + this._instances[id])[0]) {
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

        CoreUI.chart._settings = $.extend({}, this._settings, settings);
    },


    /**
     * Получение значения настройки
     * @param {string} name
     */
    getSetting: function(name) {

        let value = null;

        if (CoreUI.chart._settings.hasOwnProperty(name)) {
            value = CoreUI.chart._settings[name];
        }

        return value;
    }
}