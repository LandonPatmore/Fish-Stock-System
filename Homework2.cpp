#include <iostream>
#include <cstring>
#include <vector>
#include <algorithm>
#include <functional>

//used so that std:: does not have to be used every time
using namespace std;

/*
Author: Landon Patmore
Assignment Number: 2
Due: 11/3/2016
Description: Program to simulate stocking and selling multiple types of seafood.  When a customer requests
an item, the system checks to see if the stock can support it.  If the system has enough stock, it will sell
the items to the customer.  If there is not enough stock in the system, then the system will put that customer
on hold and will then sell to that customer waiting once the system has enough stock.

Implementation: The program uses vectors, while and for loops, standard library, and classes

Errors: There are no errors as the system knows when it can and cannot sell stock.

Future NOTE: After this is submitted, I want to find a way to be able to consolidate my code so that
there is not a lot of redundancies.
*/

//Class that creates boxes of seafood that are inserted into the queues.
class BoxOfSeafood{
protected:
     //total of the box
     int total;
     //date of box
     string date;
     //current running amount in the box
     int currentAmount;
     //name of the type of seafood entered
     string seafood;

public:
     //sets the values of the box of seafood (constructor type of method)
     void set_values(int t, string d, string type){
          total = t;
          date = d;
          currentAmount = t;
          seafood = type;
     }

     //used to set the total of the box manually
     void setTotal(int t){
          total = t;
          currentAmount = t;
     }
     //gets the total of the box no matter the current total
     int getTotal(){
          return total;
     }
     //gets the date of the box
     string getDate(){
          return date;
     }
     //gets the current total comparative to the whole total of the box
     int getCurrentTotal(){
          return currentAmount;
     }
     //gets the type of seafood in the box used to sort the box to the right queue
     string getType(){
          return seafood;
     }
     //requests an amount from the box and then returns the new current total in the box
     int requestProduct(int requested){
          currentAmount = currentAmount - requested;
          return currentAmount;
     }
     //checks to see if the box is open or closed and then returns it
     string isOpen(){
          if(currentAmount != total){
               return "o";
          } else {
               return "c";
          }
     }
     //toString method to print out the contents of the box in a nice format
     void toString(){
          cout << "Seafood[" << getTotal() << "(" << getCurrentTotal() << ")" << getDate() << "]" << isOpen();
     }
};

//does calculations to figure out what queue to put the box of seafood in and then able to
//buy and sell the box once its entered into the system
class BoxCalculations{
public:
     //method to stock the bo and takes a box of seafood as the parameter to check it's type to see what queue it's entered into
     void stockBox(BoxOfSeafood b){
          //checks to see if the type is equal to shrimp
          if(b.getType() == "shrimp"){
               //if it is shrimp, then it sets the total to 50
               b.setTotal(50);
               //it then pushes the box to the back of the vector
               shrimp.push_back(b);
               if(!shrimpQUEUE.empty() && getTotalOfStock(shrimp) > shrimpQUEUE.begin()->getCurrentTotal()){
                    buyStock(shrimpQUEUE.at(0), shrimpQUEUE.begin()->getCurrentTotal());
                    cout << "Selling " << shrimpQUEUE.begin()->getCurrentTotal() << " shrimp to waiting customer." << endl;
                    shrimpQUEUE.erase(shrimpQUEUE.begin());
               }
          } else if(b.getType() == "lobster"){
               b.setTotal(4);
               lobster.push_back(b);
               if(!lobsterQUEUE.empty() && getTotalOfStock(lobster) > lobsterQUEUE.begin()->getCurrentTotal()){
                    buyStock(lobsterQUEUE.at(0), lobsterQUEUE.begin()->getCurrentTotal());
                    cout << "Selling " << lobsterQUEUE.begin()->getCurrentTotal() << " lobster to waiting customer." << endl;
                    lobsterQUEUE.erase(lobsterQUEUE.begin());
               }
          } else if(b.getType() == "crab"){
               b.setTotal(6);
               crab.push_back(b);
               if(!crabQUEUE.empty() && getTotalOfStock(crab) > crabQUEUE.begin()->getCurrentTotal()){
                    buyStock(crabQUEUE.at(0), crabQUEUE.begin()->getCurrentTotal());
                    cout << "Selling " << crabQUEUE.begin()->getCurrentTotal() << " crab to waiting customer." << endl;
                    crabQUEUE.erase(crabQUEUE.begin());
               }
          } else if(b.getType() == "swordfish"){
               b.setTotal(8);
               swordfish.push_back(b);
               if(!swordfishQUEUE.empty() && getTotalOfStock(swordfish) > swordfishQUEUE.begin()->getCurrentTotal()){
                    buyStock(swordfishQUEUE.at(0), swordfishQUEUE.begin()->getCurrentTotal());
                    cout << "Selling " << swordfishQUEUE.begin()->getCurrentTotal() << " swordfish to waiting customer." << endl;
                    swordfishQUEUE.erase(swordfishQUEUE.begin());
               }
          }
     }

     void buyStock(BoxOfSeafood b, int amount){
          int buffer = amount;
          if(b.getType() == "shrimp"){
               if(!checkIfFullfill(shrimp, b, amount)){
                    while(buffer >= shrimp.at(setPriority(shrimp)).getCurrentTotal()){
                         int debuff = shrimp.at(setPriority(shrimp)).getCurrentTotal();
                         if(shrimp.size() > 1){
                              shrimp.erase(shrimp.begin() + setPriority(shrimp));
                              buffer = buffer - debuff;
                         } else {
                              break;
                         }
                    }
                    if(buffer <= getTotalOfStock(shrimp)){
                         shrimp.at(setPriority(shrimp)).requestProduct(buffer);
                         if(shrimp.at(setPriority(shrimp)).getCurrentTotal() == 0){
                              shrimp.clear();
                              cout << "\n" << endl;
                         }
                    }
               }
          } else if(b.getType() == "lobster"){
               if(!checkIfFullfill(lobster, b, amount)){
                    while(buffer >= lobster.at(setPriority(lobster)).getCurrentTotal()){
                         int debuff = lobster.at(setPriority(lobster)).getCurrentTotal();
                         if(lobster.size() > 1){
                              lobster.erase(lobster.begin() + setPriority(lobster));
                              buffer = buffer - debuff;
                         } else {
                              break;
                         }
                    }
                    if(buffer <= getTotalOfStock(lobster)){
                         lobster.at(setPriority(lobster)).requestProduct(buffer);
                         if(lobster.at(setPriority(lobster)).getCurrentTotal() == 0){
                              lobster.clear();
                              cout << "\n" << endl;
                         }
                    }
               }
          } else if(b.getType() == "crab"){
               if(!checkIfFullfill(crab, b, amount)){
                    while(buffer >= crab.at(setPriority(crab)).getCurrentTotal()){
                         int debuff = crab.at(setPriority(crab)).getCurrentTotal();
                         if(crab.size() > 1){
                              crab.erase(crab.begin() + setPriority(crab));
                              buffer = buffer - debuff;
                         } else {
                              break;
                         }
                    }
                    if(buffer <= getTotalOfStock(crab)){
                         crab.at(setPriority(crab)).requestProduct(buffer);
                         if(crab.at(setPriority(crab)).getCurrentTotal() == 0){
                              crab.clear();
                              cout << "\n" << endl;
                         }
                    }
               }
          } else if(b.getType() == "swordfish"){
               if(!checkIfFullfill(swordfish, b, amount)){
                    while(buffer >= swordfish.at(setPriority(swordfish)).getCurrentTotal()){
                         int debuff = swordfish.at(setPriority(swordfish)).getCurrentTotal();
                         if(swordfish.size() > 1){
                              swordfish.erase(swordfish.begin() + setPriority(crab));
                              buffer = buffer - debuff;
                         } else {
                              break;
                         }
                    }
                    if(buffer <= getTotalOfStock(swordfish)){
                         swordfish.at(setPriority(swordfish)).requestProduct(buffer);
                         if(swordfish.at(setPriority(swordfish)).getCurrentTotal() == 0){
                              swordfish.clear();
                              cout << "\n" << endl;
                         }
                    }
               }
          }
     }

     bool checkIfEnough(vector<BoxOfSeafood> v){
          if(v.size() > 1){
               return true;
          } else {
               return false;
          }

     }

     int setPriority(vector<BoxOfSeafood> v){
          int priority = 0;
          for(int i = 0; i < v.size(); i++){
               if(v.at(i).isOpen() == "o" && v.at(priority).isOpen() == "c"){
                    priority = i;
               } else if (v.at(i).isOpen() == "o" && v.at(priority).isOpen() == "o") {
                    if(v.at(i).getDate() < v.at(priority).getDate()){
                         priority = i;
                    }
               } else if (v.at(i).isOpen() == "c" && v.at(priority).isOpen() == "o"){
                    priority = priority;
               }else{
                    if(v.at(i).getDate() < v.at(priority).getDate()){
                         priority = i;
                    }
               }
          }
          return priority;
     }



     bool checkIfFullfill(vector<BoxOfSeafood> v, BoxOfSeafood b, int amount){
          if(b.getType() == "shrimp" && getTotalOfStock(v) < amount){
               cout << "Putting customer on queue for: " << amount << " units."<< endl;
               b.setTotal(amount);
               shrimpQUEUE.push_back(b);
               return true;
          }else if(b.getType() == "lobster" && getTotalOfStock(v) < amount){
               cout << "Putting customer on queue for: " << amount << " units."<< endl;
               b.setTotal(amount);
               lobsterQUEUE.push_back(b);
               return true;
          }else if(b.getType() == "crab" && getTotalOfStock(v) < amount){
               cout << "Putting customer on queue for: " << amount << " units."<< endl;
               b.setTotal(amount);
               crabQUEUE.push_back(b);
               return true;
          }else if(b.getType() == "swordfish" && getTotalOfStock(v) < amount){
               cout << "Putting customer on queue for: " << amount << " units."<< endl;
               b.setTotal(amount);
               swordfishQUEUE.push_back(b);
               return true;
          } else {
               return false;
          }
     }

     int getTotalOfStock(vector<BoxOfSeafood> v){
          int totalTotal = 0;
          for(BoxOfSeafood i : v){
               totalTotal = totalTotal + i.getCurrentTotal();
          }
          return totalTotal;
     }

     void getStockInformation(vector<BoxOfSeafood> v){
          if(v.size() != 0){
               cout << v.begin()->getType() << ": ";
               for(BoxOfSeafood i : v){
                    i.toString();
                    cout << " ";
               }
               cout << "" << endl;
          }
     }

     vector<BoxOfSeafood> getCorrectQueue(BoxOfSeafood b){
          if(b.getType() == "shrimp"){
               return shrimp;
          } else if(b.getType() == "lobster"){
               return lobster;
          } else if(b.getType() == "crab"){
               return crab;
          } else if(b.getType() == "swordfish"){
               return swordfish;
          } else {
               return shrimp;
          }
     }

protected:
     vector<BoxOfSeafood> shrimp;
     vector<BoxOfSeafood> lobster;
     vector<BoxOfSeafood> crab;
     vector<BoxOfSeafood> swordfish;
     vector<BoxOfSeafood> shrimpQUEUE;
     vector<BoxOfSeafood> lobsterQUEUE;
     vector<BoxOfSeafood> crabQUEUE;
     vector<BoxOfSeafood> swordfishQUEUE;
};

int main(int argc, char *argv[]){
     BoxOfSeafood b;
     BoxCalculations c;
     string event, date, type;
     int amount;

     while (cin >> event >> date >> type >> amount) {
          b.set_values(0, date, type);
          cout << "Event: " << event << " Date: " << date << " Type: " << type << " Amount " << amount << endl;;
          if (event == "stock") {
               cout << "Adding seafood to stockpile" << endl;
               for(int i = 0; i < amount; i++){
                    c.stockBox(b);
               }
               c.getStockInformation(c.getCorrectQueue(b));
          } else if (event == "buy") {
               cout << "Selling some product from stockpile" << endl;
               cout << "Using some resources from stockpile" << endl;
               c.buyStock(b, amount);
               c.getStockInformation(c.getCorrectQueue(b));
          }
     }

     return 0;
};
