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
const supertest = require("supertest");
const index_1 = require("../index");
const fs_1 = require("fs");
const path = require("path");
const utils_1 = require("../utils");
const request = supertest(index_1.default);
const inputTestFileName = {
    valid: 'fjord',
    invalid: 'test'
};
const testResolution = {
    valid: {
        width: 199,
        height: 199
    },
    invalid: {
        width: -200,
        height: 0
    }
};
const testResizeQueryParameters = {
    valid: `filename=${inputTestFileName}&width=${testResolution.valid.width}&height=${testResolution.valid.height}`,
    invalid: `filename=${inputTestFileName}&width=${testResolution.invalid.width}&height=${testResolution.invalid.height}`
};
const resultTestFileName = `${inputTestFileName}_${testResolution.valid.width}x${testResolution.valid.height}.png`;
const testInvalidEndpoint = 'test';
describe('Endpoints test reponses: ', () => {
    describe('endpoint: /', () => {
        it('gets /', () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield request.get('/');
            expect(response.status).toBe(200);
        }));
    });
    describe('endpoint: /api/images', () => {
        it(`gets /api/images?filename=${inputTestFileName} (valid args)`, () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield request.get(`/api/images?filename=${inputTestFileName}`);
            expect(response.status).toBe(200);
        }));
        it(`gets /api/images?${testResizeQueryParameters.valid} (valid args)`, () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield request.get(`/api/images?${testResizeQueryParameters.valid}`);
            expect(response.status).toBe(200);
        }));
        it(`gets /api/images?${testResizeQueryParameters.invalid} (invalid args)`, () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield request.get(`/api/images?${testResizeQueryParameters.invalid}`);
            expect(response.status).toBe(200);
        }));
        it('gets /api/images (no arguments)', () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield request.get('/api/images');
            expect(response.status).toBe(200);
        }));
    });
    describe(`endpoint: /${testInvalidEndpoint}`, () => {
        it('returns 404 for invalid endpoint', () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield request.get(`/${testInvalidEndpoint}`);
            expect(response.status).toBe(404);
        }));
    });
});
afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
    const resizedImagePath = path.resolve(utils_1.scaledImagesPath, resultTestFileName);
    try {
        yield fs_1.promises.access(resizedImagePath);
        fs_1.promises.unlink(resizedImagePath);
    }
    catch (err) {
        throw new Error(err);
    }
}));
//# sourceMappingURL=indexSpec.js.map