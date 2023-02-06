const express = require("express"); // server library
const mongoose = require("mongoose"); // mongoose
const students = require("./routers/StudentsRoute"); // import the router

const app = express();
const PORT = 3000;

app.use(express.static("public"));

// middleware - connect between the server to the client.
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// use the router for students:
app.use("/students", students);

// Connect to MongoDB using mongoose - to Stock database.
mongoose.connect(
  "mongodb+srv://orelmagori:OrelM217@cluster0.50ase9q.mongodb.net/?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

app.listen(PORT, () => console.log(`Listening in port ${PORT}`));
