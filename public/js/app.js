const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-one')
const weatherIcon = document.querySelector('#weather-icon')
const messageTwo = document.querySelector('#message-two')

weatherForm.addEventListener('submit', (e) => {
  e.preventDefault()

  const location = search.value
  messageOne.textContent = 'Loading'
  weatherIcon.style.display = "none"
  messageTwo.textContent = ''

  fetch('/weather?address=' + location).then((response) => {
    response.json().then((data) => {
      if (data.error) {
        console.log(data.error)
        messageOne.textContent = data.error
      } else {
        messageOne.textContent = data.location
        console.log(data.forecast)
        weatherIcon.src = data.forecast.weatherIcon
        weatherIcon.style.display = "block"
        messageTwo.textContent = data.forecast.weatherInfo
      }
    })
  })
})
