/*
函数的元素：实参 + 调用函数的上下文(this)
如果函数挂载在一个对象上，就成为该对象的方法，该对象就是函数的上下文
js中，函数即对象，可以给函数设置属性和方法
函数可以嵌套在其他函数中定义，构成闭包；
*/

//嵌套函数
function hypotenuse(a, b){
    function square(x){ return x*x;};
    return Math.sqrt(square(a) + square(b));
}
//内部函数square()可以读写外部函数hypotenuse()定义的参数a, b

//函数调用
//函数代码在定义时不会被执行，只有在调用时才会被执行，调用方式有以下四种：
//1、作为函数
//2、作为方法
//3、作为构造函数
//4、通过他们的call() apply()方法间接调用

//函数定义,定义不会执行
function distance(x1,y2,x2,y2){
    var dx = x2 - x1;
    var dy = y2 - y1;
    return Math.sqrt(dx*dx + dy * dy);
}

var square = function(x){return x * x};

//函数调用
var total = distance(0,0,2,1) + distance(2,1,2,2)
var tensquared = (function(x) {return x*x}(10)); //在定义后立即调用

//方法调用
//方法调用无非是保存在一个对象中的函数的调用。
//加入o是一个对象，f是一个函数
o.m = f;//给对象o定义了一个方法m
o.m(); //方法调用,m有参数，这里为(),因此m被当作一个函数，而不是属性。
//方法调用和函数调用的重要区别在于：调用上下文。
var calculator = { //对象直接量
    x:1,
    y:2,
    add: function(){
        this.result = this.x+this.y;
    }
};
calculator.add();//调用方法,计算得到calculator.result=>3

//方法链，如果函数没有返回值时，返回this，就可以实现链式调用
//
//this:this没有作用域限制，嵌套的函数不会从调用它的函数中，继承this，如果嵌套函数作为方法调用（有对象），则this指向调用它的对象；如果嵌套函数作为函数调用，this不会指向调用外层函数的上下文！！this为undefined或者全局对象；如果在嵌套函数中要使用外层函数的this，需要用变量赋值的方式来获取
var o = {
    m:function(){
        var self = this;
        console.log(this === o); //true
        f();
        funtion f(){
            console.log(this === o) //false;
            console.log(self === o); //true
            }
    }
}

//构造函数
//没有参数传入的构造函数可以省略括号，但是函数不行
var o = new Object;
var o = new Object();

//构造函数继承自构造函数prototype属性。

//实参（调用时传入）和形参（声明时传入）
//js实参和形参的个数可以不一致，因此需要做一个检查
a = a || []; //a是形参的时候，做类型检查

//arguments数组可以获得实参，arguments[0]得到第一个实参，arguments[1]得到第二个实参
//本质上 arguments不是数组，是一个参数对象
//

//js对函数可以当成值来使用，赋值给变量或者传给对象作为参数。
function square(x){} //定义
var s = square; // s 和 square指代同一个函数
s(4)// 调用

var o = {square:function(x){return x*x;}} //对象直接量
var y = o.square(10); //函数调用

//函数作为数值使用
function add(x,y){return x + y}
function operate(operator, args1, args2){
    return operator(args1,args2)
}

//使用函数直接量
var operators = {
    add:function(x,y){return x + y}
    subtract:function(x,y){return x - y}
};
function operate2(operator, args1, args2){
    if(typeof operators[operator] == 'function')
        return operators[operator](args1, args2);
    else throw "unknown operator";
}

//js中的变量，如果不在函数中，就是全局的
//使用匿名函数可以避免污染全局空间
（function(){}());//定义结束立即调用

//函数的属性
//js的函数是一种特殊的对象，也可以有属性。利用属性可以给该函数保存一个“静态”的变量,用这种办法可以避免将变量写入global全局空间。
uniqueInteger.counter = 0;
function uniqueInterger(){
    return uniqueInteger.counter++;
}

