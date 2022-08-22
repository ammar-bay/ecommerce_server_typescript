import mongoose from "mongoose";

interface product {
  productId: string;
  quantity: number;
}

export interface ICart extends mongoose.Document {
  // _id: mongoose.Types.ObjectId;
  userId: string;
  products: product[];
}

const CartSchema = new mongoose.Schema<ICart>(
  {
    userId: { type: String, required: true },
    products: [
      {
        productId: {
          type: String,
        },
        quantity: {
          type: Number,
          default: 1,
        },
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model<ICart>("Cart", CartSchema);
