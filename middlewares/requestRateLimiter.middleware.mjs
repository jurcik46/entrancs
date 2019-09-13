import rateLimit from "express-rate-limit";
import { rateLimitOption } from "../configs/security.config.mjs";

const apiLimiter = rateLimit(rateLimitOption);
export default apiLimiter;
