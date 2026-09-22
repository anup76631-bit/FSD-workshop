import express from "express";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());

app.post("/signup", (req, res) => {
  const { name, email, password, age } = req.body;

  console.log("Name:", name);
  console.log("Email:", email);
  console.log("Password:", password);
  console.log("Age:", age);

  res.json({
    message: "Signup successful!",
    user: {
      name,
      email,
      age
    }
  });
});

app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});
