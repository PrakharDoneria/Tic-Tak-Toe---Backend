import { createRoom, playMove, joinRoom } from "./game.ts";

export async function handleRequest(req: Request) {
  const url = new URL(req.url);
  if (url.pathname === "/createRoom") {
    const roomId = await createRoom();
    return new Response(JSON.stringify({ roomId }), { status: 200 });
  }
  if (url.pathname === "/play") {
    const { roomId, player, position } = await req.json();
    const room = await playMove(roomId, player, position);
    return room ? new Response(JSON.stringify(room), { status: 200 }) : new Response("Invalid Move", { status: 400 });
  }
  if (url.pathname === "/joinRoom") {
    const { roomId, player } = await req.json();
    const room = await joinRoom(roomId, player);
    return room ? new Response("Joined room successfully", { status: 200 }) : new Response("Room full or not found", { status: 400 });
  }
  return new Response("Not Found", { status: 404 });
}
