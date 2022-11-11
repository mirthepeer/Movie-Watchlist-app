import {getResults , generateHTML} from './utils.js'
const searchBtn = document.getElementById('search-btn')


// Using results from getResults function this fuction uses those results to render out all the movies
async function renderMovies(){   
    const moviesToRender = await getResults()
    document.getElementById('search-results').innerHTML = generateHTML(moviesToRender)

}
if(searchBtn){
    searchBtn.addEventListener('click' , renderMovies)
}




document.addEventListener('click', (e)=>{
    if(e.target.dataset.add){
        handleAdd(e.target.dataset.add)
    }else if(e.target.dataset.remove){
        handleRemove(e.target.dataset.remove)
    }

})

export function handleAdd(id){
    let myList 
    if('watchlist' in localStorage){
        myList =  JSON.parse(localStorage.getItem('watchlist'))

    }else{
        myList = []
    }
    const movies = JSON.parse(localStorage.getItem('movies'))

    const targetObj = movies.filter(movie=>{
        return movie.imdbID === id
    })[0]
    
    if (!myList.some(e => e.imdbID === targetObj.imdbID)){
        myList.push(targetObj)
        localStorage.setItem('watchlist', JSON.stringify(myList))
    }
    renderMovies()
}

export function handleRemove(id){
    let myList = JSON.parse(localStorage.getItem('watchlist'))
    const index =  myList.findIndex(x => x.imdbID ==id);
    console.log(index)
    myList.splice(index,1)
    localStorage.setItem('watchlist',JSON.stringify(myList))
    renderMovies()

}










