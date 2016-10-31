#include <iostream>
#include <cstring>
#include <vector>
#include <algorithm>

using namespace std;

class BoxOfSeafood{
protected:
     int total;
     string date;
     int currentAmount;
     string seafood;

public:
     void set_values(int t, string d, string type){
          total = t;
          date = d;
          currentAmount = t;
          seafood = type;

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
     int requestProduct(int requested){
          currentAmount = currentAmount - requested;
          return currentAmount;
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
          cout << "Seafood[" << getTotal() << "(" << getCurrentTotal() << ")" << getDate() << "]" << isOpen();
     }
};

class BoxCalculations{
public:
     void addBoxToStock(BoxOfSeafood a){
          if(a.getType() == "shrimp"){
               shrimp.push_back(a);
          } else if (a.getType() == "lobster"){
               lobster.push_back(a);
          } else if (a.getType() == "crab"){
               crab.push_back(a);
          } else if(a.getType() == "swordfish"){
               swordfish.push_back(a);
          } else {
               cout << "Not an item we can stock." << endl;
          }
     }

     int getTotalOfStock(vector<BoxOfSeafood> v){
          int totalTotal = 0;
          for(BoxOfSeafood i : v){
               totalTotal = totalTotal + i.getTotal();
          }
          return totalTotal;
     }


     void addingStock(){
          cout << "Adding seafood to stockpile." << endl;
     }

     bool checkDates(BoxOfSeafood a, BoxOfSeafood b){
          return a.getDate() > b.getDate();
     }

     void getStockInformation(vector<BoxOfSeafood> v){
          addingStock();
          for(BoxOfSeafood i : v){
               i.toString();
               cout << " " << endl;
          }
     }

     vector<BoxOfSeafood> getShrimp(){
          return shrimp;
     }
     vector<BoxOfSeafood> getLobster(){
          return lobster;
     }
     vector<BoxOfSeafood> getCrab(){
          return crab;
     }
     vector<BoxOfSeafood> getSwordfish(){
          return swordfish;
     }

protected:
     vector<BoxOfSeafood> shrimp;
     vector<BoxOfSeafood> lobster;
     vector<BoxOfSeafood> crab;
     vector<BoxOfSeafood> swordfish;
};

int main(void){
     BoxCalculations c;
     BoxOfSeafood b;

     b.set_values(50, "10/31/16", "shrimp");
     c.addBoxToStock(b);
     b.set_values(12, "10/29/16", "shrimp");
     c.addBoxToStock(b);
     c.getStockInformation(c.getShrimp());

     return 0;
}


















































//TO BE USED LATER



// string command = "";
//
// while(command != "2"){
//      cout << "Welcome to the stock-system.  Pick an option: " << endl;
//      cout << "1. Enter new event." << endl;
//      cout << "2. Exit." << endl;
//      cin >> command;
//
//      if(command == "1"){
//           string a;
//      }else if(command != "1" && command != "2"){
//           cout << "Invalid number. Try again." << endl;;
//      }
//
// }
// cout << "Exiting stock-system." << endl;
