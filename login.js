const { BrowserWindow, session } = require("electron");
async function login() {
  const win = new BrowserWindow({ width: 800, height: 600 });
  const returnUrl = "https://www.dndbeyond.com/";
  const params = new URLSearchParams();
  params.set("returnUrl", returnUrl);
  win.loadURL(`https://www.dndbeyond.com/login?${params.toString()}`);

  return new Promise(function (resolve, reject) {
    const poll = setInterval(() => {
      if (win.webContents.getURL() !== returnUrl) return;

      clearInterval(poll);
      saveCookies().then(resolve).catch(reject);
    }, 30);
  });
}

async function saveCookies() {
  /** @type {Array<any>|null} */
  const captured = await session.defaultSession.cookies.get({});
  if (!captured || captured.length === 0) throw "No Cookies";
  return captured;
}

module.exports = login;
