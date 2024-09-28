const express = require("express");
const app = express();
const mongoose = require("mongoose");
const { userInfo } = require("os");
const PORT = 3000;
// Connection :
mongoose
  .connect("mongodb://127.0.0.1:27017/UserInfo")
  .then(() => {
    console.log("Connected SuccesFully.");
  })
  .catch((err) => {
    console.log("Bhai! Errer Che Aaa:", err);
  });
//Schema:
const userschema = new mongoose.Schema({
  Name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  gender: {
    type: String,
    required: true,
  },
});
// Model :
const User = mongoose.model("user", userschema);

// Express Middleware
app.use(express.urlencoded({ extended: false }));

app.use((req, res, next) => {
  console.log("Hello MW-1"); //1
  req.Name = "Vaibhav";
  next(); //Now , Request is Forward to Next FUNction or code...
});
app.use((req, res, next) => {
  console.log("Hello MW-2"); //2
  console.log(`The Namme is : ${req.Name}`);
  next(); //Now , Request is Forward to Next FUNction or code...
});

app.get("/api/users", (req, res) => {
 
  res.setHeader("X-MyName", "vaibhav pandya");
  console.log(req.headers);
  return res.json(users); // When the user is on mobile, Then we give the response in JSON (API)
});

app.get("/users", (req, res) => {
  let HTML = `
  <ul>
    ${users.map((user) => `<li>${user.first_name}</li>`).join("")}
  </ul>
  `;
  res.send(HTML); // You will get an HTML document when you request /users
});
// Dyanmic parameter path:

app.route("/api/user/:id").get((req, res) => {
  let id = req.params.id;
  let userInfo = users.forEach((ele) => {
    if (ele.id == id) {
      return res.json(ele);
    }
  });
});
app.post("/api/users", async (req, res) => {
  
  let bodyData = req.body;
  const result = await User.create({
    Name : bodyData.Name,
    email : bodyData.email,
    gender : bodyData.gender
  });
  console.log("Result:",result);
  res.json({'msg':'Request SuccessFUUULLLY . '})
  
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is started on http://localhost:${PORT}`);
});
