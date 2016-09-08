const {ipcRenderer} = require('electron')

const title = document.getElementById("songTitle")
const artist = document.getElementById("songArtist")

ipcRenderer.on('new-song-info', function(event, info){

    artist.innerHTML = info.album_artist
    title.innerHTML = info.name
})
