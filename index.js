const express = require("express");
const app = express();

const testRoute = require("./routes/testroute");
const pritamRoute = require("./routes/pritamroute");
const categoryRoute = require("./routes/categoryRoute");
const productRoute = require("./routes/productroute");
const userRoute = require("./routes/userRoute");

require("dotenv").config();
require("./databse/connection");

var cors = require("cors");

port = process.env.PORT || 8080;
app.use(express.json());
app.use(cors());

app.use("/category", categoryRoute);
app.use("/test", testRoute);
app.use("/pritam", pritamRoute);
app.use("/product", productRoute);
app.use("/user", userRoute);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port} `);
});
