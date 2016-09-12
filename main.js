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

const createWindow = () => {
  console.log("Window loaded")
}

mb.on('ready', createWindow)
mb.on('after-create-window', () => {
  mb.window.isResizable(false)
  mb.window.openDevTools()
})

const newSongNotification = () => {
  let options = {
    width: 300,
    height: 84,
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
    setTimeout(() => {
      //modalWindow.close()
    }, 5000)
  })
}

const updateMenu = () => {
  if (mb.window !== undefined) {
    mb.window.webContents.send('new-song-info', currentSong)
  }
}

const onChange = () => {
  spotify.getTrack((err, track) => {
    if ((track.name !== currentSong.name) || (track.album_artist !== currentSong.album_artist)) {
      //Nueva cancion sonando
      currentSong.name = track.name
      currentSong.album_artist = track.album_artist
      newSongNotification()
      updateMenu()
    }
  })
}

const onLoad = () => {
  spotify.getState((err, state) => {
    if(err) return console.log(err)
    if (state.state !== 'playing') {
      currentSong.name = "No name"
      currentSong.album_artist = "No artist"
      return mb.window.webContents.send('new-song-info-menu', currentSong)
    } else {
      spotify.getTrack((err, track) => {
        if ((track.name !== currentSong.name) || (track.album_artist !== currentSong.album_artist)) {
          //Nueva cancion sonando
          currentSong.name = track.name
          currentSong.album_artist = track.album_artist
          return mb.window.webContents.send('new-song-info-menu', currentSong)
        }
      })
    }
  })
}

mb.on('after-show', onLoad)
setInterval(onChange, 5000)
