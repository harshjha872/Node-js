const bodyParser = require("body-parser");
const express = require("express");
const fs = require("fs");
const path = require("path");
const adminRouter = require("./routes/admin");
const PublicRouter = require("./routes/public");
const detailRouter = require("./routes/productDetail");
// const Database = require('./Database/database');
const editRouter = require("./routes/editrouter");
const CartRouter = require("./routes/cartRoute");
const mongoose = require("mongoose");
// const User = require('./modals/user');
const session = require("express-session");
const MongoConnectSession = require("connect-mongodb-session")(session);
const Auth = require("./routes/Auth");
const Protectroute = require("./routes/ProtectRoutes");
const flash = require("connect-flash");
const multer = require("multer");

const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

app.use(bodyParser.urlencoded({ extended: false }));

//UPLOADS

const multerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images");
  },
  filename: (req, file, cb) => {
    cb(null, Math.random() + "-" + file.originalname);
  },
});

const filterFile = (req, file, cb) => {
  if (
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/png"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

app.use(
  multer({ storage: multerStorage, fileFilter: filterFile }).single("image")
);

app.use(express.static(path.join(__dirname, "public")));
app.use(express.static(path.join(__dirname, "images")));

//SESSIONS

const MongoStore = new MongoConnectSession({
  uri: "mongodb+srv://harshjha:Harshjha872aps@node-first.yyzhe.mongodb.net/shop?retryWrites=true&w=majority",
  collection: "sessions",
});

app.use(
  session({
    secret: "My secret",
    resave: false,
    saveUninitialized: false,
    store: MongoStore,
  })
);

//FlASHES

app.use(flash());

//ROUTES

app.use(Auth);
app.use(PublicRouter);
app.use("/product", detailRouter);

app.get("/download/:imageUrl", (req, res, next) => {
  const ImageName = req.params.imageUrl;
  const Imagepath = path.join("images", ImageName);
  // fs.readFile(Imagepath, (err, data) => {
  //   if (err) {
  //     console.log(err);
  //   }
  //   res.send(data);
  // });
  res.download(Imagepath);
});

app.use("/admin", Protectroute, adminRouter);
app.use(Protectroute, CartRouter);
app.use("/editproduct", Protectroute, editRouter);

app.use((req, res, next) => {
  res.status(404).render("pnf", {
    title: "Page not found",
    activeClass: "",
    route: "",
    isloggedIn: req.session.loggedIn,
  });
});

mongoose
  .connect(
    "mongodb+srv://harshjha:Harshjha872aps@node-first.yyzhe.mongodb.net/shop?retryWrites=true&w=majority"
  )
  .then(() => {
    app.listen(3000);
  })
  .catch((err) => console.log(err));
