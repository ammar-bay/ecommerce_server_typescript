const router = require("express").Router();

router.get("/", (req, res) => {
  res.send(process.env.PAYPAL_CLIENT_ID || "sb");
});


module.exports = router;
