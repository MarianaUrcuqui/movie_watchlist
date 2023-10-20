let moviesArray = []
let moviesCollection = []
let html = ""
let eliminate = false

const searchBtn = document.getElementById("search-btn")
const inputSearch = document.getElementById("search")
const placeholderEl = document.getElementById("placeholder")
const mainEl = document.getElementById("main")
const watchlistMainEl = document.getElementById("watchlist-main")

if(localStorage.getItem("movies")){
  moviesCollection = (JSON.parse(localStorage.getItem("movies"))) //Here we are getting the movies previously added 
}

if(mainEl){
  eliminate = false
  searchBtn.addEventListener("click", getTitles)
  mainEl.addEventListener("click", function(e){
    if(e.target.dataset.add){
      handleAddMovie(e.target.dataset.add)
    }
  })
}

if(watchlistMainEl){
  eliminate = true
  if(moviesCollection.length > 0){
    getAllMovies(moviesCollection, watchlistMainEl)
  }

  watchlistMainEl.addEventListener("click", function(e){
    if(e.target.dataset.remove){
      handleRemoveMovie(e.target.dataset.remove)
      if(moviesCollection.length > 0){
        getAllMovies(moviesCollection, watchlistMainEl)
      }else{
        handleEmptyWatchlist()
      }
    }
  })
}






//-----------------------
//----- functions -------
//-----------------------
function getTitles(){
  const search = inputSearch.value
  if(search){
    const title = search.replace(/\s/g, "-") //With this we are changing for example "game of thrones" to "game-of-thrones"
    fetch(`http://www.omdbapi.com/?apikey=86af277f&s=${title}`)
      .then(res => res.json())
      .then(data =>{
        if(data.Error){ //If no movies are found
          handleNoResponse() 
        }else{
          moviesArray = data.Search
          const titles = moviesArray.map(movie => movie.imdbID)
          getAllMovies(titles, mainEl)
        }
      })
  }
  }


function getAllMovies(titles, where){
  html = "" //This deletes the html of the previous movies
  placeholderEl.style.display = "none"
  for(let title of titles) {
    fetch(`http://www.omdbapi.com/?apikey=86af277f&i=${title}`)
      .then(res => res.json())
      .then(movie => {
        const rating = movie.Ratings[0].Value
        getHtml(movie, rating.substring(0, 3), title)
        where.innerHTML = html
      })
  }
}


function getHtml(title, stars, ID){
  let addBtnContent
  if(!eliminate){
    addBtnContent = `<img src="../img/icon-plus.svg" data-add="${ID}">Watchlist`
  }else{
    addBtnContent = `<img src="../img/icon-remove.svg" data-remove="${ID}">Remove`
  }
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
    <button type="button" class="watchlist" data-add="${ID}">
      ${addBtnContent}
    </button>
    <p class="plot">${title.Plot}</p>
  </div>
  `
}

function handleNoResponse(){
  const html = `
    <h3>Unable to find what you’re looking for. Please try another search.</h3>
  `
  placeholderEl.style.display = "flex"
  placeholderEl.innerHTML = html
  mainEl.innerHTML = ""
}

function handleAddMovie(addID){
  if(!moviesCollection.includes(addID)){
    moviesCollection.push(addID)
    localStorage.setItem("movies", JSON.stringify(moviesCollection))
  }
}

function handleRemoveMovie(addID){
  moviesCollection = moviesCollection.filter(movie => movie !== addID)
  localStorage.setItem("movies", JSON.stringify(moviesCollection))
}

function handleEmptyWatchlist(){
  const html = `
  <h3>Your watchlist is looking a little empty...</h3>
  <div> 
    <a href="index.html">
      <img src="../img/icon-plus.svg">
      <h5>Let’s add some movies!</h5>
    </a>
  </div>
  `
  placeholderEl.style.display = "flex"
  placeholderEl.innerHTML = html
  watchlistMainEl.innerHTML = ""
}

