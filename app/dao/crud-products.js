module.exports = class CrudProducts {

    setStrategy(strategy) {
        this.strategy = strategy;
    }

    list(req, res) {
        this.strategy.list(req, res);
        //return this;
    };

    findById(req, res) {
        this.strategy.findById(req, res);
    };

    removeById(req, res) {
        this.strategy.removeById(req, res);
    };

    add(req, res) {
        this.strategy.add(req, res);
    };

    update(req, res) {
        this.strategy.update(req, res);
    };
}