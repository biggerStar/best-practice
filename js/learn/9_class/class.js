//类和构造函数，使用new关键字生成的class继承父类的原型
function Range(from , to) {
    this.from = from
    this.to = to
} // 构造方法
Range.prototype = {
    includes: function(x){ return this.from <= x && this.to >= x},
    foreach: function(f){ 
        for (var x = Math.ceil(this.from);x <= this.to; x++) f(x);
    },
    toString: function(){ return "(" + this.from + "..." + this.to + ")";}
};
var range = new Range(1,3)
range.include(2)
range.foreach(console.log);

r instanceof Range //如果r继承自Range.prototype, 则返回true

//constructor属性
//上面的例子中重新定义了prototype对象，但是一般不这样做，因为每个js函数都自动拥有一个prototype对象，该对象包含了constructor属性，指向自己的类
var o = new F()
o.constructor === F // true，constructor属性指代这个类
F.prototype.constructor === o.constructor // o自动获得原型F的prototype中的属性，原型独享的属性被类的所有实例继承

//instanceof
var r = new Range()
range instanceof Range
Range.prototype.isPrototypeOf(range)//检查Range是否为原型链上的方法

