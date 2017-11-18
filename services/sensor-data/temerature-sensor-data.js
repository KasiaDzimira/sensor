class TemperatureSensorData {
    constructor() {
        this.data = {
            id: '',
            value: '',
            createdAt: Date.now()
        };
    }

    getData() {
        return this.data;
    }

    setData(data) {
        this.data = data;
    }
}

module.exports = new TemperatureSensorData();