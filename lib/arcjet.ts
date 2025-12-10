import arcjet, {
  detectBot,
  fixedWindow,
  protectSignup,
  slidingWindow,
  sensitiveInfo,
  shield,
} from "@arcjet/next";
import { env } from "./env";

export {
  detectBot,
  fixedWindow,
  protectSignup,
  slidingWindow,
  sensitiveInfo,
  shield,
};

export default arcjet({
  key: env.ARCJET_KEY,
  rules: [
    shield({
      mode: "LIVE",
    }),
  ],
  characteristics: ["fingerprint"],
});
