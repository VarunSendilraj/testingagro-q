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
exports.DBInteraction = exports.iotData = void 0;
const firebase_config_1 = __importDefault(require("./firebase_config"));
class iotData {
}
exports.iotData = iotData;
class DBInteraction {
    pushData(data, systemName) {
        return __awaiter(this, void 0, void 0, function* () {
            const docRef = firebase_config_1.default.collection('hydroSystem').doc(systemName);
            console.log("pushing data");
            var collName = data.time.getFullYear() + '-' + data.time.getMonth() + 1 + '-' + data.time.getDate();
            yield docRef.set(data);
            const hisSystem = firebase_config_1.default.collection('historySystem').doc(systemName).collection(collName);
            data.id = "1";
            yield hisSystem.add(data);
        });
    }
    getCurrentData(systemName) {
        return __awaiter(this, void 0, void 0, function* () {
            var docRef = firebase_config_1.default.collection('hydroSystem').doc(systemName);
            // Attach an asynchronous callback to read the data at our posts reference
            var val = yield docRef.get();
            console.log(val.data());
            return val.data();
        });
    }
    getHistoricalData(systemName) {
        return __awaiter(this, void 0, void 0, function* () {
            // var docRef:firebasedb.Reference = db.ref("hydroSystem/lambert");
            var docRef = firebase_config_1.default.collection('historySystem').doc('lambert');
            // Attach an asynchronous callback to read the data at our posts reference
            var lst = yield docRef.listCollections();
            let arData = [];
            for (let dt of lst) {
                var subColl = yield dt.get();
                subColl.docs.forEach(doc => arData.push(doc.data()));
            }
            return arData;
        });
    }
}
exports.DBInteraction = DBInteraction;
//# sourceMappingURL=dbCode.js.map