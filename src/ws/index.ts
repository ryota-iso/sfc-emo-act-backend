import { Server } from "socket.io";
import { instrument } from "@socket.io/admin-ui";
import type { Server as HttpServer } from "http";
import { SocketIOServer, SocketIOSocket, SocketData } from "./index.types";
// import crypto from "crypto";

export const initSocketIO = (httpServer: HttpServer) => {
	// Socket.IOの初期化
	const io = new Server<SocketIOServer>(httpServer, {
		cors: {
			origin: [
				process.env.FRONT_URL || "http://localhost:3000",
				"https://admin.socket.io",
			],
			methods: ["GET", "POST"],
			credentials: true,
		},
	});

	// Admin UIの設定
	instrument(io, {
		auth: false,
		mode: "development",
	});

	// TODO: 認証の追加,  middlewareをセキュアにする
	// socket.data.roomの初期化
	io.use((socket, next) => {
		// const roomUUID = socket.handshake.query.roomUUID || crypto.randomUUID();
		const roomUUID = "test";
		socket.data.room = {
			uuid: roomUUID,
		};
		next();
	});
	// socket.data.userの初期化
	io.use((socket, next) => {
		const isHost = socket.handshake.query.isHost || false;
		socket.data.user = {
			isHost: Boolean(isHost),
		};
		next();
	});

	io.on("connection", async (socket: SocketIOSocket) => {
		console.log(
			`[Socket.IO /] Client connected: ${JSON.stringify(socket.data)}`,
		);

		// ルームに参加
		socket.join(socket.data.room.uuid);

		// 位置情報の更新を受信
		socket.on("locationUpdate", (location) => {
			console.log(`[Socket.IO /] locationUpdate: ${location}`);
			// 位置情報の更新を送信
			socket.to(socket.data.room.uuid).emit("locationUpdate", location);
		});

		// 切断時の処理
		socket.on("disconnect", () => {
			console.log("Client disconnected");

			if (socket.data.user.isHost) {
				// ルーム削除
				socket.to(socket.data.room.uuid).emit("roomDelete");
			}
		});
	});
};
