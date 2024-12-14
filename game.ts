import { kv } from "./kv.ts";

export async function createRoom() {
  const roomId = crypto.randomUUID();
  const newRoom = { players: [], board: Array(9).fill(""), creationTime: Date.now() };
  await kv.set([`room:${roomId}`], newRoom);
  return roomId;
}

export async function playMove(roomId: string, player: string, position: number) {
  const room = await kv.get([`room:${roomId}`]);
  if (!room.value || room.value.players.length < 2) return null;
  const currentPlayer = room.value.players[room.value.players.length % 2];
  if (player !== currentPlayer) return null;
  room.value.board[position] = player;
  await kv.set([`room:${roomId}`], room.value);
  return room.value;
}

export async function joinRoom(roomId: string, player: string) {
  const room = await kv.get([`room:${roomId}`]);
  if (!room.value || room.value.players.length >= 2) return null;
  room.value.players.push(player);
  await kv.set([`room:${roomId}`], room.value);
  return room.value;
}
