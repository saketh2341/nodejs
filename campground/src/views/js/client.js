const socket=io()
const {username,passsword}=Qs.parse(location.search, {ignoreQueryPrefix: true})

socket.emit('join',{username,passsword},(error)=>{
    console.log(username)
})