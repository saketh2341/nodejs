const express=require('express')
const path=require('path')
const app=express()
const http=require('http')
const socketio=require('socket.io')
const {generatemessage,generatelocationmessage}=require('./utils/messages')
const {adduser,removeUser,getUser,getUsersInRoom,storemessages,getallmesssages} = require('./utils/users')


const port=process.env.PORT || 3000
const publicdirectorypath=path.join(__dirname,'../public')
const server=http.createServer(app)
const io = socketio(server)


app.use(express.static(publicdirectorypath))

app.get('/send' , (req,res) =>{
    res.redirect('public/index.html')
})



io.on('connection', (socket) =>{
    console.log('new websocket connection')

    socket.on('join', ({username,password,room},callback) =>{
            
        console.log(socket.id)
        adduser(socket.id,username,password,room).then((user) =>{          
            socket.join(user.room)

            socket.emit('message',generatemessage('Admin','welcome!'))
            socket.broadcast.to(user.room).emit('message',generatemessage('Admin',`${user.username} has joined`))
            getUsersInRoom(user.room).then((users)=>{
                io.to(user.room).emit('roomData',{
                    room:user.room,
                    users:users
                })
            })
            getallmesssages('warangal').then((messages) =>{
                // console.log(messages.length)    
                io.to(user.room).emit('allmessages',{
                        messages
                    })
                })
            

            callback()
        }).catch((error) =>{
            return callback('something went wrong')
        })
    })

    socket.on('sendmessage', (message,callback) =>{
        
        getUser(socket.id).then((user)=>{
           storemessages(message,user.room,user.username)
           io.to(user.room).emit('message', generatemessage(user.username,message))
        callback()
        }).catch((e) =>{
            callback('something wrong')
        })
    })
    socket.on('send location',(position,callback) =>{
       
        const user=getUser(socket.id).then((user) =>{
            
            io.to(user.room).emit('send location',generatelocationmessage(user.username, `http://google.com/maps?q=${position.latitude},${position.longitude}`))
            callback()
        }).catch((e) =>{
            callback('something wrong')
        })   
    })
    socket.on('disconnect', () =>{
        removeUser(socket.id).then((user) =>{
            io.to(user.room).emit('message',generatemessage('Admin',`has left!`))
            getUsersInRoom(user.room).then((users)=>{
                io.to(user.room).emit('roomData',{
                    room:user.room,
                    users:users
                })
            })
        })
    })
})



server.listen(port , () =>{
    console.log('server is up on' + port)
})