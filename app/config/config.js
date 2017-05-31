var Config = {
    setStorage = function (storage) {
        this.storage = storage;
    },

    display: function () {
        console.log('Storage used: ' + this.storage);
    }
}

module.exports = Config;