import express from "express";

import auth from "./auth";
import users from "./users";

const router = express.Router();

// ルーティングの設定
router.use("/auth", auth);
router.use("/users", users);

// health check
router.get("/health", (req, res) => res.status(200).send("healthy"));

export default router;
