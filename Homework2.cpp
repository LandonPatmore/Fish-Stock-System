#include <iostream>
#include <cstring>
#include <vector>
#include <algorithm>
#include <functional>

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
     void stockBox(BoxOfSeafood b){
          //cout << "Adding seafood to stockpile." << endl;
          if(b.getType() == "shrimp"){
               b.setTotal(50);
               shrimp.insert(shrimp.begin(), b);
               if(!shrimpQUEUE.empty() && getTotalOfStock(shrimp) > shrimpQUEUE.begin()->getCurrentTotal()){
                    buyStock(shrimpQUEUE.at(0), shrimpQUEUE.begin()->getCurrentTotal());
                    cout << "Selling " << shrimpQUEUE.begin()->getCurrentTotal() << " shrimp to waiting customer." << endl;
                    shrimpQUEUE.erase(shrimpQUEUE.begin());
               }
          } else if(b.getType() == "lobster"){
               b.setTotal(4);
               lobster.insert(lobster.begin(), b);
               if(!lobsterQUEUE.empty() && getTotalOfStock(lobster) > lobsterQUEUE.begin()->getCurrentTotal()){
                    buyStock(lobsterQUEUE.at(0), lobsterQUEUE.begin()->getCurrentTotal());
                    cout << "Selling " << lobsterQUEUE.begin()->getCurrentTotal() << " lobster to waiting customer." << endl;
                    lobsterQUEUE.erase(lobsterQUEUE.begin());
               }
          } else if(b.getType() == "crab"){
               b.setTotal(6);
               crab.insert(crab.begin(), b);
               if(!crabQUEUE.empty() && getTotalOfStock(crab) > crabQUEUE.begin()->getCurrentTotal()){
                    buyStock(crabQUEUE.at(0), crabQUEUE.begin()->getCurrentTotal());
                    cout << "Selling " << crabQUEUE.begin()->getCurrentTotal() << " crab to waiting customer." << endl;
                    crabQUEUE.erase(crabQUEUE.begin());
               }
          } else if(b.getType() == "swordfish"){
               b.setTotal(8);
               swordfish.insert(swordfish.begin(), b);
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
               cout << "\n" << endl;
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

class input{
public:
     string event = "";
     BoxOfSeafood b;
     BoxCalculations c;

     void start(){
          ifstream file("data2.txt");
         //variable to keep track of the line
         string line;
         //vector to hold the scanned in input strings
         vector<string> input;
         //loop to iterate through the file
         while (getline(file, line)){
             //buffer string
             string buf;
             //insert line into stream
             stringstream ss(line);
             //loop to insert split string into vector
             while(ss>>buf){
                 input.push_back(buf);
             }
         }
         //for loop to iterate through the vector
         //i+4 because i will always begin on a new line that way
         for(int i = 0; i<input.size();i+=4){
             //local variables to aid readability
             string command, date, type;
             int amount;
             //setting variables based off of positions away from i
             command = input.at(i);
             date = input.at(i+1);
             type = input.at(i+2);
             //parse string to int
             amount = atoi(input.at(i+3).c_str());

             //begin process to add stock if command equals stock
             if(command == "stock"){
                 //check to see if a valid seafood type was input
                     if(type == "shrimp" || type == "lobster" || type == "crab" || type == "swordfish"){
                         //print out the header Event: ... Date: ... Type: ... Amount: ...
                         calc.output_string(command, date, type, amount);
                         //print statement showing the action performed successfully
                         printf("Adding seafood to stockpile.\n");
                         //for loop to add the appropriate amount of boxes, based on the amount specified by the input
                         for(int i = 0; i < amount; i++){
                             //set the values of the box based on the input
                             box.set_values(date, type);
                             //adds the box to the appropriate vector
                             calc.add_stock(box);
                         }
                         //calls the to_string in the calc object to display the boxes of seafood
                         calc.to_string(type);
                     }
                     //an invalid type was entered
                     else{
                         cout << "Invalid seafood type.\n";
                     }
             }
             //begin process to sell stock if command equals buy
             else if(command == "buy"){
                 //print out the header Event: ... Date: ... Type: ... Amount: ...
                 calc.output_string(command, date, type, amount);
                 //calls sell_stock method with parameters from the input
                 calc.sell_stock(type, amount, date);
                 //calls to_string in the calc object to display the remaining boxes after stock was sold
                 calc.to_string(type);
             }
             //invalid command was entered
             else{
                 cout << "Invalid command. \n";
             }
        }
   }

   //
   // void parseEvent(string event, BoxOfSeafood a, int amount){
   //      if(event == "buy"){
   //           c.buyStock(a, amount);
   //      } else if(event == "stock"){
   //           for(int i = 0; i < amount; i++){
   //                c.stockBox(a);
   //           }
   //      }
   //      c.getStockInformation(c.getCorrectQueue(a));
   // }
};

int main(void){
     input i;
     i.start();

     return 0;
}
