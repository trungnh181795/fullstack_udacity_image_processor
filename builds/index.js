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
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const utils_1 = require("./utils");
const routes_1 = require("./routes");
const app = express();
const port = 8000;
app.use(routes_1.default);
app.listen(port, () => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, utils_1.createScaledImagePath)();
    const url = `http://localhost:${port}`;
    console.log(`Server running on port ${port}.\n URL: ${url}`);
}));
exports.default = app;
//# sourceMappingURL=index.js.map