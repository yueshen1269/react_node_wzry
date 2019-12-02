const express = require("express");

const app = express();
app.use(express.json());
app.use(require("cors")());

app.set('secret', 'i2u34y12oi3u4y8');

require("./routes/admin")(app);
require("./plugins/db")(app);

app.use("/uploads", express.static(__dirname + '/uploads'))
app.listen(3001, () => {
  console.log("http://localhost:3001")
});
