继承
****
原型链继承
`SubType.prototype = new SuperType()`   
创建`SuperType`的实例并将该实例赋给`SubType.prototype`实现的。实现的本质是重写原型对象，代之以一个新类型的示例。存在于`SuperType`的实例中的所有属性和方法都将存在于`SubType.prototype`中。由于此时`SubType`的原型指向了`SuperType`的原型，所以`SubType`的`constructor`属性指向`SupeType`。   
注意：通过原型链继承时不能使用对象字面量创建原型方法，因为这样会重写原型链。  
缺点：     
1、没有办法在不影响所有对象实例的情况下，给超类型的构造函数传递参数。     
2、超类型构造函数包含引用类型的属性，在子类通过原型链继承后，子类所有的实例都将共享此属性，因此在某个子类实例上修改了此属性都将在其他子类实例上反映出来。
****
借用构造函数 `SuperType.call(this)`   
在SubType的构造函数内部调用SuperType的构造函数。`SuperType.call(this)` 。该继承方式可在子类型构造函数中向超类型构造函数传递参数。    
缺点：方法需要都在构造函数中定义，失去了函数复用。
****
组合继承    
使用原型链实现对原型属性和方法的继承，通过借用构造函数来实现对实例属性的继承。既通过在原型上定义方法实现了函数复用，又能够保证每个实例都有自己的属性。     
`SubType.prototype = new SuperType()` `SuperType.call(this)`        
缺点：无论什么情况下都会调用两次超类型构造函数：第一次创建子类型原型时，第二次子类型构造函数内部。
****
寄生组合式继承     
解决组合继承的缺点，不必为了指定子类型的原型而调用超类型的构造函数，因为我们需要的只是超类型原型的副本。因此可以使用寄生式继承来继承超类型的原型，再将结果指定给子类型的原型。     
function `inheritPrototype`(subType, superType) {     
    var prototype = Object.create(superType.prototype);     
    prototype.constructor = subType;        
    subType.prototype = prototype;  
}   
将组合继承中的`SubType.prototype = new SuperType();SubType.prototype.constructor = SubType;`替换为`inheritPrototype(SubType, SuperType);`即可。这样就避免了在`SubType.prototype`上面创建不必要的、多余的属性，而且还可以保持原型链不变。    
`最有效的基于类型继承方式`
****
寄生式继承   
其思路与寄生构造函数和工厂模式类似，即创建一个仅用于封装继承过程的函数，该函数在内部以某种方式来增强对象，最后再像真地是它做了所有工作一样返回对象。  
function `createAnother`(original) {  
var clone = Object.create(original);    
clone.sayHi = function () {     
console.log('hi');  
}   
return clone;   
}   
`Object.create()`函数不是必需的，任何能够返回新对象的函数都适用于此模式。
****
原型式继承   
function `create`(obj) {  
function F() {};    
F.prototype = obj;  
return new F();     
}   
ES5新增`Object.create()`方法规范化原型式继承。该方法接收两个参数：   
1、用作新对象原型的对象(只有此参数时和`create`方法一样);    
2、为新对象定义额外属性的对象(可选),会覆盖原型对象上的同名属性。
 