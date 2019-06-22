"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mpContentType = 'application/merge-patch+json';
exports.mergePatchBodyParser = (req, res, next) => {
    if (req.contentType() == mpContentType && req.method === 'PATCH') {
        try {
            req.body = JSON.parse(req.body);
            return next();
        }
        catch (e) {
            return next(new Error(`Invalid content ${e.message}`));
        }
    }
    return next();
};
