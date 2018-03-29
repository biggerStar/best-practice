#include<iostream>
int main(){
    int a = 2;
    const int *p = &a; // 指针p是一个指底层const，自身可变。指向的对象不能变(不能通过p来改变)
    p++;
    // *p++;
    // *p = 3; // 但是不能改变指向对象的值
    int *const p1 = &a; // p1是一个顶层指针，自身不能变
    // p1++;
    std::cout << *p << std::endl;
}
