
module.exports = app => {
  const express = require("express");
  const inflection = require("inflection");
  const assert = require('http-assert')
  const jwt = require('jsonwebtoken')
  const AdminUser = require('../../models/AdminUser')
  const router = express.Router({
    mergeParams: true
  });

  router.post("/", async (req, res) => {
    const model = await req.model.create(req.body);
    res.send(model);
  });

  router.get("/", async (req, res) => {
    const queryOptions = {}
    if (req.model.modelName === 'Category') {
      queryOptions.populate = 'parents'
    }
    const items = await req.model.find().setOptions(queryOptions).limit(100);
    res.send(items);
  })

  router.get("/:id", async (req, res) => {
    const model = await req.model.findById(req.params.id)
    res.send(model)
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


  const authMiddleware = require("../../middleware/auth");
  const resourceMiddleware = require("../../middleware/resource");

  app.use("/admin/api/rest/:resource", authMiddleware(), resourceMiddleware(), router);

  app.post("/admin/api/login", async (req, res) => {
    const { username : name, password } = req.body;
    // 1.根据用户名找用户
    const user = await AdminUser.findOne({ name }).select('+password');
    assert(user, 422, '用户不存在');
    // 2.校验密码
    const isValid = require('bcryptjs').compareSync(password, user.password);
    assert(isValid, 422, '密码错误');
    // 3.返回token
    const token = jwt.sign({ id: user._id }, app.get('secret'));
    res.send({ token });
  })

  const multer = require('multer');
  const upload = multer({ dest: __dirname + '/../../uploads' });
  app.post('/admin/api/upload', upload.single('file'), async (req, res) => {
    const file = req.file;
    console.log("file:", file);
    file.url = `http://localhost:3001/uploads/${file.filename}`;
    res.send(file);
  })

  // 错误处理函数
  app.use(async (err, req, res, next) => {
    // console.log(err)
    res.status(err.statusCode || 500).send({
      message: err.message
    })
  })
}
