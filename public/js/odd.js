
// to call the request prepared with fetch


// to access the information from the form
const teamsForm = document.querySelector('form')
const team = document.querySelector('input')
const messageOne = document.querySelector('#message1')
const messageTwo = document.querySelector('#message2')

// messageOne.textContent = 'From JavaScript'
console.log('start of odds.js')
console.log(team)
teamsForm.addEventListener('submit', (e) => {
    //this line is to avoid the page to be reloaded
    e.preventDefault()
   
    const teamOdd = team.value
    console.log(team)

    fetch('http://localhost:3000/odds?team=' + teamOdd ).then((response) => {
        //fetch('http://localhost:3000/weather?address=').then((response) => {
            response.json().then((data) => {
                console.log(data)
                if (data.error) {
                    console.log(data.error)
                    messageOne.textContent = data.error
                } else {
                    // console.log(data.listMatches.home_team)
                    // console.log('It is currently ' + data.temperature + 'C and it feels like ' + data.feelslike + 'C. It is ' + data.weather_description + ' in ' + data.location)
                    messageOne.textContent = data.homeTeam + '   vs  ' + data.awayTeam + '  odds:  ' + JSON.stringify(data.odd) + ' today starts at: ' + data.startDateTime + '  result:  ' + data.result
                }
            })
        })
})
