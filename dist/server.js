"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const App_1 = __importDefault(require("./page/App"));
const express_1 = __importDefault(require("express"));
const port = process.env.PORT || 3000;
App_1.default.use(express_1.default.static('public'));
App_1.default.use(function (req, res, next) {
    return res.status(404).send({ message: 'Route' + req.url + ' Not found.' });
});
App_1.default.use(function (err, req, res, next) {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});
App_1.default.listen(port, (err) => {
    if (err) {
        return console.log(err);
    }
    return console.log(`server is listening on ${port}`);
});
//# sourceMappingURL=server.js.map