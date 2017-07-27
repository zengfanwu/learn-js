function SuperType(name) {
    this.name = name;
    this.colors = [1, 2, 3];
}

SuperType.prototype.sayName = function () {
    console.log(this.name);
}

function SubType(name, age) {
    SuperType.call(this, name);
    this.age = age;
}

function inheritPrototype(subType, superType) {
    var prototype = Object.create(superType.prototype);
    prototype.constructor = subType;
    subType.prototype = prototype;
}

inheritPrototype(SubType, SuperType);

// SubType.prototype = new SuperType();
// SubType.prototype.constructor = SubType;

SubType.prototype.sayAge = function () {
    console.log(this.age);
}

console.log(SubType.prototype.constructor)

var A = new SubType('five', 23);
A.colors.push(5);
console.log(A.colors);
A.sayName();
A.sayAge();

var B = new SubType('clark', 22);
console.log(B.colors);
B.sayName();
B.sayAge();

function create(obj) {
    function F() {}
    F.prototype = obj;
    return new F();
}