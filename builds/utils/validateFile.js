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
exports.validateFile = void 0;
const constants_1 = require("../constants");
const types_1 = require("../types");
const fileExecutors_1 = require("./fileExecutors");
const validateFile = ({ filename, width, height }) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('filename', filename);
    const isValidImage = yield (0, fileExecutors_1.isImageValid)(filename);
    if (!isValidImage) {
        const validImageNames = yield (0, fileExecutors_1.getImageNames)();
        return {
            status: types_1.Status.FAIL,
            message: `${constants_1.messages.noValidFile}: ${validImageNames.join(', ')}.`
        };
    }
    if (!width && !height) {
        return {
            status: types_1.Status.FAIL,
            message: constants_1.messages.missingWidthAndHeight
        };
    }
    const inputWidth = parseInt(width || '');
    if (Number.isNaN(inputWidth) || inputWidth < 1) {
        return {
            status: types_1.Status.FAIL,
            message: constants_1.messages.invalidWidth
        };
    }
    const inputHeight = parseInt(height || '');
    if (Number.isNaN(inputHeight) || inputHeight < 1) {
        return {
            status: types_1.Status.FAIL,
            message: constants_1.messages.invalidHeight
        };
    }
    return {
        status: types_1.Status.SUCCESS,
        message: constants_1.messages.validateSuccess
    };
});
exports.validateFile = validateFile;
//# sourceMappingURL=validateFile.js.map