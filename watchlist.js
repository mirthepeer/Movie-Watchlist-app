

import {generateHTML} from './utils.js'

function renderWatchList(watchlistData){
    if(watchlistData.length>0){
        document.getElementById('watchlist-results').innerHTML = generateHTML(watchlistData)
    }
    else{
        document.getElementById('watchlist-results').innerHTML = `
        <h1 class="instructions white">Your Watchlist Seems Empty</h1>
        <h1><a class='Dark-bg' href="index.html">Search for movies 🔍</a></h3>
        `
    }
   
    
}


if('watchlist' in localStorage){
    let watchlistData = JSON.parse(localStorage.getItem('watchlist'))
    if(watchlistData.length>0){
        renderWatchList(watchlistData)
    }else{
        document.getElementById('watchlist-results').innerHTML = 
        `
        <h1 class="instructions white">Your Watchlist Seems Empty</h1>
        <h1><a class='Dark-bg' href="index.html">Search for movies 🔍</a></h3>
        `
        
    }
    

}

document.addEventListener('click', (e)=>{
   if(e.target.dataset.remove){
        handleRemove(e.target.dataset.remove)
        let watchlistData = JSON.parse(localStorage.getItem('watchlist'))
        renderWatchList(watchlistData)

    }

})

function handleRemove(id){
    let myList = JSON.parse(localStorage.getItem('watchlist'))
    const index =  myList.findIndex(x => x.imdbID ==id);
    console.log(index)
    myList.splice(index,1)
    localStorage.setItem('watchlist',JSON.stringify(myList))
    

}
