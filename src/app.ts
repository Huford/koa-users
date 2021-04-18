import koa from 'koa';
import bodyparser from 'koa-bodyparser';
import loggerKoa from 'koa-logger';
import cors from 'koa2-cors';
import { RegisterRoutes } from '../build/routes';
import { koaSwagger } from 'koa2-swagger-ui';
import * as path from 'path';
const Router = require('@koa/router');
const koaStatic = require('koa-static');

const port = process.env.PORT || 3000;

const app = new koa();

app.use(cors());
app.use(loggerKoa());

const router = new Router();

app.use(bodyparser());

app.use(async (ctx, next) => {
  await next();
  const status = ctx.status || 404;
  if (status === 404) {
    ctx.throw(404);
  }
});

//Routes definitions are built with tsoa automatically
RegisterRoutes(router);

app.use(
  koaSwagger({
    routePrefix: '/apidocs',
    swaggerOptions: {
      url: '/swagger.json',
    },
    hideTopbar: true,
  })
);

app.use(router.routes());
app.use(router.allowedMethods());

//expose swagger definitions
const SWAGGER_DIR_TO_SERVE = path.join(__dirname, '..', 'static');
app.use(koaStatic(SWAGGER_DIR_TO_SERVE));

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
  console.log(`See API docs at: http://localhost:${port}/apidocs`);
});
