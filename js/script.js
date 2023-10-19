let moviesArray = []
let html = ""

const searchBtn = document.getElementById("search-btn")
const inputSearch = document.getElementById("search")
const placeholderEl = document.getElementById("placeholder")

const search = inputSearch.value
searchBtn.addEventListener("click", getTitles)


async function getTitles(){
  html = ""
  const search = inputSearch.value
  const title = search.replace(/\s/g, "-")
  const res = await fetch(`http://www.omdbapi.com/?apikey=86af277f&s=${title}`)
  const data = await res.json()
  moviesArray = data.Search
  placeholderEl.style.display = "none"
  getAllMovies(moviesArray)
}


function getAllMovies(moviesArray){
  const titles = moviesArray.map(movie => movie.imdbID)
  for(let title of titles) {
    fetch(`http://www.omdbapi.com/?apikey=86af277f&i=${title}`)
      .then(res => res.json())
      .then(movie => {
        const rating = movie.Ratings[0].Value
        getHtml(movie, rating.substring(0, 3))
        document.getElementById("main").innerHTML = html
      })
  }
}


function getHtml(title, stars){
  html += `
  <div class="movie">
    <img src="${title.Poster}" class="poster">
    <div class="title-div">
      <h4 class="movie-title">${title.Title}</h4>
      <p class="stars">
        <img src="../img/icon-star.svg">${stars}
      </p>
    </div>
    <p class="runtime">${title.Runtime}</p>
    <p class="genres">${title.Genre}</p>
    <p class="watchlist"><a href="#">
      <img src="../img/icon-plus.svg">Watchlist
    </a></p>
    <p class="plot">${title.Plot}</p>
  </div>
  `
}

