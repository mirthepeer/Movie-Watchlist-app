// API key from OMDB API
const apikey = '4689b8df'  

let page = 1
const searchBar = document.getElementById('search-bar')

const loader = document.getElementById('loader')

export function addLoader(){
    loader.style.display = 'block'
}


export function RemoveLoader(){
    loader.style.display= 'none'
}

// Gets all matching movies to the search input and filters out thier Imdb Ids.
export async function getMoviesId(){
    addLoader()
    const response = await fetch(`https://www.omdbapi.com/?apikey=${apikey}&s=${searchBar.value}&plot='short'&page=${page}`)
    const movies = await response.json()
    RemoveLoader()
    let movieIDs = []
    for(let movie of movies.Search){
        movieIDs.push(movie.imdbID)
    }
    return movieIDs

}

// Using the Ids returned from getMoviesId fuctction this fuction uses those ids and those ids are passed as a search query to get detailed info of a movie 
export async function getResults(){
    try{
    const movieIDs = await getMoviesId()
    let movieResults = []
    for(let id of movieIDs){
        const response = await fetch(`https://www.omdbapi.com/?apikey=${apikey}&i=${id}`)
        const movie = await response.json()
        movieResults.push(movie)
    }
        
        
    
    return movieResults
}catch (error) {
    return 'No results'
  }
 }


 // generateHTML uses results from getResults function and usses that data to render out movie cards and takes moviesToRender Object that
// contain all the movies as a parameter
export function generateHTML(movies){
    if (movies === 'No results') {
        return '<p>No results</p>'
      }
    let html = ''

    localStorage.setItem('movies', JSON.stringify(movies))
    movies.map(movie=>{
        let buttonState = ''
        let myList 
    if('watchlist' in localStorage){
        myList =  JSON.parse(localStorage.getItem('watchlist'))

    }else{
        myList = []
    }
    // checks if movie is already in watchlist and decidies if add or remove button should be displayed
    let buttonIcon 
    !myList.some(e => e.imdbID === movie.imdbID) ? (buttonState = 'add', buttonIcon = '+') :(buttonState = 'remove', buttonIcon='-')
        

        html += ` 
        
        <div class='current-movie'>
            <div class='poster'>
                <img src = ${movie.Poster} alt='movie img'>
            </div>
            <div class='movie-info-wrapper'>
                <div class='movie-info'>
                    <p class='title'>${movie.Title}</p>
                    <p class='movie-rating'>⭐${movie.imdbRating}</p>
                </div>
                <div class='movie-gerne'>
                    <p>${movie.Runtime}</p>
                    <p>${movie.Genre}</p>
                    <div class='watchlist-btn flex-container'>
                        <button class='btn' id= '${movie.imdbID}' data-${buttonState}='${movie.imdbID}'>${buttonIcon} </button>
                        <p>Watchlist</p>
                    </div>
                </div>
                <div class="movie-plot">
                    <p>${movie.Plot}</p>
                </div>
            </div>
    </div>
`
        
    })
   
    return html
}