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
            const user = yield users_model_1.User.find();
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
        application.post('/users', (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const userExist = yield users_model_1.User.findOne({ email: req.body.email });
            if (userExist) {
                res.json(409, { message: 'Email já está em uso' });
                return next();
            }
            const Model = new users_model_1.User(req.body);
            const user = yield Model.save();
            user.password = undefined;
            res.json(201, user);
            return next();
        }));
        application.put('/users/:id', (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const user = yield users_model_1.User.findOne({ _id: req.params.id });
            if (!user) {
                res.json(404, { message: 'Usuário não encontrado' });
                return next();
            }
            let updated = yield users_model_1.User.updateOne({ _id: req.params.id }, req.body).exec();
            updated = yield users_model_1.User.findById(req.params.id);
            res.json(200, updated);
            return next();
        }));
    }
}
exports.usersRouter = new UsersRouter();
