const Order = require("../models/Order");
const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("./verifyToken");

const router = require("express").Router();

//CREATE

// router.post("/", verifyToken, async (req, res) => {
//   const newOrder = new Order(req.body);

//   try {
//     const savedOrder = await newOrder.save();
//     res.status(200).json(savedOrder);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

router.post("/", async (req, res) => {
  // const newOrder = new Order(req.body);
  console.log("got the req");
  console.log(req.body);
  try {
    const savedOrder = await Order.create({
      ...req.body,
    });
    res.status(200).json(savedOrder);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

//UPDATE
router.put("/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    const updatedOrder = await Order.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedOrder);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put("/:id/pay", async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    console.log(order);
    if (order) {
      if (order.isPaid) {
        return res
          .status(400)
          .send({ message: "Error: order is already paid" });
      }
      order.isPaid = true;
      order.paidAt = Date.now();
      order.paymentResult = {
        id: req.body.id,
        status: req.body.status,
        email_address: req.body.email_address,
      };
      const paidOrder = await order.save();
      res.send({ message: "order paid successfully", order: paidOrder });
    } else {
      res.status(404).send({ message: "Error: order not found" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

//DELETE
router.delete("/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    await Order.findByIdAndDelete(req.params.id);
    res.status(200).json("Order has been deleted...");
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET USER ORDERS
router.get("/find/:userId", verifyTokenAndAuthorization, async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.params.userId });
    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    console.log(order);
    // const orders = await Order.find({ userId: req.params.userId });
    res.status(200).json(order);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get("/history/:id", async (req, res) => {
  try {
    const orders = await Order.find({ user: req.params.id });

    console.log(orders);
    // const orders = await Order.find({ userId: req.params.userId });
    res.status(200).json(orders);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// //GET ALL

router.get("/", verifyTokenAndAdmin, async (req, res) => {
  try {
    console.log("getting all orders");
    const orders = await Order.find();
    console.log(orders);
    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET MONTHLY INCOME

// router.get("/income", verifyTokenAndAdmin, async (req, res) => {
  router.get("/admin/income",  async (req, res) => {
  // console.log("helllooooooooooooooooooooo");
  const productId = req.query.pid;
  // console.log(productId);

  const date = new Date();
  const lastMonth = new Date(date.setMonth(date.getMonth() - 1));
  const previousMonth = new Date(new Date().setMonth(lastMonth.getMonth() - 1));

  try {
    const income = await Order.aggregate([
      {
        $match: {
          createdAt: { $gte: previousMonth },
          ...(productId && {
            products: { $elemMatch: { productId } },
          }),
        },
      },
      {
        $project: {
          month: { $month: "$createdAt" },
          sales: "$amount",
        },
      },
      {
        $group: {
          _id: "$month",
          total: { $sum: "$sales" },
        },
      },
    ]);
    res.status(200).json(income);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
