
const weather=document.querySelector('form')
const search=document.querySelector('input')
const messageone=document.querySelector('#message-1')
const messagetwo=document.querySelector('#message-2')
weather.addEventListener('submit',(e) =>{
    e.preventDefault()
    messageone.textContent='loading message'
    console.log(search.value)
    fetch('http://localhost:3000/weather?address=' + search.value).then((response) =>{
    response.json().then((data)=>{
        if(data.error){
            messageone.textContent=data.error
        }else{
            console.log(data.longitude)
            messageone.textContent=data.longitude
            messagetwo.textContent=data.latitude
        }
        
    })
})
})
