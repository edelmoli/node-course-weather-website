console.log('Javascript client side is loaded')

// to call the request prepared with fetch


// to access the information from the form
const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message1')
const messageTwo = document.querySelector('#message2')

// messageOne.textContent = 'From JavaScript'

weatherForm.addEventListener('submit', (e) => {
    //this line is to avoid the page to be reloaded
    e.preventDefault()
   
    const location = search.value

    fetch('http://localhost:3000/weather?address=' + location ).then((response) => {
        //fetch('http://localhost:3000/weather?address=').then((response) => {
            response.json().then((data) => {
                console.log(data)
                if (data.error) {
                    console.log(data.error)
                    messageOne.textContent = data.error
                } else {
                    // console.log('It is currently ' + data.temperature + 'C and it feels like ' + data.feelslike + 'C. It is ' + data.weather_description + ' in ' + data.location)
                    messageOne.textContent = 'It is currently ' + data.temperature + 'C and it feels like ' + data.feelslike + 'C. It is ' + data.weather_description + ' in ' + data.location
                }
            })
        })
})
