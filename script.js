function showLyrics(artist, title) {
    fetch(`https://api.lyrics.ovh/v1/${artist}/${title}`)
        .then(response => response.json())
        .then(lyricData => {
            const lyrics = lyricData.lyrics;
            const lyricesDisplay = document.getElementById('single');
            lyricesDisplay.innerHTML = `<h2 class="text-success mb-4">${artist} - ${title}</h2>
                                        <div style="background-color: rgb(36, 35, 35); width:100%;"><pre class="lyric text-white">${lyrics}</pre></div>`
        })
        document.getElementById('search-result').innerHTML = ''; // To clear everything
}


function getResult() {
    const songTitle = document.getElementById('song-name').value;
    document.getElementById('search-result').innerHTML = '';  //To clear previous results.
    document.getElementById('single').innerHTML = '';  //To clear previous lyrics.

    fetch(`https://api.lyrics.ovh/suggest/${songTitle}`)
    .then(response => response.json())
    .then(apiData => {
        console.log(apiData);
        const songs = apiData.data;
        for (let i = 0; i < 10; i++) {
            const song = songs[i];   
            const title = song.title;   //line 26-31 for title,artist-name, song-type, song-duration and download link.
            const artist = song.artist.name;
            const type = song.type;
            const img = song.artist.picture_small;
            const duration = song.duration;
            const link = song.link;
            const result = document.getElementById('search-result');
            result.innerHTML += `<div class="single-result row align-items-center my-3 p-3">
            <div class="col-md-2">
            <img class="img-thumbnail" src="${img}" alt="Cover Picture">
            </div>
            <div class="col-md-7">
            <h3 class="lyrics-name">${title}</h3>
            <p class="author lead">${type} by <span>${artist}</span></p>
            <small>Duration: ${(duration/60).toFixed(2)} minutes. </small><br>
            <small><a href="${link}">Download now</a></small>
        </div>
        <div class="col-md-3 text-md-right text-center">
            <button onclick="showLyrics('${artist}','${title}')" class="btn btn-success">Get Lyrics</button>
        </div>
    </div>`

        }
    })

}
