import { Request } from 'koa';

export const koaAuthentication = (
  request: Request,
  securityName: string,
  _scopes?: string[]
): Promise<any> | any => {
  if (securityName === 'api_key') {
    let token;
    if (request.header && request.header['x-bundle-access-token']) {
      token = request.header['x-bundle-access-token'];
    }

    if (token === 'token') {
      return Promise.resolve({
        id: 1,
        name: 'Ironman',
      });
    } else {
      return Promise.reject({});
    }
  }
};
