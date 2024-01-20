import express from "express";
import { prisma } from "../../libs/prisma";

const router = express();

router.get("/", async (req, res) => {
	res.send("users is working");
});

export default router;
