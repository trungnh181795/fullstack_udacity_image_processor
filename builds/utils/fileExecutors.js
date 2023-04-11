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
exports.createScaledImage = exports.createScaledImagePath = exports.isScaledImageAvailable = exports.isImageValid = exports.getImagePath = exports.getImageNames = exports.scaledImagesPath = exports.fullImagesPath = void 0;
const fs_1 = require("fs");
const path = require("path");
const imageProcessor_1 = require("./imageProcessor");
const constants_1 = require("../constants");
const types_1 = require("../types");
exports.fullImagesPath = path.resolve(__dirname, '../assets/full');
exports.scaledImagesPath = path.resolve(__dirname, '../assets/scaled');
const getImageNames = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const imagefilenames = yield fs_1.promises.readdir(exports.fullImagesPath);
        const imageNames = imagefilenames.map(filename => filename.split('.')[0]);
        return imageNames;
    }
    catch (err) {
        return [];
    }
});
exports.getImageNames = getImageNames;
const getImagePath = ({ filename, width, height }) => __awaiter(void 0, void 0, void 0, function* () {
    if (!filename) {
        return null;
    }
    try {
        const filePath = width && height
            ? path.resolve(exports.scaledImagesPath, `${filename}_${width}x${height}.png`)
            : path.resolve(exports.fullImagesPath, `${filename}.jpg`);
        yield fs_1.promises.access(filePath);
        return filePath;
    }
    catch (err) {
        return null;
    }
});
exports.getImagePath = getImagePath;
const isImageValid = (filename = '') => __awaiter(void 0, void 0, void 0, function* () {
    if (!filename) {
        return false;
    }
    const imageNames = yield (0, exports.getImageNames)();
    return imageNames.includes(filename);
});
exports.isImageValid = isImageValid;
const isScaledImageAvailable = ({ filename, width, height }) => __awaiter(void 0, void 0, void 0, function* () {
    if (!filename || !width || !height) {
        return false;
    }
    try {
        const filePath = path.resolve(exports.scaledImagesPath, `${filename}_${width}x${height}.png`);
        yield fs_1.promises.access(filePath);
        return true;
    }
    catch (err) {
        return false;
    }
});
exports.isScaledImageAvailable = isScaledImageAvailable;
const createScaledImagePath = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield fs_1.promises.access(exports.scaledImagesPath);
    }
    catch (_a) {
        fs_1.promises.mkdir(exports.scaledImagesPath);
    }
});
exports.createScaledImagePath = createScaledImagePath;
const createScaledImage = ({ filename, width, height }) => __awaiter(void 0, void 0, void 0, function* () {
    if (!filename || !width || !height) {
        return {
            status: types_1.Status.FAIL,
            message: constants_1.messages.invalidParams
        };
    }
    const fullImagePath = path.resolve(exports.fullImagesPath, `${filename}.jpg`);
    const scaledImagePath = path.resolve(exports.scaledImagesPath, `${filename}_${width}x${height}.png`);
    console.log(`${constants_1.messages.creatingScaledImage}: ${scaledImagePath}`);
    return yield (0, imageProcessor_1.processImage)({
        src: fullImagePath,
        target: scaledImagePath,
        width: parseInt(width),
        height: parseInt(height)
    });
});
exports.createScaledImage = createScaledImage;
//# sourceMappingURL=fileExecutors.js.map