const mongoose=require('mongoose')
// const bcrypt=require('bcryptjs')
mongoose.connect('mongodb://127.0.0.1:27017/messages',{
    useNewUrlParser:true,
    useCreateIndex:true,
    useUnifiedTopology:true
})



const messageSchema=new mongoose.Schema({
     messages:{
         type:String
     },
    room:{
        type:String,
        trim:true
    },
    username:{
        type:String
    }
},{
    timestamps:true
})

const messages=mongoose.model('messages',messageSchema)



// const message= new messages()

// message.messages=[{message:'saketh'},{name:'saketh'}]

// message.username='saketh'
// message.room='saketh'
// message.count=1

// message.save()

// const message=new messages({
//     room:'saketh',
//     username:'saketh'
// })

// message.messages[0]='saketh'
// message.messages[1]='saketh'
// message.count=2

// messages.find({room:'saketh'}).then(async (message) =>{
//    message.toString()
//     console.log(message)
//     message[0].messages=message[0].messages.concat(['suhani'],['suhani'])
//     message.save()
// //    users.save()
// }).catch((e)=>{
// console.log('some')
// })

// messages.findOneAndUpdate({count:3},{$inc: {count : 1} },{new:true}, (error,response) =>{
//    console.log(response)
// })

// message.save()

module.exports=messages