import mongoose from 'mongoose';
import IUser from './user.service';
const UserSchema = new mongoose.Schema({
        first_name:{
            type: String,
            required: true,
        },
        last_name:{
            type: String,
            required: true,
        },
        email:{
            type: String,
            unique: true,
            index: true,
            required: true,
        },
        password:{
            type: String,
            require: true,
        },
        avatar:{
            type: String,
            //Khong yc => ko dien
        },
        date: {
            type: Date,
            default: Date.now,
        },
});

export default mongoose.model<IUser & mongoose.Document>('user', UserSchema);
//Khong can phai khai bao id trong schema nay vi Doc no co roi