const apiKey = 'e007dc23f3b14243908e46acf9ee53a1'

const initialize = () =>{
    homeFetch('popularMovies', 'popular')
    homeFetch('topRates', 'top_rated')
    homeFetch('upcoming', 'upcoming')
    homeFetch('nowPlaying', 'now_playing')
}

const homeFetch = (containerId, category) =>{
    let container = document.getElementById(containerId)
    fetch(`https://api.themoviedb.org/3/movie/${category}?api_key=${apiKey}`)
        .then(res=>res.json())
        .then(res=>{
            [0, 1, 2, 3].forEach(num=>{
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






const dropdownMenu = () =>{
    toggleMenu()
}

const toggleMenu = () =>{
    let menu = document.getElementById('featureNav')
    menu.classList.toggle('hide')
}