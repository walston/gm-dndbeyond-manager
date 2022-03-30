const { app, session, BrowserWindow } = require("electron");

function login() {
  const win = new BrowserWindow({ width: 800, height: 600 });
  const returnUrl = "https://www.dndbeyond.com/";
  const params = new URLSearchParams();
  params.set("returnUrl", returnUrl);
  win.loadURL(`https://www.dndbeyond.com/login?${params.toString()}`);

  const poll = setInterval(() => {
    if (win.webContents.getURL() !== returnUrl) return;

    clearInterval(poll);
    saveCookies().then(console.log).catch(quit);
  }, 30);
}

async function saveCookies() {
  /** @type {Array<any>|null} */
  const captured = await session.defaultSession.cookies.get({});
  if (!captured || captured.length === 0) throw "No Cookies";
  return captured;
}

function quit(error) {
  console.error(error);
  app.exit(1);
}

app.whenReady().then(login);
