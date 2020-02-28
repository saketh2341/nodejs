
const mongoose=require('mongoose')
const User=require('../models/user')
const mongodb=require('mongodb')
const MongoClent=mongodb.MongoClient
const ObjectId=mongodb.ObjectID
const message=require('../models/messages')
const connectionurl='mongodb://127.0.0.1:27017'
const databasename='task-manager-api2'


MongoClent.connect(connectionurl,{useNewUrlParser:true,useUnifiedTopology:true},(error,client) =>{
        if(error){
            return console.log('sadd')
        }
        const db=client.db(databasename)
    })



const adduser= async (id,username,password,room) =>{
    if(!username || !room){
        // return {
        //     error: 'Username and room are required!'
        // }
    }
    // const existinguser=await User.findOne({room:room})
    // if(existinguser) {console.log('hii')
    // //    return {
    // //     error:'User name is in use!'
    // //    }
    // }
    const user=new User({
            username:username,
            room:room,
            password:password,
            socketid:id
        })
        // console.log('hi')
       try{
           await user.save()
           return user
       }
       catch(e){
           console.log(e)
           
       }
        

}
const removeUser = (id) => {
    const user= User.findOneAndDelete({socketid:id})
    return user
}

// const getUser = (id) =>{
//     return users.find((user) => user.id === id)
// }

const getUser = async (id) =>{
  const user= await User.findOne({socketid:id})
  return user
}
const getUsersInRoom= (room) =>{
    const users=User.find({room:room})
        return users
}

// User.findOne({socketid:"TretsGQ1ihhkKr1EAAAA1234"}).then((user) =>{
//     console.log(user)
// }).catch((e)=>{
//   console.log(e)
// })


// adduser(1234,'suhani','suhani','suhani').then((user) =>{
//        console.log(user)
// }).catch((e) =>{
//     console.log(e)
// })

const storemessages= (usermessage,room,username) =>{
    
    
    const newmessage=new message({messages:usermessage,room:room,username:username,})
    newmessage.save().then((messages) =>{
        console.log(messages)
    }).catch((e)=>{
        console.log(e)
    })
}

const getallmesssages = (room) =>{
   const messages= message.find({room:room})
        // console.log(messages.createdAt.getTime())
        return messages
    // }).catch((e)=>{
    //     console.log(e)
    // })
}


// storemessages('hii','room','sakethreddy')

module.exports = {
    adduser,
    removeUser,
    getUser,
    getUsersInRoom,
    storemessages,
    getallmesssages
}
