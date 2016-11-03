#include <iostream>
#include <queue>
#include <cstring>

using namespace std;


class BoxOfSeafood{
protected:
     int total;
     string date;
     int currentAmount;
     string seafood;
     int buffer = 0;

public:
     void set_values(int t, string d, string type){
          total = t;
          date = d;
          currentAmount = t;
          seafood = type;

     }

     void setTotal(int t){
          total = t;
          currentAmount = t;
     }

     int getTotal(){
          return total;
     }

     string getDate(){
          return date;
     }
     int getCurrentTotal(){
          return currentAmount;
     }
     string getType(){
          return seafood;
     }
     void requestProduct(int requested){
          buffer = currentAmount - requested;

          if (buffer < 0){
               buffer = buffer * -1;
               requested = requested - buffer;
               currentAmount = currentAmount - requested;
               cout << "current amount: " << currentAmount << endl;
               cout << "buffer: " << buffer << endl;
          } else {
               currentAmount = currentAmount - requested;
               cout << "current amount: " << currentAmount << endl;
          }
     }
     void isEmpty(){
          if(currentAmount > 0){
               cout << "Not empty." << endl;
          } else {
               cout << "Empty." << endl;
          }
     }
     string isOpen(){
          if(currentAmount != total){
               return "o";
          } else {
               return "c";
          }
     }
     void toString(){
          cout << "Seafood[" << getTotal() << "(" << getCurrentTotal() << ")" << getDate() << "]" << isOpen() << endl;
     }
};

int main(){

     BoxOfSeafood b;

     b.set_values(50, "10/29/2016", "lobster");
     b.toString();
     b.requestProduct(65);
     b.toString();


     return 0;
}
