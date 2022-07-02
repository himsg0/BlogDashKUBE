const mongoose=require('mongoose');

//const URI="mongodb://root:root@nodeapp-shard-00-00.pkh5k.mongodb.net:27017,nodeapp-shard-00-01.pkh5k.mongodb.net:27017,nodeapp-shard-00-02.pkh5k.mongodb.net:27017/myFirstDatabase?ssl=true&replicaSet=atlas-qxo1jk-shard-0&authSource=admin&retryWrites=true&w=majority"
//;
const URI="mongodb://admin:M9ED0THWL5P0D9QRUEZS@Kubeshop.in:27017/Kubeproject?authSource=admin";

const connectDB = async()=>{
    await mongoose.connect(URI,{
        useUnifiedTopology:true,
        useNewUrlParser: true
    });
    console.log('db connected !!');
};


module.exports = connectDB;