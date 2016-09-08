const {ipcRenderer} = require('electron')
const spotify = require('spotify-node-applescript')


const updateSong = () => {

  spotify.getTrack((err, track) => {
    if (err)
      return console.log(err);
    const title = document.getElementById("songTitle")
    const artist = document.getElementById("songArtist")
    title.innerHTML = track.name
    artist.innerHTML = track.album_artist
  })
}



const btnNext = document.getElementById("btnNext")
const btnPrev = document.getElementById("btnPrev")
const btnPlay = document.getElementById("btnPlay")

btnPlay.addEventListener("click", ()=>{
  let playIcon = btnPlay.firstElementChild
  if (playIcon.classList.contains('fa-play')){
    playIcon.classList.remove('fa-play')
    playIcon.className += ' fa-pause'
    spotify.pause()
  }else{
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
