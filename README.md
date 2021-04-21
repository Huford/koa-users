# koa-users
Example usage of a simple /users endpoint

[![Node.js CI](https://github.com/Huford/koa-users/actions/workflows/node.js.yml/badge.svg?branch=main)](https://github.com/Huford/koa-users/actions/workflows/node.js.yml)
[![Deploy](https://github.com/Huford/koa-users/actions/workflows/main.yml/badge.svg)](https://github.com/Huford/koa-users/actions/workflows/main.yml)
[![Coverage Status](https://coveralls.io/repos/github/Huford/koa-users/badge.svg?branch=main)](https://coveralls.io/github/Huford/koa-users?branch=main)

## Features
- TypeScript
- [koa](https://koajs.com/)
- Dumb authentication via header token
- [tsoa](https://tsoa-community.github.io/docs/)
- Auto building api docs using swagger-UI
- Coverage with coveralls
- Automatic deploys to heroku on merge

## How to use it
- Clone this repo `git clone https://github.com/Huford/koa-users.git`
- `cd koa-users`
- `yarn && yarn build:spec-and-routes` installs all the dependencies and build routes file
- `yarn dev` starts dev server 🚀
- Go to http://localhost:3000/apidocs to see the docs and test the api
