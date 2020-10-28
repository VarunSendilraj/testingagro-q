"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const dbCode_1 = require("./dbCode");
class App {
    constructor() {
        this.express = express_1.default();
        this.express.use(morgan_1.default('combined'));
        this.mountRoutes();
        this.db = new dbCode_1.DBInteraction();
        console.log('APP Constructor called');
    }
    mountRoutes() {
        console.log('router called');
        const router = express_1.default.Router();
        router.get('/test', function (req, res) {
            res.send('router works');
        });
        // define the about route
        router.get('/sendData/:temp,:Ph,:light,:co2,:waterTemp,:humidity', (req, res) => __awaiter(this, void 0, void 0, function* () { yield this.sendData(req, res); }));
        router.get('/getData', (req, res) => __awaiter(this, void 0, void 0, function* () {
            res.send(yield this.db.getCurrentData('lambert'));
        }));
        router.get('/getHistory', (req, res) => __awaiter(this, void 0, void 0, function* () {
            console.log('history called');
            var coll = yield this.db.getHistoricalData('lambert');
            res.send(coll);
        }));
        this.express.use(router);
    }
    sendData(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var hsystem = {
                Temp: parseFloat(req.params["temp"]),
                Ph: parseFloat(req.params["Ph"]),
                location: 'lambert',
                light: parseFloat(req.params["light"]),
                co2: parseFloat(req.params["co2"]),
                longitude: -84.137916,
                lattitude: 34.105793,
                waterTemp: parseFloat(req.params["waterTemp"]),
                humidity: parseFloat(req.params["humidity"]),
                time: new Date()
            };
            yield this.db.pushData(hsystem, hsystem.location);
            res.send('dataSend');
        });
    }
}
exports.default = new App().express;
//# sourceMappingURL=App.js.map