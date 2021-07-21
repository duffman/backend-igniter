"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.PTSClient = void 0;
var inversify_1 = require("inversify");
var PTS_BASE_URL = "http://api.pts.se/PTSNumberService/Pts_Number_Service.svc/json/";
var PTSClient = /** @class */ (function () {
    function PTSClient() {
    }
    PTSClient.prototype.httpGetAsJSON = function (url) {
        return new Promise(function (resolve, reject) {
        });
    };
    PTSClient.prototype.formatNumber = function (number) {
        var tmpNumber = number;
        console.log("Format Number :: Start ::", tmpNumber);
        var countryCode = "";
        //
        // Of the number starts with + then extract and
        // remove the country code
        //
        if (tmpNumber.startsWith("+")) {
            console.log("Starts with +");
            tmpNumber = tmpNumber.substr(1);
            countryCode = tmpNumber.substr(1, 2);
        }
        console.log("Format Number :: After ::", tmpNumber);
        console.log("countryCode :: After ::", countryCode);
        return tmpNumber;
    };
    PTSClient.prototype.searchByNumber = function (number) {
        var url = PTS_BASE_URL + "SearchNumberAllocation?number=";
        return new Promise(function (resolve, reject) {
        });
    };
    PTSClient = __decorate([
        inversify_1.injectable()
    ], PTSClient);
    return PTSClient;
}());
exports.PTSClient = PTSClient;
