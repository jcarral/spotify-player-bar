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

btnNext.addEventListener("click", ()=>{
  spotify.next(()=>{
    console.log("Next song playing...")
    updateSong()
  })
})

btnPrev.addEventListener("click", ()=>{
  spotify.previous(()=>{
    console.log("Previous song playing...");
    updateSong()
  })
})
