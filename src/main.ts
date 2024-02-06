import express from "express";
import type { Application, Request, Response, NextFunction } from "express";
import { createServer } from "http";
import { initSocketIO } from "./ws";
import dotenv from "dotenv";
import cors from "cors";

import indexRouter from "./routes/index";

dotenv.config();

const app: Application = express();
const httpServer = createServer(app);
initSocketIO(httpServer);

const port = process.env.PORT || 3000;
httpServer.listen(port, () => {
	console.log(`Server is running on port ${port}`);
});

/**
 * Express Middleware
 */
// CORS
const corsOptions = {
	origin: "https://localhost.brax.dev",
	optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));

// Body parser
app.use(express.json());

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

/**
 * Express Router
 */
app.use("/api", indexRouter);
