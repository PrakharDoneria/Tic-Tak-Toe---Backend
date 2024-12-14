import { cron } from "./deps.ts";
import { kv } from "./kv.ts";

cron("0 0 0/1 * * *", async () => {
  const now = Date.now();
  for await (const entry of kv.list({ prefix: "room:" })) {
    const room = await kv.get(entry.key);
    if (room.value && now - room.value.creationTime > 45 * 60 * 1000) {
      await kv.delete(entry.key);
      console.log(`Room ${entry.key} deleted.`);
    }
  }
});
