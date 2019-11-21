
module.exports = app => {
  const express = require("express");
  const inflection = require("inflection");
  const router = express.Router({
    mergeParams: true
  });

  router.post("/", async (req, res) => {
    const model = await req.model.create(req.body);
    res.send(model);
  });

  router.get("/", async (req, res) => {
    const items = await req.model.find().populate("parents").limit(100);
    res.send(items);
  })

  router.put("/:id", async (req, res) => {
    const model = await req.model.findByIdAndUpdate(req.params.id, req.body);
    res.send(model);
  });

  router.delete("/:id", async (req, res) => {
    await req.model.findByIdAndDelete(req.params.id, req.body);
    res.send({
      message: "successful"
    });
  });


  app.use("/admin/api/rest/:resource", (req, res, next) => {
    const resource = inflection.classify(req.params.resource);
    console.log(req.params, resource);
    req.model = require(`../../models/${resource}`);
    next();
  }, router);
}
