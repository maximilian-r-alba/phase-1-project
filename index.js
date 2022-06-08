// Select form, add event listener for searching anime
let form = document.querySelector('#searchForm')
form.addEventListener('submit', e => handleSearch(e))



//Function that handles fetching anime from API
function handleSearch(e){
    e.preventDefault()
    
    let searchCriteria = document.querySelector('#searchCriteria').value
    fetch(`https://api.jikan.moe/v4/anime?q=naruto&sfw`).then(response => response.json()).then(data => createCard(data))
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
        card.setAttribute('class', 'card')
    
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

            //Change color of star if rated
            star.addEventListener('click', e => {
                star.classList.toggle('checked')
            })
            
   
        }
      
        // Add button to add series to personal list
        let saveBtn = document.createElement('button')
        saveBtn.innerText = 'Add Series'
        saveBtn.style.height = '2rem'
        card.appendChild(saveBtn)

        saveBtn.addEventListener('click', e => addSeries(e))


        

    })

}
//Add series to personal list
function addSeries(e){
    let series = e.target.parentNode
    console.log('its gone')
    let personalList = document.querySelector('#personalList')
    personalList.appendChild(series)
    
    

}

form.querySelector('.hideShow').addEventListener('click',e => hideSearchResults(e))
//Hide/Show Search Results
function hideSearchResults(e){

    document.querySelector('#generalList').classList.toggle('hide')
    if (document.querySelector('#generalList').className === 'hide'){
        document.querySelector('.hideShow').innerText = 'Show Search Results'
    }
    else{
        document.querySelector('.hideShow').innerText = 'Hide Search Results'
    }
    
}