//Retry:

class MultiplicatorUnitFailure extends Error {}; 
// An efficient way of creating your own type of error which you can specifically look for in a catch block

function primitiveMultiply(a, b) {
  if (Math.random() < 0.2) {
    return a * b;
  } else {
    throw new MultiplicatorUnitFailure("Klunk");
  }
}

function reliableMultiply(a, b) {
  try {
    return primitiveMultiply(a, b);
  } catch(e) {
    if (e instanceof MultiplicatorUnitFailure) return reliableMultiply(a, b);
    else throw e;
  }
}

//SOLUTION ON EJ SANDBOX:
// function reliableMultiply(a, b) {
//     for (;;) {
//         try {
//         return primitiveMultiply(a, b);
//         } catch (e) {
//         if (!(e instanceof MultiplicatorUnitFailure))
//             throw e;
//         }
//     }
// }

console.log(reliableMultiply(8, 8));
// → 64

//The locked box:

function withBoxUnlocked(body) {
    if (box.locked) locked = true;
    box.unlock();
    try {
        return body();
    } finally {
        box.lock();
        locked ? box.lock() : box.unlock();
    }
}