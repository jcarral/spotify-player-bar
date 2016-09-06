const {
  app,
  BrowserWindow,
  Tray,
  Menu
} = require('electron')
const menubar = require('menubar')

let mb = menubar({
  icon: 'icono.png',
  dir: './app',
  height: 64
})

function createWindow() {
  console.log("Window loaded")
}

mb.on('ready', createWindow)
mb.on('after-create-window', ()=>{
  mb.window.isResizable(false)
  mb.window.openDevTools()
})
