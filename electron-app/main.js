const { app, BrowserWindow } = require("electron");

function createWindow() {
    const win = new BrowserWindow({
        width: 500,
        height: 700,
        resizable: false,
        maximizable: false,
        fullscreenable: false,
        frame: false,
        transparent: false,
        webPreferences: {
            contextIsolation: true,
        },
    });

    win.loadFile("index.html");
}

app.whenReady().then(createWindow);

app.on("window-all-closed", () => {
    if (process.platform !== "darwin") app.quit();
});
