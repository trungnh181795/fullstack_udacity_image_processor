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
const utils_1 = require("../utils");
const constants_1 = require("../constants");
const types_1 = require("../types");
const imagesRoutes = express.Router();
imagesRoutes.get('/', (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const validateRes = yield (0, utils_1.validateFile)(request.query);
    if (validateRes.status === types_1.Status.FAIL) {
        response.send(validateRes.message);
        return;
    }
    console.log('got here');
    const hasAvailableScaledImage = yield (0, utils_1.isScaledImageAvailable)(request.query);
    let createRes;
    console.log('got here 1');
    if (!hasAvailableScaledImage) {
        createRes = yield (0, utils_1.createScaledImage)(request.query);
    }
    if (createRes.status === types_1.Status.FAIL) {
        response.send(createRes.message);
        return;
    }
    const path = yield (0, utils_1.getImagePath)(request.query);
    if (path) {
        response.sendFile(path);
    }
    else {
        response.send(constants_1.messages.invalidPath);
    }
}));
exports.default = imagesRoutes;
//# sourceMappingURL=images.js.map