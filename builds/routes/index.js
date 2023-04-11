"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const images_1 = require("./images");
const routes = express.Router();
routes.use('/api/images', images_1.default);
routes.get('/', (response) => {
    response.send('Hello World');
});
exports.default = routes;
//# sourceMappingURL=index.js.map