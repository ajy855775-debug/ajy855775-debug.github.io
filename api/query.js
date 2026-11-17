import worker from "../src/rank-score-helper.js";

export const config = { runtime: "edge" };

export default function handler(request) {
  return worker.fetch(request);
}
