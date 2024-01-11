const mongoose = require('mongoose');


const connectToCluster = async () =>{
    try{
        const conn = await mongoose.connect(process.env.DB_CONNECTION, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false            
        });
        console.log(`Successfully connected to: ${conn.connection.host}`);
    }catch (err){
        console.log(err);
        process.exit(1);
    }
}

module.exports = connectToCluster;