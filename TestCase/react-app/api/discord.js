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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var firestore_1 = require("./firestore");
var express = require('express');
var fetch = require('node-fetch');
var URLSearchParams = require("url").URLSearchParams;
require('dotenv').config({ path: __dirname + '/./../.env' });
var catchAsync = require('../utils').catchAsync;
var router = express.Router();
var CLIENT_ID = process.env.CLIENT_ID;
var CLIENT_SECRET = process.env.CLIENT_SECRET;
var redirect = 'http://localhost:3000/api/discord/callback';
var accessToken;
var refreshToken;
var tokenExpiration;
var refresh = function () { return __awaiter(void 0, void 0, void 0, function () {
    var params, response, json;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                params = new URLSearchParams();
                params.append('client_id', CLIENT_ID);
                params.append('client_secret', CLIENT_SECRET);
                params.append('grant_type', 'refresh_token');
                params.append('refresh_token', refreshToken);
                return [4 /*yield*/, fetch("https://discord.com/api/oauth2/token", {
                        method: 'POST',
                        body: params
                    })];
            case 1:
                response = _a.sent();
                return [4 /*yield*/, response.json()];
            case 2:
                json = _a.sent();
                accessToken = json.access_token;
                refreshToken = json.refresh_token;
                tokenExpiration = Date.now(); // + json.expires_in
                return [2 /*return*/];
        }
    });
}); };
var validate = function () { return __awaiter(void 0, void 0, void 0, function () {
    var response;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!tokenExpiration) return [3 /*break*/, 2];
                if (!(tokenExpiration <= Date.now())) return [3 /*break*/, 2];
                return [4 /*yield*/, refresh()];
            case 1:
                response = _a.sent();
                return [2 /*return*/, true];
            case 2: return [2 /*return*/, false];
        }
    });
}); };
var getUser = function () { return __awaiter(void 0, void 0, void 0, function () {
    var hasToken, response;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, validate()];
            case 1:
                hasToken = _a.sent();
                if (!hasToken) return [3 /*break*/, 4];
                return [4 /*yield*/, fetch("http://discordapp.com/api/users/@me", {
                        method: "GET",
                        headers: {
                            'Authorization': "Bearer ".concat(accessToken)
                        }
                    })];
            case 2:
                response = _a.sent();
                return [4 /*yield*/, response.json()];
            case 3: return [2 /*return*/, _a.sent()];
            case 4: return [2 /*return*/, undefined];
        }
    });
}); };
router.get('/login', function (req, res) {
    res.redirect("https://discordapp.com/api/oauth2/authorize?client_id=".concat(CLIENT_ID, "&scope=identify&response_type=code&redirect_uri=").concat(redirect));
});
router.get('/callback', catchAsync(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var code, creds, params, response, json, user;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!req.query.code)
                    throw new Error('NoCodeProvided');
                code = req.query.code;
                creds = btoa("".concat(CLIENT_ID, ":").concat(CLIENT_SECRET));
                params = new URLSearchParams();
                params.append('client_id', CLIENT_ID);
                params.append('client_secret', CLIENT_SECRET);
                params.append('grant_type', 'authorization_code');
                params.append('code', code);
                params.append('redirect_uri', redirect);
                return [4 /*yield*/, fetch("https://discord.com/api/oauth2/token", {
                        method: 'POST',
                        headers: {
                            Authorization: "Basic ".concat(creds)
                        },
                        body: params
                    })];
            case 1:
                response = _a.sent();
                return [4 /*yield*/, response.json()];
            case 2:
                json = _a.sent();
                accessToken = json.access_token;
                refreshToken = json.refresh_token;
                tokenExpiration = Date.now(); // + json.expires_in
                return [4 /*yield*/, getUser()];
            case 3:
                user = _a.sent();
                (0, firestore_1.addUser)({
                    id: user.id,
                    name: user.username,
                    accessToken: accessToken,
                    refreshToken: refreshToken,
                    tokenExpiration: tokenExpiration
                });
                res.redirect("/");
                return [2 /*return*/];
        }
    });
}); }));
module.exports = router;
