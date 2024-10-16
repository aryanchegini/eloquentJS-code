//A vector type:

class Vec {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    plus(vector) {
        return new Vec(this.x + vector.x, this.y + vector.y);
    }

    minus(vector) {
        return new Vec(this.x - vector.x, this.y - vector.y);
    }

    get length() {
        return Math.round(Math.sqrt(this.x * this.x + this.y * this.y));
    }
}

//Groups:

class Group {
    constructor(values=[]) {
        this.values = values;
    }

    add(value) {
        if (!this.values.includes(value)) {
            this.values.push(value);
        }
    }

    delete(value) {
        if (this.values.includes(value)) {
            this.values.splice(this.group.indexOf(value), 1);
        }
    }

    has (value) {
        return this.values.includes(value); 
    }

    static from(iterable) {
        let arr = iterable.reduce((group, item) => {
            if (!group.includes(item)) {
                group.push(item)
            }
            return group;
        }, [])
        return new Group(arr)
    }

    // [Symbol.iterator]() {
    //     return new GroupIterator(this);
    // }

    [Symbol.iterator] =  function*() { 
        for (let i = 0; i < this.values.length; i++) {
            yield this.values[i];
        } 
    }
}

//Iterable Groups:

class GroupIterator {
    constructor(group) {
        this.pointer = 0;
        this.group = group;
    }

    next() {
        if (this.pointer === this.group.values.length) return {done: true};

        let value = this.group.values[this.pointer];
        this.pointer++;
        return {value, done: false};
    }
}


for (let value of Group.from(["a", "b", "c"])) {
    console.log(value);
  }
  // → a
  // → b
  // → c



//Borrowing a function:
let map = {one: true, two: true, hasOwnProperty: true};

//Fix this call
//console.log(Object.prototype.hasOwnProperty.call(map, "one"))

console.log(Object.prototype.hasOwnProperty.call(map, "one"))
// → true
