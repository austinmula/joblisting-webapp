const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const morgan = require("morgan");
const dotenv = require("dotenv");
const helmet = require("helmet");
const useRoute = require("./routes/users");
const authRoute = require("./routes/auth");
const postRoute = require("./routes/posts");

const app = express();

//connect to mongoDb

dotenv.config();
mongoose.connect(
  process.env.DB_CONNECT,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => {
    console.log("Connected to database successfully");
  }
);

mongoose.set("useFindAndModify", false);
mongoose.set("useCreateIndex", true);

//middleware
app.use(express.json());
app.use(helmet());
app.use(cors());
app.use(morgan("common"));

app.use("/api/users/", useRoute);
app.use("/api/auth/", authRoute);
app.use("/api/posts/", postRoute);

app.listen(4000, () => {
  console.log(`Server running on port 4000`);
});
