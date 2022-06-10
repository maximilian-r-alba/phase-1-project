
let searchList = document.querySelector('#searchList')
let savedList = document.querySelector('#savedList')

// Select form, add event listener for searching anime
let form = document.querySelector('#searchForm')
form.addEventListener('submit', e => handleSearch(e))


//Function that handles fetching anime from API
function handleSearch(e){
    e.preventDefault()
    document.querySelector('#searchResultLabel').classList.remove('hide')
    let searchCriteria = document.querySelector('#searchCriteria').value
    fetch(`https://api.jikan.moe/v4/anime?q=${searchCriteria}&sfw`).then(response => response.json()).then(data => createCard(data))
}

// Function that creates display cards for searched criteria
function createCard(data){
    let seriesArray = data.data
    //Tracks IDs of series that exist before creating new cards
    let existingSeries = []
    for(series of [...searchList.childNodes]){
        existingSeries.push(series.id)
    }
    for (series of [...savedList.childNodes]){
        existingSeries.push(series.id)
    }
    
    //For each series in the array of series create elements for the card
    seriesArray.forEach(series => {

        
        let card = document.createElement('div')
        //Gives cards the class card
        card.setAttribute('class', 'card')

        //Set Demographic Genre for each series
        card.setAttribute('demographic', '')
        if(series.demographics.length !== 0 ){
            card.setAttribute('demographic', `${series.demographics[0].name}`)
        }
        searchList.appendChild(card)
        
        //Create title node
        let title = document.createElement('h1')
        //Set title text = english title if english title exists
        if (series.title_english !== null){
            title.innerText = series.title_english
            card.appendChild(title)
        }
        //Title is set to default title if english title is not specified
        else{
            title.innerText = series.title
            card.appendChild(title)
        }

        //Give card unique ID of the series' title
        card.setAttribute('id', `${title.innerText}`)
        
    
        //Set an image for the series
        let img = document.createElement('img')
        img.setAttribute('src', `${series.images.jpg.image_url}`)
        card.appendChild(img)


        //Provide a summary of the series if available
        let summary = document.createElement('p')
        summary.innerText = series.synopsis
        if (series.synopsis == null){
            summary.innerText = 'No summary available'
        }
        card.appendChild(summary)

        //Add stars for rating
        let rating = document.createElement('ul')
        card.appendChild(rating)
        

        for (let i = 0; i<5; i++) { 
            let star = document.createElement('i')
            star.setAttribute('class', 'fa fa-star')
            rating.appendChild(star)

            //Rates the series by lighting up the appropriate amount of stars
            star.addEventListener('click', e => handleRating(e))
   
        }
      
        // Add button to add series to personal list
        let saveBtn = document.createElement('button')
        saveBtn.innerText = 'Add Series'
        saveBtn.style.height = '2rem'
        card.appendChild(saveBtn)

        saveBtn.addEventListener('click', e => addSeries(e))


        //If series ID already exists, card is removed to prevent duplicates
        if(existingSeries.includes(card.id)){
            card.remove()
        }
    })

//Function displays all stars through the clicked star to show rating
function handleRating(e){
    
    let star = e.target
    let rating = [...star.parentNode.childNodes]
    for (element of rating){
        element.classList.remove('checked')
    }
    star.classList.toggle('checked')
    
    let index = 0
    for (let i = 4; i>=0; i--){
        if(rating[i].classList.contains('checked')){
             index = i
        }
    }
    for (element of rating){
        if(rating.indexOf(element)<index){
            element.classList.toggle('checked')
        }
    }

}


    
}
//Sort by Genres
let genreSort = document.querySelector('#genre')

genreSort.addEventListener('input', () => sortLists())

function sortLists(){
    let searchSeries = searchList.childNodes
    let savedSeries = savedList.childNodes
    let seriesArray = ([...searchSeries].concat([...savedSeries]))


    let filteredSeries = seriesArray.filter(series => handleFilter(series)) 
    
 
    for (series of seriesArray){
        series.classList.remove('hide')
    }

    for(series of filteredSeries){
        series.classList.toggle('hide')

    }
    

}
//Filters series into a list containing all series that do not match the selected genre
function handleFilter(series){
    
    if(genreSort.value === '*'){
        return false
    }
    return element.attributes.demographic.value !== genreSort.value
}

//Add series to personal list
function addSeries(e){
    
    let series = e.target.parentNode
    savedList.appendChild(series)
    series.style.boxShadow = '10px 10px #e04b52';

    
}

//Hide and Show Search Results or Saved List
let hideButtons = document.querySelectorAll('.hideShow')

    //For each button in the hidebuttons array, add an event listener to hide the respsective list
    hideButtons.forEach(button => button.addEventListener('click', e => hideSearchResults(button)))
    
    

//Hide the respective list and change text of the respective button
function hideSearchResults(button){
    let listName = button.name+'List'
    let list = document.querySelector(`#${listName}`)
    
    list.classList.toggle('hide')
    if (list.classList.contains('hide')){
        document.querySelector(`[name = ${button.name}]`).innerText = `Show ${button.name}`
    }
    else{
        document.querySelector(`[name = ${button.name}]`).innerText = `Hide ${button.name}`
    }
    
}