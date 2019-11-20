
module.exports = app => {
  const express = require("express");
  const router = express.Router();
  const Category = require("../../models/Category");
  router.post("/categories", async (req, res) => {
    const model = await Category.create(req.body);
    res.send(model);
  });
  router.get("/categories", async (req, res) => {
    const items = await Category.find().limit(100);
    res.send(items);
  })

  router.put("/categories/:id", async (req, res) => {
    const model = await Category.findByIdAndUpdate(req.params.id, req.body);
    res.send(model);
  });

  router.delete("/categories/:id", async (req, res) => {
    const model = await Category.findByIdAndDelete(req.params.id, req.body);
    res.send(model);
  });


  app.use("/admin/api", router);
}
