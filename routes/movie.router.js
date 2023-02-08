import express from "express";
import {
  GetAllMovies,
  GetOneMovies,
} from "../Controllers/movies.controller.js";
import { authorize } from "../middleware/auth.js";

const router = express.Router();
// /movies
router.get("/getall", GetAllMovies); // authorize
router.get("/getone/:id", GetOneMovies); // authorize,

export default router;
