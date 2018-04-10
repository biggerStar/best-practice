/**
 * 创建对象
 */
// 直接量
var point = {x:0, y: 1}
var empty = {}

// 通过new创建
var arr = new Array();// new关键字后面跟随着 构造函数 的调用

//getter setter，不是函数，是函数的属性
//"存取器属性" ,和普通的属性类似
var p = {
    // x,y是普通的可读写的数据属性
    x:1.0,
    y:1.0,
    
    // r是可读写的存取器属性，它有getter和setter
    // 函数体结束 的时候要加上逗号
    get r() { return Math.sqrt(this.x * this.x + this.y * this.y},
    set r(newvalue){
        var oldvalue = Math.sqrt(this.x * this.x + this.y * this.y);
        var ratio = newvalue/oldvalue;
        this.x *= ratio;
        this.y *= ratio;
    },

    //theta是只读属性，它只有getter方法
    get theta(){return Math,atan2(this.y, this.x);}
};

//属性描述符
Object.getOwnPropertyDescriptor({x:1},"x")
//查询{x:1}对象的自有属性x的属性描述符。{ value: 1, writable: true, enumerable: true, configurable: true }, 如果是存取器属性，用get、set替代value,writable

//设置属性
Object.defineProperty()

/*
 * 对象的三个属性：原型，类， 可扩展性
 */
//原型
1、通过直接量创建的对象，具有同一个原型对象,通过Object.propotype获得对原型对象的引用
2、通过new 和构造函数创建的对象，其原型对象就是构造函数的prototype属性值。new Object()创建的对象的原型和通过字面量创建的对象的原型一样；new Data()创建对象的原型是Data.prototype
3.普通对象都有原型，Object.prototype没有原型。
4、原型的作用，继承属性
5、所有构造函数

原型链：
var o = {a: 1};

// o 这个对象继承了Object.prototype上面的所有属性
// o 自身没有名为 hasOwnProperty 的属性
// hasOwnProperty 是 Object.prototype 的属性
// 因此 o 继承了 Object.prototype 的 hasOwnProperty
// Object.prototype 的原型为 null
// 原型链如下:
// o ---> Object.prototype ---> null

var a = ["yo", "whadup", "?"];

// 数组都继承于 Array.prototype
// (Array.prototype 中包含 indexOf, forEach等方法)
// 原型链如下:
// a ---> Array.prototype ---> Object.prototype ---> null

function f(){
  return 2;
}

// 函数都继承于Function.prototype
// (Function.prototype 中包含 call, bind等方法)
// 原型链如下:
// f ---> Function.prototype ---> Object.prototype ---> null

使用构造器创建继承对象
function Graph() {
  this.vertices = [];
  this.edges = [];
}

Graph.prototype = {
  addVertex: function(v){
    this.vertices.push(v);
  }
};

var g = new Graph();
// g是生成的对象,他的自身属性有'vertices'和'edges'.
// 在g被实例化时,g.[[Prototype]]指向了Graph.prototype.


使用Object.create()创建继承对象
var a = {a: 1};
// a ---> Object.prototype ---> null

var b = Object.create(a);
// b ---> a ---> Object.prototype ---> null
console.log(b.a); // 1 (继承而来)

var c = Object.create(b);
// c ---> b ---> a ---> Object.prototype ---> null

var d = Object.create(null);
// d ---> null
console.log(d.hasOwnProperty); // undefined, 因为d没有继承Object.prototype

属性检测：
var o = {a:1}
o.hasOwnProperty("x") // x是不是o的自有属性
o.proptertyIsEnumerable("x") // x是不是o的可枚举属性

获取对象的原型：__proto__, 指向构造函数的prototype
var one = {x: 1};
one.__proto__ === Object.prototype //true
var date = new Date()
date.__proto__ === Date.prototype //true

isProtytypeOf()方法判断是否是对象的原型
var p = {x : 1}
var o = Object.create(p)
p.isPrototypeOf(o) //true
Object.prototype.isPrototypeOf(o) //true

var ff = new f();
f.prototype.isPrototypeOf(ff) //true. 通过new创建的对象ff，其原型对象是f.prototype

