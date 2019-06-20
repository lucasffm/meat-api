import * as restify from 'restify';

export abstract class Router {
  constructor() {}

  abstract applyRoutes(application: restify.Server);
}
