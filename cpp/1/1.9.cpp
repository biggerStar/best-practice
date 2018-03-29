/*
 * sum
 */
# include<iostream>

int main() {
    int begin = 50, end = 100, result = 0;
    while(begin <= end) {
        result += begin;
        begin ++;
    }
    std::cout << "the sum from 50 to 100 is: " << result << std::endl;
    return 0;
}
