//Compare robots:

function countStops(state, robot, memory) {
    for (let stop = 0;; stop++) {
      if (state.parcels.length == 0) return stop;
      let action = robot(state, memory);
      state = state.move(action.direction);
      memory = action.memory;
    }
  }


function compareRobots(robot1, memory1, robot2, memory2, epochs=10000) {
    let turns1 = 0, turns2 = 0;
    for (let i = 0; i < epochs; i++) {
        let state = VillageState.random();
        turns1 += countStops(state, robot1, memory1);
        turns2 += countStops(state, robot2, memory2);
    }
    console.log(`With ${epochs} epochs: Robot 1 average: ${turns1/epochs}, Robot 2 average: ${turns2/epochs}`)
}


//Robot efficiency:

function myRobot({place, parcels}, route) { //sorts routes array from smallest to largest so it can complete shortest routes first
    if (route.length == 0) {
        let routes = [];
        for (let parcel of parcels) {
            if (parcel.place != place) {
                routes.push(findRoute(roadGraph, place, parcel.place));
              } else {
                routes.push(findRoute(roadGraph, place, parcel.address));
              }
        }  
        routes = routes.sort((a, b) => a.length > b.length ? 1 : -1);
        return {direction: routes[0][0], memory: routes[0].slice(1)};
      }
    return {direction: route[0], memory: route.slice(1)};
}

function myRobot2({place, parcels}, route) {
    if (route.length == 0) {
        let collection_routes = [], delivery_routes = [];
        for (let parcel of parcels) {
            if (parcel.place != place) {
                collection_routes.push(findRoute(roadGraph, place, parcel.place));
              } else {
                delivery_routes.push(findRoute(roadGraph, place, parcel.address));
              }
        }  
        routes = collection_routes.sort((a, b) => { //returns an array routes which starts off with collection routes in order of length followed by delivery routes in order of lengths
            return a.length > b.length ? 1 : -1;
        }).concat(delivery_routes.sort((a, b) => a.length > b.length ? 1 : -1));
        return {direction: routes[0][0], memory: routes[0].slice(1)};
      }
    return {direction: route[0], memory: route.slice(1)};
}


//Persistent groups:

class PGroup {
    constructor(values=[]) {
        this.values = values;
    }

    add(value) {
        if (!this.values.includes(value)) {
            let newValues = this.values.slice(); // create a copy
            newValues.push(value)
            return new PGroup(newValues);
        }
        return this;
    }

    delete(value) {
        if (this.values.includes(value)) {
            let newValues = this.values.slice(); // create a copy
            newValues.splice(newValues.indexOf(value), 1)
            return new PGroup(newValues);
        }
        return this;
    }

    has (value) {
        return this.values.includes(value); 
    }

    static get empty() {
        return new PGroup();
    }
}


//MORE OPTIMAL SOLUTION:::

/*concat and filter are persistent array methods so they return a new array
without modifying the old one, hence there is no need to create a copy first */

class PGroup { 
    constructor(members) {
      this.members = members;
    }
  
    add(value) {
      if (this.has(value)) return this;
      return new PGroup(this.members.concat([value]));
    }
  
    delete(value) {
      if (!this.has(value)) return this;
      return new PGroup(this.members.filter(m => m !== value));
    }
  
    has(value) {
      return this.members.includes(value);
    }
}