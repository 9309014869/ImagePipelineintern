import mongoose from "mongoose";

const ConnectionDB = async () => {

    try {
        await mongoose.connect(`mongodb://127.0.0.1:27017/ck`);
        console.log("MongoDB is Sucessfully Connected");
    } catch (error) {
        console.log(`ERROR,${error}`);
    }

};

export default ConnectionDB;