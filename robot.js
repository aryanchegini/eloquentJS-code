const roads = [
  "Alice's House-Bob's House",   "Alice's House-Cabin",
  "Alice's House-Post Office",   "Bob's House-Town Hall",
  "Daria's House-Ernie's House", "Daria's House-Town Hall",
  "Ernie's House-Grete's House", "Grete's House-Farm",
  "Grete's House-Shop",          "Marketplace-Farm",
  "Marketplace-Post Office",     "Marketplace-Shop",
  "Marketplace-Town Hall",       "Shop-Town Hall"
];

function buildGraph(edges) {
  let graph = Object.create(null);
  function addEdge(from, to) {
    if (graph[from] == null) {
      graph[from] = [to];
    } else {
      graph[from].push(to);
    }
  }
  for (let [from, to] of edges.map(r => r.split("-"))) {
    addEdge(from, to);
    addEdge(to, from);
  }
  return graph;
}

const roadGraph = buildGraph(roads);
console.log(roadGraph);

class VillageState {
  constructor(place, parcels) {
    this.place = place;
    this.parcels = parcels;
  }

  move(destination) {
    if (!roadGraph[this.place].includes(destination)) {
      return this;
    } else {
      let parcels = this.parcels.map(p => {//update the parcel.place attribute for every parcel
        if (p.place != this.place) return p; // as its not been picked up yet so its place remains unchanged
        return {place: destination, address: p.address};
      }).filter(p => p.place != p.address); // if p.place == p.address then deliver the parcel, so it is removed
      return new VillageState(destination, parcels);
    }
  }
}

function randomPick(array) { //returns a random item from an array
  let choice = Math.floor(Math.random() * array.length);
  return array[choice];
}

VillageState.random = function(parcelCount = 5) {
  let parcels = [];
  for (let i = 0; i < parcelCount; i++) {
    let address = randomPick(Object.keys(roadGraph));
    let place;
    do {
      place = randomPick(Object.keys(roadGraph));
    } while (place == address);
    parcels.push({place, address});
  }
  return new VillageState("Post Office", parcels);
};

function findRoute(graph, from, to) { //AKA BREADTH FIRST SEARCH
  // Initialize the work queue with the starting point and an empty route
  let workQueue = [{ location: from, routeTaken: [] }];

  // Loop until all possible routes have been explored
  for (let i = 0; i < workQueue.length; i++) {
    // Extract the current location and route from the work queue entry
    let { location, routeTaken } = workQueue[i];
    
    // Explore each possible next location from the current location
    for (let nextLocation of graph[location]) {
      // If the next location is the destination, return the complete route
      if (nextLocation === to) return routeTaken.concat(nextLocation);
      
      // If the next location hasn't been visited yet, add it to the work queue
      if (!workQueue.some(item => item.location === nextLocation)) {
        workQueue.push({ location: nextLocation, routeTaken: routeTaken.concat(nextLocation) });
      }
    }
  }
}


function runRobot(state, robot, memory) {
  for (let turn = 0;; turn++) {
    if (state.parcels.length == 0) { //check if all parcels have been delivered or not
      console.log(`Done in ${turn} turns`);
      break;
    }

    let action = robot(state, memory); // robot decides an action to take and updates state and memory values
    state = state.move(action.direction);
    memory = action.memory;

    console.log(`Moved to ${action.direction}`);
  }
}

function goalOrientedRobot(state, route) { //{place, parcels} is a destructuting of the state object, an instance of the VillageState class
  if (route.length == 0) {
    let parcel = state.parcels[0];
    if (parcel.place != state.place) {
      route = findRoute(roadGraph, state.place, parcel.place); //plan a route to deliver the parcel
    } else {
      route = findRoute(roadGraph, state.place, parcel.address); //plan a route to collect the parcel
    }
  }
  return {direction: route[0], memory: route.slice(1)};
}
//finds a route for the next parcel and returns the next direction to take.
//if route is empty, that means that the parcel has been delivered and so robot takes the next parcel into account

// runRobot(VillageState.random(), goalOrientedRobot, []);


console.log(findRoute(roadGraph, "Ernie's House", "Marketplace"));




