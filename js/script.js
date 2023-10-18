let moviesArray = []
let allTitles = []
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
  const titles = moviesArray.map(movie => movie.Title)
  for(let title of titles) {
    title = title.replace(/\s+/g, '-')
    fetch(`http://www.omdbapi.com/?apikey=86af277f&t=${title}`)
      .then(res => res.json())
      .then(data => {
        getHtml(data)
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
  
    



function getHtml(title){
  html += `
  <h1>${title.Title}</h1>
  <p>${title.Runtime}</p>
  `
}