const mongoose=require('mongoose')
// const bcrypt=require('bcryptjs')
mongoose.connect('mongodb://127.0.0.1:27017/messages',{
    useNewUrlParser:true,
    useCreateIndex:true,
    useUnifiedTopology:true
})
const Objectid=mongoose.Schema.Types.ObjectId
const UserSchema= new mongoose.Schema({
    username:{
        type:String,
        required:true,
        trim:true
    },
    password:{
            type:String,
    },
    room:{
        type:String,
        required:true
    },
    socketid:{
        type:String
    }
})




const user=mongoose.model('user',UserSchema)


module.exports=user