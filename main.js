const { app } = require("electron");
const login = require("./login");

function fail(error) {
  console.error(error);
  app.exit(1);
}

app
  .whenReady()
  .then(login)
  .then(console.log)
  .then(() => app.exit(0))
  .catch(fail);
