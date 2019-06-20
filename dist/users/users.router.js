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
const router_1 = require("../common/router");
const users_model_1 = require("../users/users.model");
class UsersRouter extends router_1.Router {
    applyRoutes(application) {
        // Application é o restify
        application.get('/users', (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const user = yield users_model_1.User.findAll();
            res.json(200, user);
            return next();
        }));
        application.get('/users/:id', (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const user = yield users_model_1.User.findById(req.params.id);
            if (user) {
                res.json(200, user);
                return next();
            }
            else {
                res.json(404);
                return next();
            }
        }));
    }
}
exports.usersRouter = new UsersRouter();
