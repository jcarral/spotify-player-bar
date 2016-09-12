const {ipcRenderer} = require('electron')

const title = document.getElementById("songTitle")
const artist = document.getElementById("songArtist")

const tooLong = (text) => {
  if(text.length > 30)
    return `<marquee> ${text} </marquee>`
  return text
}

ipcRenderer.on('new-song-info', function(event, info){

    artist.innerHTML = tooLong(info.album_artist)
    title.innerHTML = tooLong(info.name)
})
