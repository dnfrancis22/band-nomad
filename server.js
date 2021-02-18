const { cloudinary } = require("./utils/cloudinary");
const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
var cors = require("cors");

const app = express();

const PORT = process.env.PORT || 3001;

app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(express.json({ limit: "50mb" }));
app.use(express.static("client/build"));

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/band-nomad", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

const connection = mongoose.connection;

connection.on("connected", () => {
  console.log("Mongoose successfully connected!");
});

connection.on("error", (err) => {
  console.log("Mongoose connection error: ", err);
});

const MusicianController = require("./controllers/musicianController");

const ContactController = require("./controllers/contactController");

app.use(express.static("client/build"));
app.use(cors());

app.get("/api/config", (req, res) => {
  res.json({
    success: true,
  });
});
// app.post("/api/upload", async (req, res) => {

//   const fileStr = req.body.data;
//   const uploadResponse = await cloudinary.uploader.upload(fileStr, {
//     folder: "band_nomad",
//   });
//   console.log(uploadResponse);
//   let secureURL = uploadResponse.secure_url;
//   console.log(secureURL);
//   res.json(secureURL);


// });
// app.post("/api/upload", async (req, res) => {
//   try {
//     const fileStr = req.body.data;
//     const uploadResponse = await cloudinary.uploader.upload(fileStr, {
//       folder: "band_nomad",
//     });
//     console.log(uploadResponse);
//     let secureURL = uploadResponse.secure_url;
//     res.json({ msg: "yaya", url: secureURL });
//     console.log(secureURL);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ err: "Something went wrong" });
//   }
// });
// app.get('/api/images', async (req, res) => {
//   const { resources } = await cloudinary.search
//       .expression('folder:band_nomad')
//       .sort_by('secure_url', 'desc')
//       .max_results(30)
//       .execute();

//   const secure_url = resources.map((file) => file.secure_url);
//   res.send(secure_url);
// });

app.get("/api/images", async (req, res) => {
  const { resources } = await cloudinary.search
    .expression("folder:band_nomad")
    .sort_by("public_id", "desc")
    .max_results(30)
    .execute();

  const publicIds = resources.map((file) => file.public_id);
  res.send(publicIds);
});

app.use("/api/musician", MusicianController);

app.use("/api/contact", ContactController);

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client/build/index.html"));
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
