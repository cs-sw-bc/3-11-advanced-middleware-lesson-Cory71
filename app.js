import express from "express";
import notesRoute from "./routes/notes.js"

const app = express();


//1. Add a global middleware
app.use((req, res, next) => {
  console.log("Request received in global midddleware function");
  next();
});


app.get("/hello", (req, res) => {
  res.json({ message: "Hello" });
});

//2. Throw an error using new Error
app.get("/error", (req, res, next) => {
  const error = new Error("Something went wrong!");
  next(error);
});

//3. Throw an error with route-specific middleware function
app.get("/crash", (req, res, next) => {
  const alert= new Error("Dont access this Function");
  alert.status =401;
  next(alert);
});

app.use("/notes",notesRoute);

//4. Route not found middleware function
app.use((req, res, next) => {
  const error = new Error("Route not found");
  error.status = 404;
  next(error);
});


//5. Error middleware function
app.use((err,req, res, next) => {
  const statusCode = err.status || 500;
  res.status(statusCode).json({
    message: err.message || "Internal Server Error",
  });   
});

app.listen(3000, () => console.log("Server running on http://localhost:3000"));