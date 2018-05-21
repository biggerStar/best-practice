//create array
var b = []
var b1 = [1,2,"a",,new Object()] // 可以是任何类型元素，稀疏

var a = new Array()
var a1 = new Array(10) //指定长度
var a2 = new Array(4,5,6,"testing");//指定元素

//读写
var a = ["world"]
var value = a[0] //下标读
a[1] = "3.12" //下标写，自动扩展长度
var i = 2;
a[i] = 3; //写第二个元素
a[++i] = 4; // 写第三个元素

//数组是一个特殊的对象
//常规对象：
var o = {} //也可以使用下标进行读写
o[1]="one"// =>{ '1': 'one' }
//数组的特别之处在于，使用小于2的32次方的非负正数作为属性名时，数组回自动维护length值。
var a = [1,2]
a[-1.23]=1;//[ 1, 2, '-1.23': 1 ],a.length=2，添加了一个属性名为“1.23"的属性而已
a["1001"]=1;//a的长度变为1001
a[1.0];//等价于a[1]

//数组索引：仅仅是对象属性名称的一种特殊类型，因此js没有数组越界的概念

//添加、删除
a = []
a[0] = "zero"
a[1] = "one"

a.push("zero")
a.push("one")
//push在数组尾部加入一个元素，等同于a[a.length]赋值
shitf() //从头部添加一个元素

a = [1, 2, 3]
delete a[1]
//删除元素不会改变length，数组变成稀疏数组
pop()
unshift()

//遍历
// for + length: 以长度索引遍历数组
for(var i = 0; i < array.length; i++){}

//for in: 每次循环得到可枚举的属性名,包括继承的属性名，所以在数组上不应该使用for/in循环，除非使用过滤
for(var index in array){
    if (!a.hasOwnProperty(index))
        continue;
}

//forEach();按照索引的顺序按个传递给定于的一个函数，函数式风格 var data = [1,2,3,4,5]
data.forEach(function(x){console.log(x)});//1,2,3,4,5

//join
//join是spit()的逆向操作，把数组按照固定字符链接起来
var a = [1,2,3]
a.join()// 1,2,3
a.join(" ") // 1 2 3
a.join("-")//1-2-3

//reverse()
//在原先数组中从排序

//sort()
//默认升序
//带参数
a.sort(function(a,b){return b - a}) //降序

//concat() 创建返回新的数组
var a = [1,2,3]
a.concat(4,5) // [1,2,3,4,5]

//slice()
// 截断，包前不包后；-1指定最后一个元素，-3指定倒数第三个元素
var a = [1,2,3,4,5]
a.slice(0,3)// => 1,2,3
a.slice(3)//=> 4,5
a.slice(1,-1)//=> 2,3,4
a.slice(-3,-2)//=>3

//toString() toLocaleString()
//如果是toString()，会直接返回标准的格式；
//如果是toLocaleString()，先判断是否指定语言环境（locale），指定的话则返回当前语言环境下的格式设置（options）的格式化字符串；没有指定语言环境（locale），则返回一个使用默认语言环境和格式设置（options）的格式化字符串

/*ECMAScript 5中的数组方法
 */
//forEach()
//从头遍历数组，为每个元素调用指定的函数
var data = [1,2,3,4,5]
var sum = 0;
data.forEach(function(valune){sum += value;});

//map()
//与foreach使用方法一样，但是有返回值，返回一个新的数组
a = [1,2,3,]
b = a.map(function(value){return value * 3})

//filter()
a = [1,2,3,4]
smallvalues = a.filter(function(x){return x<3});
everyother = a.filter(function(x,i){return i%2==0})

//every() some()
//every()当且仅当所有元素都满足条件时，返回true，否则返回false
//some()至少有一个元素满足条件， 就返回true
a = [1,2,3,3]
a.every(function(x){return x<5}) //true
a.some(function(x){return x===1}) //true

//reduce() reduceRight()
//将元素按照指定的函数进行组合，生成单个值
var a = [1,2,3,4,5]
var sum = a.reduce(function(x, y){ return x + y},0);// =>   求和，15
var product = a.reduce(function(x, y){ return x * y}, 1) ;// => 积，120
var max = a.reduce(function(x, y){ return (x > y)? x: y}); // => 5

//reduceRight 从右到左进行reduce


//indexOf() lastIndexOf
a = [1,2,3,4,5]
a.indexOf(1) //=>0,1第一次出现到位置是0
a.lastIndexOf(1) //=>2, 最后一个1出现到位置是2
a.indexOf(0)//=>-1,没有出现过

//寻找所有在数组中出现的值x
function findall(a,x){
    var result = []
    const len = a.lenght;
    var pos = 0;
    while( pos < len) {
        pos = a.indexOf(x, pos);//从pos位置往后寻找
        if (pod == -1) break;
        result.push(pos);
        pos ++;
    }
    return result;
}

//Array.isArray()
Array.isArray([]) //true
Array.isArray({}) // false

//类数组对象
var a = {"0":"a","1":"b","2":"c",length:0}
a.join()//erro,a是对象，没有继承Array方法
Array.prototype.join.call(a)//'a,b,c'
Array.prototype.map.call(a,function(x){return x.toUpperCase();});//["A","B","C"]

//可索引的字符串
var s = test;
s.charAt(0)// 't'
s[1] // 'e'
//还可以使用类数组方法
Array.prototype.join.call(s," ") // "t e s t"
//注意，字符串是不可改变的，push,sort,reverse,splice等数组方法无法应用于数组

