import mongoose ,{Document} from "mongoose";

export interface IProduct extends Document {
  // _id: mongoose.Types.ObjectId;
  name: string;
  desc: string;
  img: string;
  categories: string[];
  size: string[];
  color: string[];
  price: number;
  brand: string;
  rating: number;
  numReviews: number;
  countInStock: number;
  timestamps: Date;
}

const ProductSchema = new mongoose.Schema<IProduct>(
  {
    name: { type: String, required: true },
    desc: { type: String, required: true },
    img: { type: String, required: true },
    categories: [{ type: String }],
    size: [{ type: String }],
    color: [{ type: String }],
    price: { type: Number, required: true },
    // inStock: { type: Boolean, default: true },
    brand: { type: String, required: true },
    rating: { type: Number, required: true, default: 0 },
    numReviews: { type: Number, required: true, default: 0 },
    countInStock: { type: Number, required: true, default: 0 },
  },
  { timestamps: true }
);

export default mongoose.model<IProduct>("Product", ProductSchema);
