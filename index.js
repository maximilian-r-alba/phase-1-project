// Select form, add event listener for searching anime
let form = document.querySelector('#searchForm')
form.addEventListener('submit', e => handleSearch(e))


//Function that handles fetching anime from API
function handleSearch(e){
    e.preventDefault()
    console.log('form submit')
    let searchCriteria = document.querySelector('#searchCriteria').value
    fetch(`https://api.jikan.moe/v4/anime?q=${searchCriteria}&sfw`).then(response => response.json()).then(data => createCard(data))
}

// Function that creates display cards for searched criteria
function createCard(data){
    let listOfSeries = data.data

    //For each series in the array of series create elements for the card
    listOfSeries.forEach(series => {
        let list = document.querySelector('#generalList')
        let card = document.createElement('div')
        list.appendChild(card)
        
        //Create title node
        let title = document.createElement('h1')
        //Set title text = english title if english title exists
        if (series.title_english !== null){
            title.innerText = series.title_english
            card.appendChild(title)
        }

        else{
            title.innerText = series.title
            card.appendChild(title)
        }
        //Give card unique ID of the series' title
        card.setAttribute('id', `${title.innerText}`)
    
    




    })

}