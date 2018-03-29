/**
 * reference 是对象的一个别名，与对象具有绑定关系
 * int &r; // error,引用需要初始化
 * int &r = 10; // 引用类型的初始值必须是一个对象
 * double d = 3.14; int &r = d; // error 此处引用类型的初始值必须为int对象
 */

# include<iostream>
int main() {
    int i , &ri = i;
    int &rr;
    i = 5;
    ri = 10;
    std::cout << i << " " << ri << std::endl;
}

