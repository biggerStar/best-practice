/**
 * string的属性
 */
var s = "hello,world";
s.charAt(0);
s.charAt(s.length - 1);
s.substring(1,4);//=>ell, 2~4字符
s.slice(1,4); //=> ell, 同上
s.slice(-3); // =>rld, 最后三个字符
s.indexOf("h"); //=> 1, 字符h第一次出现的位置
s.lastIndexOf("l");//=>10,l最后一次出现的位置
s.indexOf("o", 3); //3,在三个字符及其之后出现“o”的位置
s.replace("h","H");
s.toUpperCase();//HELLO, WORLD

/**
 * js中有原始值和对象之分，原始值是：string, 数字，bool，null，undefine；
 * 原始值不可变，也没有属性
 * 包装对象：string，bool, 以及数字之所以可以有属性（他们并不是对象），是因为：只要引用了属性，js就会创建一个临时对象
 */
var S = new String(s);// s.charAt(0)其实是执行的S的属性。引用结束之后，会销毁S

/**
 * 不能对string添加属性，因为S已经销毁了,这个赋值操作发生在S身上
 */
s.len = 4
var t = s.len;
t;//t是一个null

/**
 * ==是将包装对象和原始值视为相等，===将他们视为不等
 * 对象的比较是引用的比较
 *
 */ 

var n = 1234.56677
n.toFixed() => "1234"
n.toFixed(1) => "1234.5"
parseInt("2 meter") => 2
parseFloat("3.14 per") => 3.14

parseInt("11", 2) => 3 // 二进制

/**
 * 全局变量是全局对象的一个属性
 * 同理，局部变量是跟函数调用相关的对象的一个属性
 */
var a = 1 ; // 声明一个不可删除的全局变量
 b = 2; // 创建全局对象的一个属性，可以删除的属性
delete a => false
delete b = > true

/**
 * 作用域链：
 * 定义一个函数的时候，会创建一个作用域链，链上有两个对象：
 * 1、定义函数参数和局部变量的对象
 * 2、全局变量
 * 如果该函数是嵌套函数，则链上会多一个对象
 *
 * 当函数使用一个变量x的时候，会去链上的第一个对象查找x，如果没有，则去下一个对象查找。
