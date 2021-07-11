

const weatherForm=document.querySelector('form')
const searchElem=document.querySelector('input')
const errorMessage=document.querySelector('#errorMessage')
const weatherOutput=document.querySelector('#weatherInfo')

weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault()
    errorMessage.textContent='loading...'
    weatherOutput.textContent=' '
    const location=searchElem.value
    fetch('/weather?address='+location).then((respnse)=>{
    respnse.json().then((data)=>{
        if (data.error){
            errorMessage.textContent=data.error
        }
        else{
            errorMessage.textContent=location
            weatherOutput.textContent=data.location
            weatherOutput.textContent=data.forcast
        }
    })
})
})