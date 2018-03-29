/**
 * 指针是一个对象，指针中存放的是地址
 * 根据“*”上下文判断，*是指针声明符还是解引用符。
 * int *p;//声明符，定义一个指针p
 * *p = 1；// 解引用符， p指向的对象赋值为1
 *  p = &a; // 赋值，指针p存放了a的地址。
 */
# include<iostream>
int main(){
    long ival = 42;
    long *p = &ival;
    long *p2 = p;
    std::cout << "p:" << p << std::endl;
    std::cout << "*p:" << *p << std::endl;
    std::cout << "*p2:" << *p2 << std::endl;
    p++;
    std::cout << "p:" << p << std::endl;
    std::cout << "*p:" << *p << std::endl;
}
