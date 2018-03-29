/*
 * 標準輸入
 */
# include<iostream>
int main() {
    int in = 0, sum = 0;
    while(std::cin>>in) {
        sum += in;
    }
    std::cout << "result is: "<< sum << std::endl;
    return 0;
}
