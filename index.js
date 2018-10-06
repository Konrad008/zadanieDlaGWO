"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0)
            t[p[i]] = s[p[i]];
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var node_fetch_1 = require("node-fetch");
var RecruitmentAgency = /** @class */ (function () {
    function RecruitmentAgency(programmers) {
        var _this = this;
        this.key = 1;
        if (programmers) {
            this.programmers = programmers.map(function (value) {
                value.id = _this.key;
                _this.key++;
                return value;
            });
        }
        else {
            this.programmers = [];
        }
    }
    RecruitmentAgency.prototype.addProgrammer = function (programmer) {
        programmer.id = this.key;
        this.key++;
        this.programmers = this.programmers.concat([programmer]);
    };
    RecruitmentAgency.prototype.deleteProgrammer = function (programmer) {
        this.programmers = this.programmers.filter(function (value) {
            var id = value.id, eachProgrammer = __rest(value, ["id"]);
            for (var key in eachProgrammer) {
                if (eachProgrammer[key] !== programmer[key]) {
                    return true;
                }
            }
            return false;
        });
    };
    RecruitmentAgency.prototype.getAllProgrammers = function () {
        return this.programmers.map(function (value) {
            var id = value.id, programer = __rest(value, ["id"]);
            return programer;
        });
    };
    RecruitmentAgency.prototype.getShowcase = function () {
        return ('Powitalny tekst! \n' + this.programmers.map(function (value) { return value.name; }).join('\n')).trim();
    };
    RecruitmentAgency.prototype.updateProgrammer = function (programmer, key) {
        this.programmers = this.programmers.map(function (value) {
            if (value.id === key) {
                programmer.id = value.id;
                return programmer;
            }
            return value;
        });
    };
    RecruitmentAgency.prototype.getFilteredProgrammers = function (filter) {
        return this.programmers.filter(function (value) {
            var flag = true;
            filter.forEach(function (val) {
                var id = value.id, programmer = __rest(value, ["id"]);
                if (!val(programmer)) {
                    flag = false;
                }
            });
            if (flag) {
                var id = value.id, programmer = __rest(value, ["id"]);
                return programmer;
            }
        });
    };
    return RecruitmentAgency;
}());
var ra = new RecruitmentAgency();
node_fetch_1.default('https://files.gwo.pl/custom/random-data.json')
    .then(function (response) {
    if (response.ok) {
        return response.json();
    }
    else {
        return Promise.reject("Wystąpił błąd po połączeniu z serwerem: " +
            response.status);
    }
})
    .then(function (data) { return data.map(function (value) { return ra.addProgrammer(value); }); })
    .then(function () { return console.log(ra.getAllProgrammers()); })
    .catch(function (reason) { return console.error('Wystąpłił błąd przy próbie połączenia z serwerem:' + reason.toString()); });
