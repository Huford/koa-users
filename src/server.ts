import app from './app';

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.info(`Listening to http://localhost:${port} 🚀`);
  console.log(`See API docs at: http://localhost:${port}/apidocs`);
});
