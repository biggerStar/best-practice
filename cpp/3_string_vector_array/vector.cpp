#include<iostream>
#include <sstream>
#include<vector>
using std::vector;
using namespace std;

int main(){
    vector<int> v;
    // add item to vector
    for ( int i = 0; i< 100; i++) {
        v.push_back(i);
    }
    // iterator vector
    for (auto v1 : v) {
        cout << v1 << endl;
    }

}
