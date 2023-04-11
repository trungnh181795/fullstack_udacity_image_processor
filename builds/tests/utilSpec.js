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
const fs_1 = require("fs");
const path = require("path");
const utils_1 = require("../utils");
const types_1 = require("../types");
describe('Test image processing via sharp', () => {
    it('raises an error (invalid width value)', () => __awaiter(void 0, void 0, void 0, function* () {
        const { status } = yield (0, utils_1.createScaledImage)({
            filename: 'foo',
            width: '-100',
            height: '500'
        });
        expect(status).toBe(types_1.Status.FAIL);
    }));
    it('raises an error (filename does not exist)', () => __awaiter(void 0, void 0, void 0, function* () {
        const { status } = yield (0, utils_1.createScaledImage)({
            filename: 'foo',
            width: '100',
            height: '500'
        });
        expect(status).toBe(types_1.Status.SUCCESS);
    }));
    it('succeeds to write resized thumb file (existing file, valid size values)', () => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, utils_1.createScaledImage)({
            filename: 'fjord',
            width: '99',
            height: '99'
        });
        const resizedImagePath = path.resolve(utils_1.scaledImagesPath, `fjord-99x99.jpg`);
        let errorFile = '';
        try {
            yield fs_1.promises.access(resizedImagePath);
            errorFile = null;
        }
        catch (_a) {
            errorFile = 'File was not created';
        }
        expect(errorFile).toBeNull();
    }));
});
afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
    const resizedImagePath = path.resolve(utils_1.scaledImagesPath, 'fjord-99x99.jpg');
    yield fs_1.promises.access(resizedImagePath);
    fs_1.promises.unlink(resizedImagePath);
}));
//# sourceMappingURL=utilSpec.js.map