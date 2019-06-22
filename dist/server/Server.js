"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const restify = require("restify");
const mongoose = require("mongoose");
const environment_1 = require("../common/environment");
const merge_patch_parser_1 = require("./merge-patch.parser");
const { PORT } = environment_1.env.server;
class Server {
    initDB() {
        return mongoose.connect(environment_1.env.DB.url, {
            useNewUrlParser: true
        });
    }
    initRoutes(routes) {
        return new Promise((resolve, reject) => {
            try {
                this.application = restify.createServer({
                    name: 'meat-api',
                    version: '1.0.0'
                });
                this.application.use(restify.plugins.queryParser());
                this.application.use(restify.plugins.bodyParser());
                this.application.use(merge_patch_parser_1.mergePatchBodyParser);
                // Routes
                for (const route of routes) {
                    route.applyRoutes(this.application);
                }
                this.application.listen(PORT, () => {
                    resolve(this.application);
                });
            }
            catch (error) {
                reject(error);
            }
        });
    }
    bootstrap(routes = []) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.initDB();
            yield this.initRoutes(routes);
            return this;
        });
    }
}
exports.Server = Server;
