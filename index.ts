import { serve } from "./deps.ts";
import { handleRequest } from "./routes.ts";
import "./cron.ts";

serve(handleRequest);
