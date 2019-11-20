const express = require("express");

const app = express();
app.use(express.json());
app.use(require("cors")());

require("./routes/admin")(app);
require("./plugins/db")(app);

app.listen(3001, () => {
  console.log("http://localhost:3001")
});
