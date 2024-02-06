import type { Server, Socket } from "socket.io";

type location = [number, number];
type acceleration = { x: number | null; y: number | null; z: number | null };
type Feature = {
	min: number;
	max: number;
	avg: number;
};
type ActionFeature = {
	acceleration: {
		x: Feature;
		y: Feature;
		z: Feature;
	};
	location: {
		lat: Feature;
		lng: Feature;
	};
};

export type ServerToClientEvents = {
	// 位置情報の更新を受信
	locationUpdate: (location: location) => void;
	// ルーム削除を受信
	roomDelete: () => void;
};

export type ClientToServerEvents = {
	// 位置情報の更新を送信
	locationUpdate: (location: location) => void;
	// 行動の特徴量を送信
	actionFeatureUpdate: (feature: ActionFeature) => void;
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
