/*
 * 連續出現次數統計
 */
# include<iostream>

int main(){
    int currTimes = 0 , currentVal = -1, lastVal = -1;
    if (std::cin >> lastVal) {
        currTimes = 1;
        while(std::cin >> currentVal) {
            if (currentVal == lastVal) {
                currTimes ++;
            } else {
                std::cout << lastVal << " occurs " << currTimes << " times " << std::endl;
                lastVal = currentVal;
                currTimes = 1;
            }
        }
        std::cout << lastVal << " occurs " << currTimes<< std::endl;
    }

    return 0;
}

