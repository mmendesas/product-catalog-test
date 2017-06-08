var storage = {

    storage: '-',

    getStorage: function () {
        return this.storage;
    },

    setStorage: function (storage) {
        this.storage = storage;
    },

    display: function () {
        console.log('Storage used: ' + this.storage);
    }
}

module.exports = storage;