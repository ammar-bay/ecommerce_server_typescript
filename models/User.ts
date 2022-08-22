import mongoose from "mongoose";

export interface IUser extends mongoose.Document {
  // _id: mongoose.Types.ObjectId;
  name: string;
  email: string;
  password: string;
  isAdmin: boolean;
  timestamps: Date;
  _doc: any;
}

const UserSchema = new mongoose.Schema<IUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isAdmin: { type: Boolean, required: true, default: false },
  },
  {
    timestamps: true,
  }
);

// module.exports = mongoose.model("User", UserSchema);
export default mongoose.model<IUser>("User", UserSchema);
