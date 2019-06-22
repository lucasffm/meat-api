import * as restify from 'restify';

const mpContentType = 'application/merge-patch+json';

export const mergePatchBodyParser = (
  req: restify.Request,
  res: restify.Response,
  next: restify.Next
) => {
  if (req.contentType() == mpContentType && req.method === 'PATCH') {
    try {
      req.body = JSON.parse(req.body);
      return next();
    } catch (e) {
      return next(new Error(`Invalid content ${e.message}`));
    }
  }
  return next();
};
