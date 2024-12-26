const express = require("express");
const morgan = require("morgan");
const authRouter = require("./routes/LoginRoutes");
const errorHandler = require("./middlewares/errorHandler");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const app = express();
require("./config/database");
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(morgan("dev")); // Log all requests to the console
app.use(express.json()); // To read JSON
app.use(cookieParser());

app.use("/api", authRouter);

// Error handling middleware
app.use(errorHandler);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
