import express from "express";
import expressAsyncHandler from "express-async-handler";
import Order from "../models/orderModel.js";
import { isAuth } from "../util.js";

const orderRouter = express.Router();

orderRouter.post(
  "/",
  isAuth,
  expressAsyncHandler(async (req, res) => {
    if (req.body.orderItems.length === 0) {
      res.status(400).send({ message: "cart empty" });
    } else {
      const newOrder = new Order({
        orderItems: req.body.orderItems,
        user: req.user._id,
        shipping: req.body.shipping,
        payment: req.body.payment,
        itemsPrice: req.body.itemsPrice,
        taxPrice: req.body.taxPrice,
        shippingPrice: req.body.shippingPrice,
        totalPrice: req.body.totalPrice,
      });
      const orderCreated = await newOrder.save();
      res
        .status(201)
        .send({ message: "New Order Created", data: orderCreated });
    }
  })
);

orderRouter.get("/", isAuth, async (req, res) => {
  const orders = await Order.find({}).populate("user");
  res.send(orders);
});
orderRouter.get("/mine", isAuth, async (req, res) => {
  const orders = await Order.find({ user: req.user._id });
  res.send(orders);
});

orderRouter.get("/:id", async (req, res) => {
  const order = await Order.findOne({ _id: req.params.id });
  if (order) {
    res.send(order);
  } else {
    res.status(404).send("Order Not Found.");
  }
});

// orderRouter.delete("/:id", async (req, res) => {
//   const order = await Order.findOne({ _id: req.params.id });
//   if (order) {
//     const deletedOrder = await order.remove();
//     res.send(deletedOrder);
//   } else {
//     res.status(404).send("Order Not Found.");
//   }
// });

// orderRouter.post("/", async (req, res) => {
//   const newOrder = new Order({
//     orderItems: req.body.orderItems,
//     shipping: req.body.shipping,
//     payment: req.body.payment,
//     itemsPrice: req.body.itemsPrice,
//     taxPrice: req.body.taxPrice,
//     shippingPrice: req.body.shippingPrice,
//     totalPrice: req.body.totalPrice,
//   });
//   const newOrderCreated = await newOrder.save();
//   res.status(201).send({ message: "New Order Created", data: newOrderCreated });
// });

orderRouter.put("/:id/pay", async (req, res) => {
  const order = await Order.findById(req.params.id);
  if (order) {
    order.isPaid = true;
    order.paidAt = Date.now();
    order.payment = {
      paymentMethod: "paypal",
      paymentResult: {
        payerID: req.body.payerID,
        orderID: req.body.orderID,
        paymentID: req.body.paymentID,
      },
    };
    const updatedOrder = await order.save();
    res.send({ message: "Order Paid.", order: updatedOrder });
  } else {
    res.status(404).send({ message: "Order not found." });
  }
});
export default orderRouter;
