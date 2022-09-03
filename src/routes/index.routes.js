import { Router } from "express";
const router = Router();

//Rutas de Login
router.get("/", async (req, res) => {  
  res.render("index");
});
router.get("/camera", async (req, res) => {  
  res.render("camera");
});
router.get("/image", async (req, res) => {  
  res.render("image");
});
router.post("/upload", async (req, res) => {  
  res.redirect("/image");
});

export default router;
