#include<iostream>
using std::string;
using std::cin;
using namespace std;
int main() {
    string s;
    int create_string(int a);
    // cin >> s;
    // cout << s << endl;
    //create_string(1);
    //void add(string s1);
    //add("i");
    // void count_punct();
    // count_punct();
    //void change_string_2();
    //change_string_2();
    void convert();
    convert();
    return 0;
}

int create_string(int a){
    string st1(10,'c'), st2;
    cout << st1 << endl;
    return 0;
}

/*
 * + 号两边至少有一个是string。
 * string s = "hello" + ","; 错误，+号两侧都是字面值
 */
void add(string s1){
    string s2 = "hello" +s1;
  return;
}

/*
 * 操作String中的每一个字符 for( auto c : s)
 * ispunct(c) 判断c 是否为标点
 */
void count_punct(){
    string s("Hello World!!");
    int punct_size = 0;
    for (auto c : s) 
        if (ispunct(c))
            ++punct_size;
    cout << punct_size << " punctuation characters in" << s << endl;
    return;
}

/* 改变string中的字符，使用引用 
 * &c声明为引用c， 与s绑定在一次，改变c的值即改变s的值
 */
void change_string(){
    string s("Hello World!");
    for (auto &c : s){
        c = toupper(c);
    }
    cout << s <<endl;
}

/*
 * 改变string中所有的字符可以用for遍历，但是对于特定位置的字符，
 * - 使用下标
 * - 使用迭代
 */
void change_string_1(){
    // 把首字母改为大写
    string s("hello World!!");
    if (!s.empty())
        s[0] = toupper(s[0]);
    cout << s << endl;
}
/*
 * 使用迭代，把第一个单词改为大写
 */
void change_string_2(){
    string s("heelo world");
    for (decltype(s.size()) index = 0; index != s.size() && !isspace(s[index]) ; index ++)
        s[index] = toupper(s[index]);
    cout << s << endl;
}
/*利用下标随机访问string
 * 制作一个十进制到十六进制的转化器
 */
void convert() {
    const string h = "0123456789ABCDEF";
    string::size_type n;
    string result;
    while(cin >> n) {
        if (n < h.size()){
            result += h[n];
        }
    }
    cout << result << endl;

}
