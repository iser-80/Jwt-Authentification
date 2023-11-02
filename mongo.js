const mongoose = require('mongoose')
 
const connectMongo= async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        }).then((res) => {
            console.log("mongo connection is done");
        });   
    } catch (error) {
        console.log(error)
    }
}


const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
}, 
    {timestamps: true}
)

const User = mongoose.model('User', UserSchema)

module.exports = {
    connectMongo,
    User,
}