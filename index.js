//Select form, add event listener for searching anime
let form = document.querySelector('#searchAnime')
form.addEventListener('submit', e => handleSearch(e))

//Function that handles fetching anime from API
function handleSearch(event){
    event.preventDeafult()
    let searchCriteria = document.querySelector('#searchCriteria')
    fetch(`https://api.jikan.moe/v4/anime?q=${searchCriteria}&sfw`).then(response => response.json()).then(data => createCard(data))
}

//Function that creates display cards for searched criteria
function createCard(data){
    console.log(data)

}