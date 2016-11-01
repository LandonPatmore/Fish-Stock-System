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
     void stockBox(BoxOfSeafood a, int amount){
          addingStock();
          for(int i = 0; i < amount; i++){
               if(a.getType() == "shrimp"){
                    a.setTotal(50);
                    shrimp.push_back(a);
               } else if (a.getType() == "lobster"){
                    a.setTotal(4);
                    lobster.push_back(a);
               } else if (a.getType() == "crab"){
                    a.setTotal(6);
                    crab.push_back(a);
               } else if(a.getType() == "swordfish"){
                    a.setTotal(8);
                    swordfish.push_back(a);
               } else {
                    cout << "Not an item we can stock." << endl;
               }
          }
          getStockInformation(getShrimp());

          if(a.getType() == "shrimp"){
               cout << "Shrimp: ";
               getStockInformation(getShrimp());
          } else if (a.getType() == "lobster"){
               cout << "Lobster: ";
               getStockInformation(getLobster());
          } else if (a.getType() == "crab"){
               cout << "Crab: ";
               getStockInformation(getCrab());
          } else if(a.getType() == "swordfish"){
               cout << "Swordfish: ";
               getStockInformation(getSwordfish());
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
          for(BoxOfSeafood i : v){
               i.toString();
               cout << " ";
          }
          cout << "\n" << endl;
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

class InputParsing{
public:
     string command = "";
     void getInput(){
          while (command != "exit") {
               cout << "Enter an event." << endl;
               string event, date, type;
               int amount;
               cin >> event >> date >> type >> amount;
               checkEvent(event, date, type, amount);
          }
     }

     void checkEvent(string e, string d, string t, int a){
          BoxCalculations c;
          BoxOfSeafood b;
          b.set_values(0, d, t);
          if(e == "stock"){
               c.stockBox(b, a);
          } else if(e == "buy"){

          } else {
               cout << "Invalid event." << endl;
          }
     }


};

int main(void){
     InputParsing i;
     i.getInput();

     return 0;
}
