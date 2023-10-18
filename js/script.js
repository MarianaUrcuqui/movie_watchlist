let moviesArray = []
let title = ""
let html = ""


async function getTitles(){
  const res = await fetch('http://www.omdbapi.com/?apikey=86af277f&s=toy-story')
  const data = await res.json()
  moviesArray = data.Search
  getAllMovies(moviesArray)
}
getTitles()


function getAllMovies(moviesArray){
  const titles = moviesArray.map(movie => movie.imdbID)
  for(let title of titles) {
    fetch(`http://www.omdbapi.com/?apikey=86af277f&i=${title}`)
      .then(res => res.json())
      .then(movie => {
        const rating = movie.Ratings[0].Value
        getHtml(movie, rating)
        document.getElementById("main").innerHTML = html
      })
  }
}

// function getAllMovies(moviesArray){
//   const titles = moviesArray.map(movie => movie.Title)
//   for(let title of titles) {
//     title = title.replace(/\s+/g, '-')
//     async function intento(){
//       const res = await fetch(`http://www.omdbapi.com/?apikey=86af277f&t=${title}`)
//       const data = await res.json()
//       html += data
//     }
//   }
//   html 
//   document.getElementById("main").innerHTML += html
//     }
  
    



function getHtml(title, stars){
  html += `
  <div class="movie">
    <h1 class="movie-title">${title.Title}</h1>
    <p class="stars">${stars}</p>
    <p class="runtime">${title.Runtime}</p>
    <p class="genres">${title.Genre}</p>
    <p class="plot">${title.Plot}</p>
  </div>
  `
}