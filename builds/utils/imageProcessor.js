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
exports.processImage = void 0;
const sharp = require("sharp");
const types_1 = require("../types");
const constants_1 = require("../constants");
const processImage = ({ src, width, height, target }) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield sharp(src).resize(width, height).toFormat('png').toFile(target);
        return {
            status: types_1.Status.SUCCESS,
            message: constants_1.messages.processImageSuccess
        };
    }
    catch (error) {
        return {
            status: types_1.Status.FAIL,
            message: constants_1.messages.processImageError
        };
    }
});
exports.processImage = processImage;
//# sourceMappingURL=imageProcessor.js.map