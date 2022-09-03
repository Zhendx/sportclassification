import express from "express";
import session from "express-session";
import { create } from "express-handlebars";
import indexRoutes from "./routes/index.routes";
import path from "path";
import morgan from "morgan";
import multer from "multer";

const storage = multer.diskStorage({
  destination: path.join(__dirname, 'public/uploads'),
  filename: (req, file, cb) => {
    cb(null, 'imgTest.jpg')
  }
});

//Initializations
const app = express();

//settings
var hbs = create({});

app.set('port', process.env.PORT || 8000);
app.set("views", path.join(__dirname, "views"));
app.engine(
  ".hbs",
  create({
    layoutsDir: path.join(app.get("views"), "layouts"),
    partialsDir: path.join(app.get("views"), "partials"),
    defaulLayout: "main",
    extname: ".hbs",
  }).engine
);

app.set("view engine", ".hbs");

// register new function
hbs.handlebars.registerHelper('compareStrings', function(p, q, options) {
    return (p == q) ? options.fn(this) : options.inverse(this);
  });

//middlewares
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(session({
  secret: "mysecretapp",
  resave: true,
  saveUninitialized: true
}));
app.use(multer({
  storage,
  dest: path.join(__dirname, 'public/uploads')
}).single('image'));

//Routes
app.use(indexRoutes);

//Static files
app.use(express.static(path.join(__dirname, "public")));

export default app;