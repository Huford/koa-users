/* tslint:disable */
/* eslint-disable */
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  import { Controller, ValidationService, FieldErrors, ValidateError, TsoaRoute, HttpStatusCodeLiteral, TsoaResponse } from '@tsoa/runtime';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { UsersController } from './../users/userController';
import { koaAuthentication } from './../auth/authentication';
import * as KoaRouter from '@koa/router';

// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

const models: TsoaRoute.Models = {
    "UserAddress": {
        "dataType": "refObject",
        "properties": {
            "street": {"dataType":"string","required":true},
            "suite": {"dataType":"string","required":true},
            "city": {"dataType":"string","required":true},
            "zipcode": {"dataType":"string","required":true},
            "geo": {"dataType":"nestedObjectLiteral","nestedProperties":{"lng":{"dataType":"string","required":true},"lat":{"dataType":"string","required":true}},"required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Company": {
        "dataType": "refObject",
        "properties": {
            "name": {"dataType":"string","required":true},
            "catchPhrase": {"dataType":"string","required":true},
            "bs": {"dataType":"string","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "User": {
        "dataType": "refObject",
        "properties": {
            "id": {"dataType":"double"},
            "name": {"dataType":"string"},
            "username": {"dataType":"string"},
            "email": {"dataType":"string"},
            "address": {"ref":"UserAddress"},
            "phone": {"dataType":"string"},
            "website": {"dataType":"string"},
            "company": {"ref":"Company"},
        },
        "additionalProperties": {"dataType":"any"},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
};
const validationService = new ValidationService(models);

// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

export function RegisterRoutes(router: KoaRouter) {
    // ###########################################################################################################
    //  NOTE: If you do not see routes for all of your controllers in this file, then you might not have informed tsoa of where to look
    //      Please look into the "controllerPathGlobs" config option described in the readme: https://github.com/lukeautry/tsoa
    // ###########################################################################################################
        router.get('/users/:userId',
            authenticateMiddleware([{"api_key":[]}]),
            async function UsersController_getUser(context: any, next: any) {
            const args = {
                    userId: {"in":"path","name":"userId","required":true,"dataType":"double"},
            };

            let validatedArgs: any[] = [];
            try {
              validatedArgs = getValidatedArgs(args, context, next);
            } catch (error) {
              context.status = error.status;
              context.throw(error.status, JSON.stringify({ fields: error.fields }));
            }

            const controller = new UsersController();

            const promise = controller.getUser.apply(controller, validatedArgs as any);
            return promiseHandler(controller, promise, context, undefined, next);
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        router.get('/users',
            authenticateMiddleware([{"api_key":[]}]),
            async function UsersController_getUsers(context: any, next: any) {
            const args = {
                    emailContains: {"in":"query","name":"emailContains","dataType":"string"},
                    coordinate: {"in":"query","name":"coordinate","dataType":"array","array":{"dataType":"string"}},
                    radius: {"in":"query","name":"radius","dataType":"double"},
                    fields: {"in":"query","name":"fields","dataType":"array","array":{"dataType":"string"}},
            };

            let validatedArgs: any[] = [];
            try {
              validatedArgs = getValidatedArgs(args, context, next);
            } catch (error) {
              context.status = error.status;
              context.throw(error.status, JSON.stringify({ fields: error.fields }));
            }

            const controller = new UsersController();

            const promise = controller.getUsers.apply(controller, validatedArgs as any);
            return promiseHandler(controller, promise, context, undefined, next);
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

  function authenticateMiddleware(security: TsoaRoute.Security[] = []) {
      return async function runAuthenticationMiddleware(context: any, next: any) {
          let responded = 0;
          let success = false;

          const succeed = async (user: any) => {
              if (!success) {
                  success = true;
                  responded++;
                  context.request['user'] = user;
                  await next();
              }
          };

          // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

          const fail = async (error: any) => {
              responded++;
              if (responded == security.length && !success) {
                  // this is an authentication error
                  context.status = error.status || 401;
                  context.throw(context.status, error.message, error);
              } else if (success) {
                  // the authentication was a success but arriving here means the controller
                  // probably threw an error that we caught as well
                  // so just pass it on
                  throw error;
              }
          };

          // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

          for (const secMethod of security) {
              if (Object.keys(secMethod).length > 1) {
                  let promises: Promise<any>[] = [];

                  for (const name in secMethod) {
                      promises.push(koaAuthentication(context.request, name, secMethod[name]));
                  }

                  return Promise.all(promises)
                      .then((users) => succeed(users[0]))
                      .catch(fail);
              } else {
                  for (const name in secMethod) {
                      return koaAuthentication(context.request, name, secMethod[name])
                          .then(succeed)
                          .catch(fail);
                  }
              }
          }
      }
  }

  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

  function isController(object: any): object is Controller {
      return 'getHeaders' in object && 'getStatus' in object && 'setStatus' in object;
  }

  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

  function promiseHandler(controllerObj: any, promise: Promise<any>, context: any, successStatus: any, next: () => Promise<any>) {
      return Promise.resolve(promise)
        .then((data: any) => {
            let statusCode = successStatus;
            let headers;

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            if (isController(controllerObj)) {
                headers = controllerObj.getHeaders();
                statusCode = controllerObj.getStatus() || statusCode;
            }
            return returnHandler(context, next, statusCode, data, headers);
        })
        .catch((error: any) => {
            context.status = error.status || 500;
            context.throw(context.status, error.message, error);
        });
    }

    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

    function returnHandler(context: any, next: () => any, statusCode?: number, data?: any, headers: any={}) {
        if (!context.headerSent && !context.response.__tsoaResponded) {
            context.set(headers);

            if (data !== null && data !== undefined) {
                context.body = data;
                context.status = 200;
            } else {
                context.status = 204;
            }

            if (statusCode) {
                context.status = statusCode;
            }

            context.response.__tsoaResponded = true;
            return next();
        }
    }

    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

    function getValidatedArgs(args: any, context: any, next: () => any): any[] {
        const errorFields: FieldErrors = {};
        const values = Object.keys(args).map(key => {
            const name = args[key].name;
            switch (args[key].in) {
            case 'request':
                return context.request;
            case 'query':
                return validationService.ValidateParam(args[key], context.request.query[name], name, errorFields, undefined, {"noImplicitAdditionalProperties":"throw-on-extras"});
            case 'path':
                return validationService.ValidateParam(args[key], context.params[name], name, errorFields, undefined, {"noImplicitAdditionalProperties":"throw-on-extras"});
            case 'header':
                return validationService.ValidateParam(args[key], context.request.headers[name], name, errorFields, undefined, {"noImplicitAdditionalProperties":"throw-on-extras"});
            case 'body':
                return validationService.ValidateParam(args[key], context.request.body, name, errorFields, undefined, {"noImplicitAdditionalProperties":"throw-on-extras"});
            case 'body-prop':
                return validationService.ValidateParam(args[key], context.request.body[name], name, errorFields, 'body.', {"noImplicitAdditionalProperties":"throw-on-extras"});
            case 'formData':
                if (args[key].dataType === 'file') {
                  return validationService.ValidateParam(args[key], context.request.file, name, errorFields, undefined, {"noImplicitAdditionalProperties":"throw-on-extras"});
                } else if (args[key].dataType === 'array' && args[key].array.dataType === 'file') {
                  return validationService.ValidateParam(args[key], context.request.files, name, errorFields, undefined, {"noImplicitAdditionalProperties":"throw-on-extras"});
                } else {
                  return validationService.ValidateParam(args[key], context.request.body[name], name, errorFields, undefined, {"noImplicitAdditionalProperties":"throw-on-extras"});
                }
            case 'res':
                return responder(context, next);
            }
        });
        if (Object.keys(errorFields).length > 0) {
            throw new ValidateError(errorFields, '');
        }
        return values;
    }

    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

    function responder(context: any, next: () => any): TsoaResponse<HttpStatusCodeLiteral, unknown>  {
        return function(status, data, headers) {
           returnHandler(context, next, status, data, headers);
        };
    };

    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
}

// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
