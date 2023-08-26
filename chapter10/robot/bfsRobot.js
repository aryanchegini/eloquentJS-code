import roadGraph from "./graph.js";

function bfs(graph, from, to) {
  let work = [{ at: from, route: [] }];
  for (let i = 0; i < work.length; i++) {
    let { at, route } = work[i];
    for (let place of graph[at]) {
      if (place == to) return route.concat(place);
      if (!work.some((w) => w.at == place)) {
        work.push({ at: place, route: route.concat(place) });
      }
    }
  }
}

export default function bfsRobot({ place, parcels }, route) {
  if (route.length == 0) {
    let collection_routes = [],
      delivery_routes = [];
    for (let parcel of parcels) {
      if (parcel.place != place) {
        collection_routes.push(bfs(roadGraph, place, parcel.place));
      } else {
        delivery_routes.push(bfs(roadGraph, place, parcel.address));
      }
    }
    let routes = collection_routes
      .sort((a, b) => {
        //returns an array routes which starts off with collection routes in order of length followed by delivery routes in order of lengths
        return a.length > b.length ? 1 : -1;
      })
      .concat(delivery_routes.sort((a, b) => (a.length > b.length ? 1 : -1)));
    return { direction: routes[0][0], memory: routes[0].slice(1) };
  }
  return { direction: route[0], memory: route.slice(1) };
}
