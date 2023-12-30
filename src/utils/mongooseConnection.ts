import mongoose from "mongoose";

const URI: string = process.env.MONGOOSE_URI || "mongodb+srv://pardeepsidhu07:0kWJsjrHicY8Bbwh@cluster0.xof0jzg.mongodb.net/";

export default async function mongooseConnection() {
    mongoose
        .connect(URI)
        .then((e) => {
            console.log("success");
        })
        .catch((e) => {
            console.log(e);
            console.log("failed");
        });
}
