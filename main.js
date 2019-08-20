const apiKey = 'e007dc23f3b14243908e46acf9ee53a1'
const fourArray = [0, 1, 2, 3]
const twentyArray = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19]


const initialize = () =>{
    fetchMoviePosters('popularMovies', 'popular', fourArray, 1)
    fetchMoviePosters('topRates', 'top_rated', fourArray, 1)
    fetchMoviePosters('upcoming', 'upcoming', fourArray, 1)
    fetchMoviePosters('nowPlaying', 'now_playing', fourArray, 1)
}

const fetchMoviePosters = (containerId, category, numbersArray, page) =>{
    let container = document.getElementById(containerId)
    fetch(`https://api.themoviedb.org/3/movie/${category}?api_key=${apiKey}&page=${page}`)
        .then(res=>res.json())
        .then(res=>{
            numbersArray.forEach(num=>{
                let li = document.createElement('li')
                let anchor = document.createElement('a')
                let figure = document.createElement('figure')
                let image = document.createElement('img')
                let movieTitle = document.createElement('figcaption')
                image.src = `https://image.tmdb.org/t/p/w300${res.results[num].poster_path}`
                movieTitle.innerText = res.results[num].original_title
                figure.appendChild(image)
                figure.appendChild(movieTitle)
                anchor.appendChild(figure)
                li.appendChild(anchor)
                container.appendChild(li)
            })
            
        })
        .catch(error=>console.log(error))  
}

const allPopularMovies = () =>{
    event.preventDefault()
    innerHTMLCleaner('popularMovies')
    showElement('popularSection')
    hideElement('topRatesSection')
    hideElement('upcomingSection')
    hideElement('nowPlayingSection')
    hideElement('searchSection')
    fetchMoviePosters('popularMovies', 'popular', twentyArray)
    hideElement('popularViewAll')
    showElement('popularResults')
    showElement('popularLoad')
    clicksCounter('popularLoad', 'popularMovies', 'popular')
}

const allTopRates = () =>{
    event.preventDefault()
    innerHTMLCleaner('topRates')
    hideElement('popularSection')
    showElement('topRatesSection')
    hideElement('upcomingSection')
    hideElement('nowPlayingSection')
    hideElement('searchSection')
    fetchMoviePosters('topRates', 'top_rated', twentyArray)
    hideElement('topRatesViewAll')
    showElement('topRatesResults')
    showElement('topRatesLoad')
    clicksCounter('topRatesLoad', 'topRates', 'top_rated')
}

const allUpcoming = () =>{
    event.preventDefault()
    innerHTMLCleaner('upcoming')
    hideElement('popularSection')
    hideElement('topRatesSection')
    showElement('upcomingSection')
    hideElement('nowPlayingSection')
    hideElement('searchSection')
    fetchMoviePosters('upcoming', 'upcoming', twentyArray)
    hideElement('upcomingViewAll')
    showElement('upcomingResults')
    showElement('upcomingLoad')
    clicksCounter('upcomingLoad', 'upcoming', 'upcoming')
}

const allNowPlaying = () =>{
    event.preventDefault()
    innerHTMLCleaner('nowPlaying')
    hideElement('popularSection')
    hideElement('topRatesSection')
    hideElement('upcomingSection')
    showElement('nowPlayingSection')
    hideElement('searchSection')
    fetchMoviePosters('nowPlaying', 'now_playing', twentyArray)
    hideElement('nowPlayingViewAll')
    showElement('nowPlayingResults')
    showElement('nowPlayingLoad')
    clicksCounter('nowPlayingLoad', 'nowPlaying', 'now_playing')
}

const searchMovie = () =>{
    hideElement('popularSection')
    hideElement('topRatesSection')
    hideElement('upcomingSection')
    hideElement('nowPlayingSection')
    showElement('searchSection')
    innerHTMLCleaner('search')
    showElement('searchLoad')
    let input = document.getElementById('searchInput')
    let searchInput = input.value
    input.value = ''
    if(searchInput !== ''){
        searchFetch('search', `?api_key=${apiKey}&query=${searchInput}&page=1`)
        searchClicksCounter('searchLoad', 'search', searchInput)
    }
}

const closeMovie = () =>{
    hideElement('movieModal')
}

const showMovieInfo = () =>{
    showElement('movieModal')
}

const searchFetch = (containerId, apiString) =>{
    let container = document.getElementById(containerId)
    fetch(`https://api.themoviedb.org/3/search/movie${apiString}`)
            .then(res=>res.json())
            .then(res=>{
                twentyArray.forEach(num=>{
                    let li = document.createElement('li')
                    let anchor = document.createElement('a')
                    let figure = document.createElement('figure')
                    let image = document.createElement('img')
                    let movieTitle = document.createElement('figcaption')
                    image.src = `https://image.tmdb.org/t/p/w300${res.results[num].poster_path}`
                    movieTitle.innerText = res.results[num].original_title
                    figure.appendChild(image)
                    figure.appendChild(movieTitle)
                    anchor.appendChild(figure)
                    li.appendChild(anchor)
                    container.appendChild(li)
                })
                
            })
    .catch(error=>console.log(error))  
}

const searchClicksCounter = (buttonId, containerId, searchInput) =>{
    let loadMore = document.getElementById(buttonId)
    let counter = 1
    loadMore.onclick = function(){
        event.preventDefault()
        counter += 1
        searchFetch(containerId, `?api_key=${apiKey}&query=${searchInput}&page=${counter}`)
    }
}

const clicksCounter = (buttonId, containerId, category) =>{
    let loadMore = document.getElementById(buttonId)
    let counter = 1
    loadMore.onclick = function(){
        event.preventDefault()
        counter += 1
        fetchMoviePosters(containerId, category, twentyArray, counter)
    }
}

const dropdownMenu = () =>{
    toggleMenu()
}

const toggleMenu = () =>{
    let menu = document.getElementById('featureNav')
    menu.classList.toggle('hide')
}

const showElement = (elementId) =>{
    let element = document.getElementById(elementId)
    element.classList.replace('hide', 'show')
}

const hideElement = (elementId) =>{
    let element = document.getElementById(elementId)
    element.classList.replace('show', 'hide')
}

const innerHTMLCleaner = (containerId) =>{
    let container = document.getElementById(containerId)
    container.innerHTML = ''
}

const fillModal = () =>{
fetch(`https://api.themoviedb.org/3/movie/${peliculaId}?api_key=${apiKey}`)
    .then(res=>res.json())
    .then(res=> console.log(res))
}

fillModal()