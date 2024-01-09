import dotenv from "dotenv";
import express, { Request, Response, NextFunction } from "express";
import cors from "cors";

import indexRouter from "./routes/index";

dotenv.config();

const app: express.Application = express();

// CORS
const corsOptions = {
	origin: process.env.CLIENT_URL,
	optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));

app.use(express.json());

// API v1
app.use("/api", indexRouter);

// error handler
function errorHandler(
	err: Error,
	req: Request,
	res: Response,
	next: NextFunction,
) {
	console.error(err.message);
	res.status(500).send("Something broke!");
}
app.use(errorHandler);

// Configurations
const port = process.env.PORT || 3000;

// Start server
app.listen(port, () => {
	console.log(`Example app listening on port ${port}`);
});
