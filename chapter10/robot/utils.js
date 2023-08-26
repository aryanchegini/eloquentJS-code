import roadGraph from "./graph.js";
import VillageState from "./village.js";

export function randomPick(array) {
  let choice = Math.floor(Math.random() * array.length);
  return array[choice];
}

export default function runRobot(state, robot, memory = []) {
  for (let turn = 0; ; turn++) {
    if (state.parcels.length == 0) {
      console.log(`Done in ${turn} turns`);
      break;
    }
    let action = robot(state, memory);
    state = state.move(action.direction);
    memory = action.memory;
    console.log(`Moved to ${action.direction}`);
  }
}

//compare robots

function countStops(state, robot, memory) {
  for (let stop = 0; ; stop++) {
    if (state.parcels.length == 0) return stop;
    let action = robot(state, memory);
    state = state.move(action.direction);
    memory = action.memory;
  }
}

export function compareRobots(
  robot1,
  memory1,
  robot2,
  memory2,
  epochs = 10000
) {
  let turns1 = 0,
    turns2 = 0;
  for (let i = 0; i < epochs; i++) {
    let state = VillageState.random();
    turns1 += countStops(state, robot1, memory1);
    turns2 += countStops(state, robot2, memory2);
  }
  console.log(
    `With ${epochs} epochs: Robot 1 average: ${
      turns1 / epochs
    }, Robot 2 average: ${turns2 / epochs}`
  );
}
