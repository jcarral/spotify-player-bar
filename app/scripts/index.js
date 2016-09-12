const {
  ipcRenderer
} = require('electron')
const axios = require('axios')
const spotify = require('spotify-node-applescript')

const title = document.getElementById("songTitle")
const artist = document.getElementById("songArtist")
const btnNext = document.getElementById("btnNext")
const btnPrev = document.getElementById("btnPrev")
const btnPlay = document.getElementById("btnPlay")
const cover = document.getElementById("cover")

const changeContent = (track) => {

  title.innerHTML = track.name
  artist.innerHTML = track.album_artist

  if (track.id !== undefined) {
    let id = track.id.split(":")[2]
    axios.get(`https://api.spotify.com/v1/tracks/${id}`)
      .then((response) => {
        let data = response.data
        cover.src = data.album.images[2].url
      })
      .catch((err) => {
        cover.src = "./images/genericcover.png"
        return console.log(err)
      })
  } else {
    cover.src = "./images/genericcover.png"
  }
}

const updateSong = () => {
  spotify.getTrack((err, track) => {
    if (err)
      return console.log(err);
    changeContent(track)
  })
}


btnPlay.addEventListener("click", () => {
  let playIcon = btnPlay.firstElementChild
  if (playIcon.classList.contains('fa-play')) {
    playIcon.classList.remove('fa-play')
    playIcon.className += ' fa-pause'
    spotify.pause()
  } else {
    playIcon.classList.remove('fa-pause')
    playIcon.className += ' fa-play'
    spotify.play()
  }
})

btnNext.addEventListener("click", () => {
  spotify.next(() => {
    console.log("Next song playing...")
    updateSong()
  })
})

btnPrev.addEventListener("click", () => {
  spotify.previous(() => {
    console.log("Previous song playing...");
    updateSong()
  })
})

ipcRenderer.on('new-song-info-menu', function(event, track) {
  console.log("New song")
  changeContent(track)
})
