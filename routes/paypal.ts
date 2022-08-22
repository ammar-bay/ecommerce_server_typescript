import express, { Router } from "express";

const router: Router = express.Router();

router.get("/", (req, res) => {
  res.send(process.env.PAYPAL_CLIENT_ID || "sb");
});


export default router
