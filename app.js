let button  = document.querySelector('#button')
let name    = document.querySelector('#name')
let height  = document.querySelector('#height')
let gender  = document.querySelector('#gender')
let planet  = document.querySelector('#planet')
let species = document.querySelector('#species')


function getData(){

    let randomNumber = Math.floor((Math.random() * 82) + 1)
    console.log(randomNumber)
    let apiUrl       = 'https://swapi.dev/api/people/' + randomNumber
    let personData

    axios.get(apiUrl).then(function(response){
        personData = response.data
        axios.get(response.data.homeworld).then(function(homeworldRes){
            let homeworldName        = homeworldRes.data.name
            personData.homeworldName = homeworldName
            var md                   = updateInfo(personData)
        })
        axios.get(response.data.species).then(function(speciesRes){
            let speciesName        = speciesRes.data.name
            personData.speciesName = speciesName
            var md                 = updateInfo(personData)
        })
    })
    .catch(function(error){
        console.log(error)
    })
}

function updateInfo(personData){
    name.innerText    = personData.name
    height.innerText  = personData.height
    gender.innerText  = personData.gender

    planet.innerText  = personData.homeworldName //returning a http
    species.innerText = personData.speciesName
}

button.addEventListener('click', getData)
