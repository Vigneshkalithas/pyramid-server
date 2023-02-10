import express from "express";
import {
  GetAllMovies,
  GetOneMovies,
} from "../Controllers/movies.controller.js";
import { authorize } from "../middleware/auth.js";

const router = express.Router();
// /movies
router.get("/getall", authorize, GetAllMovies); // authorize
router.get("/getone/:id", authorize, GetOneMovies); // authorize,

export default router;
