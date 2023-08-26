import { randomPick } from "./utils.js";
import roadGraph from "./graph.js";

export default function randomRobot(state) {
  return { direction: randomPick(roadGraph[state.place]) };
}
