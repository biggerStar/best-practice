#include<iostream>
#include<string>
using namespace std;
int main(){
    // void getline();
    // getline();
    void cin();
    cin();
    return 0;
}
/* 读取一整行getline(cin,line)
 * 
 */
void getline(){
string line;
while(getline(cin, line)) {
    if (!line.empty())
        cout << line << endl;    
}}
/*
 * cin 以空格为分隔符，将键盘的输入存入缓存中
 */
void cin(){
    string c;
    while(std::cin >> c)
        cout << c << endl;
}
