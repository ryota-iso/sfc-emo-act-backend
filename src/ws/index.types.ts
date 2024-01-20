import type { Server, Socket } from "socket.io";

type location = [number, number];

export type ServerToClientEvents = {
	locationUpdate: (location: location) => void; // 位置情報の更新を受信
	roomDelete: () => void; //                       ルーム削除を受信
};

export type ClientToServerEvents = {
	locationUpdate: (location: location) => void; // 位置情報の更新を送信
};

export type InterServerEvents = {
	ping: () => void;
};

export type SocketData = {
	room: {
		uuid: string;
	};
	user: {
		isHost: boolean;
	};
};

export type SocketIOServer = Server<
	ClientToServerEvents,
	ServerToClientEvents,
	InterServerEvents,
	SocketData
>;

export type SocketIOSocket = Socket<
	ClientToServerEvents,
	ServerToClientEvents,
	InterServerEvents,
	SocketData
>;
