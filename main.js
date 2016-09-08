const {
  app,
  BrowserWindow,
  Tray,
  Menu,
  ipcMain
} = require('electron')
const spotify = require('spotify-node-applescript')

const menubar = require('menubar')

let mb = menubar({
  icon: 'icono.png',
  dir: './app',
  height: 64
})
let modalWindow
let currentSong = {
  name: "",
  album_artist: ""
}

function createWindow() {
  console.log("Window loaded")
}

mb.on('ready', createWindow)
mb.on('after-create-window', ()=>{
  mb.window.isResizable(false)
  mb.window.openDevTools()
})

const newSongNotification = () =>{
  let options = {
    width: 300,
    height: 64,
    x: 10,
    y: 10,
    frame: false,
    transparent: true,
    resizable: false,
    show: false
  }

  modalWindow = new BrowserWindow(options)
  modalWindow.loadURL('file://' + __dirname + '/app/dialog.html')
  modalWindow.openDevTools()
  modalWindow.on('ready-to-show', () => {
    modalWindow.webContents.send('new-song-info', currentSong)
    modalWindow.show()
    setTimeout(()=>{
      modalWindow.close()
    }, 5000)
  })

}

const onChange = () => {
  spotify.getTrack((err, track) => {
    if ((track.name !== currentSong.name) || (track.album_artist !== currentSong.album_artist)) {
      //Nueva cancion sonando
      currentSong.name = track.name
      currentSong.album_artist = track.album_artist
      newSongNotification()
    }
  })
}

setInterval(onChange, 5000)
