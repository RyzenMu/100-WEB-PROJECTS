import express from "express";
import cors from "cors";
import {pushAuthData} from './apis.js'

const app = express();

app.use(cors());
app.use(express.json());

app.get("/hello", (req, res) => {
  res.send("Hello react");
});

app.post("/api/register", (req, res) => {
  const { username, password } = req.body;
  console.log("New registration -- backend", username, password);

  res.json({ msg: "Registration received" });
  pushAuthData(username, password);
  console.log('Registration successful');
});

app.listen(8000, () => {
  console.log("✅ Server started at http://localhost:8000");
});
