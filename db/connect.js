import mongoose from "mongoose";

//basics for connection to database. ported to app.js
// mongoose
//     .connect(process.env.DB)
//     .then(() => console.log('connected to the database'))
//     .catch((err)=> console.log(err))

//this can handle multiple connections
const connectDB = (url) => {
    return mongoose.connect(url)
}

// since we created a function we need to return it. 
export default connectDB