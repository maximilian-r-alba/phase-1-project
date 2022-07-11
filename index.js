
let searchList = document.querySelector('#searchList')
let savedList = document.querySelector('#savedList')


let form = document.querySelector('#searchForm')
form.addEventListener('submit', e => handleSearch(e))



function handleSearch(e){
    e.preventDefault()
    let searchCriteria = document.querySelector('#searchCriteria').value

    
    let label = document.createElement('h2')
    label.setAttribute('id', 'searchResultLabel')
    

    
    if (searchList.childNodes.length !== 0){
        while(searchList.firstChild){
            searchList.removeChild(searchList.firstChild)
        }

    }
    
   
    searchList.appendChild(label)
    label.style.fontFamily = 'Lucida Console'
   
   
    if (searchCriteria !== ''){
        label.innerText = `Search results for ${searchCriteria}`
   }
    else{
        label.innerText = 'Search Results'
    }

    
    fetch(`https://api.jikan.moe/v4/anime?q=${searchCriteria}&sfw`).then(response => response.json()).then(data => createCard(data))
}


function createCard(data){
    let seriesArray = data.data
    
    let existingSeries = []
    for(series of [...searchList.childNodes]){
        existingSeries.push(series.id)
    }
    for (series of [...savedList.childNodes]){
        existingSeries.push(series.id)
    }
    
    
    seriesArray.forEach(series => {

        
        let card = document.createElement('div')
       
        card.setAttribute('class', 'card')

        
        card.setAttribute('demographic', '')
        if(series.demographics.length !== 0 ){
            card.setAttribute('demographic', `${series.demographics[0].name}`)
        }
        searchList.appendChild(card)
        
        
        let title = document.createElement('h1')
        
        if (series.title_english !== null){
            title.innerText = series.title_english
            card.appendChild(title)
        }
        else{
            title.innerText = series.title
            card.appendChild(title)
        }

       
        card.setAttribute('id', `${title.innerText}`)
        
    
        
        let img = document.createElement('img')
        img.setAttribute('src', `${series.images.jpg.image_url}`)
        card.appendChild(img)


        let summary = document.createElement('p')
        summary.innerText = series.synopsis
        if (series.synopsis == null){
            summary.innerText = 'No summary available'
        }
        card.appendChild(summary)

        
        let rating = document.createElement('ul')
        card.appendChild(rating)
        

        for (let i = 0; i<5; i++) { 
            let star = document.createElement('i')
            star.setAttribute('class', 'fa fa-star')
            rating.appendChild(star)

            
            star.addEventListener('click', e => handleRating(e))
   
        }
      
       
        let saveBtn = document.createElement('button')
        saveBtn.innerText = 'Add Series'
        saveBtn.style.height = '2rem'
        card.appendChild(saveBtn)

        saveBtn.addEventListener('click', e => addSeries(e))


        if(existingSeries.includes(card.id)){
            card.remove()
        }
    })


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

let genreSort = document.querySelector('#genre')

genreSort.addEventListener('input', () => sortLists())

function sortLists(){
   
    let searchSeries = [...searchList.childNodes].slice(1)
     console.log(searchSeries)
   
    let savedSeries = [...savedList.childNodes].slice(3)
    console.log(savedSeries)
    
    let seriesArray = (searchSeries.concat(savedSeries))

    
    let filteredSeries = seriesArray.filter(series => handleFilter(series)) 
    
    
    for (series of seriesArray){
        series.classList.remove('hide')
    }
    
    for(series of filteredSeries){
        series.classList.toggle('hide')

    }
    

}

function handleFilter(series){
   
    if(genreSort.value === '*'){
        return false
    }
    
    return series.attributes.demographic.value !== genreSort.value
}


function addSeries(e){
    
    let series = e.target.parentNode
    savedList.appendChild(series)
    series.style.boxShadow = '10px 10px #e04b52';
    e.target.remove()
    
   
    let toolBar = document.createElement('ul')
    series.appendChild(toolBar)
    
   

    
    let button = document.createElement('button')
    button.innerText = "Finish Series"
    button.style.height = '2rem'
    button.style.width = '50%'
    toolBar.appendChild(button)
    button.addEventListener('click', e => watchedSeries(e))

    
    let rmvBtn = document.createElement('button')
    rmvBtn.innerText = "Remove"
    rmvBtn.style.height = '2rem'
    rmvBtn.style.width = '50%'
    toolBar.appendChild(rmvBtn)
    rmvBtn.addEventListener('click', e => e.target.parentNode.parentNode.remove())


}


function watchedSeries(e){

    let series = e.target.parentNode.parentNode
    let top = savedList.querySelector('.card')
     series.classList.toggle('watched')
     if (e.target.innerText === "Rewatch?"){
         e.target.innerText = 'Finish Series'
         savedList.insertBefore(series, top)
     }

     else{
         e.target.innerText = "Rewatch?"
         savedList.appendChild(series)
     }
 }



let toggleButtons = document.querySelectorAll('.hideShow')


    toggleButtons.forEach(button => button.addEventListener('click', e => toggleTab(button)))





function toggleTab(button){
    let listName = button.name+'List'
    let list = document.querySelector(`#${listName}`)

    let tabs = document.getElementsByClassName('list')

    for (i = 0; i<tabs.length; i++){
        tabs[i].classList.add('hide')
    }
    list.classList.toggle('hide')
    document.querySelector('body').style.backgroundColor = button.style.backgroundColor
}