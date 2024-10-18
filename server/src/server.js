const express = require("express");
const userRouter = require("./routes/userRoutes");
const appointmentRouter = require("./routes/appointmentRoute");
const patientRouter = require("./routes/patientRoute");
const cors = require("cors");
const rateLimit = require("express-rate-limit");
const morgan = require("morgan");
const helmet = require("helmet");
const connectToDatabase = require("./config/dbConnection");
require("dotenv").config();
const cookieParser = require("cookie-parser");

// const csurf = require("csurf");
// const authenticateUser = require("./middlewares/authUser");

const app = express();
const PORT = process.env.PORT;

const corsOptions = {
  origin: "https://patient-health-care-dash-board.vercel.app/",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
  optionsSuccessStatus: 200,
};


const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: "Too many requests from this IP, please try again after 15 minutes.",
  headers: true,
});


connectToDatabase();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(limiter);
app.use(cookieParser());
app.use(helmet());
app.use(morgan("dev"));
app.use(cors(corsOptions));
app.use("/", userRouter);
app.use("/patient", patientRouter);
app.use("/appointment", appointmentRouter);

app.listen(PORT, () => {
  console.log(`server starts in http://localhost:${PORT}`);
});
