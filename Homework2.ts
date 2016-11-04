Script started on Fri 04 Nov 2016 12:36:10 AM EDT
[4mpi[24m:[1m~/CSC344/Homework2[0m> cat Homework2.cpp
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
               //checks to see if the shrimpQUEUE is not empty and also checks to see if the total stock of the shrimp vector
               //is greater than the current total of the first element in the shrimpQUEUE
               if(!shrimpQUEUE.empty() && getTotalOfStock(shrimp) > shrimpQUEUE.begin()->getCurrentTotal()){
                    //sets the box of seafood to the first index and gets the current totoal of the box in the shrimpQUEUE
                    buyStock(shrimpQUEUE.at(0), shrimpQUEUE.begin()->getCurrentTotal());
                    //tells the user that they are selling to the waiting customer and the amount they are seeling
                    cout << "Selling " << shrimpQUEUE.begin()->getCurrentTotal() << " shrimp to waiting customer." << endl;
                    //erases the element in the first position after the order is fullfilled
                    shrimpQUEUE.erase(shrimpQUEUE.begin());
               }
               //ALL OF THE BELOW CODE IS REDUNDANT AND THE SAME AS THE ABOVE CODE EXCEPT IT CHECKS THE OTHER VECTORS
               //BUT EVERYTHING IS THE SAME
          } else if(b.getType() == "lobster"){
               b.setTotal(4);
               lobster.push_back(b);
               if(!lobsterQUEUE.empty() && getTotalOfStock(lobster) > lobsterQUEUE.begin()->getCurrentTotal()){
                    buyStock(lobsterQUEUE.at(0), lobsterQUEUE.begin()->getCurrentTotal());
                    cout << "Selling " << lobsterQUEUE.begin()->getCurrentTotal() << " lobster to waiting customer." << endl;
                    lobsterQUEUE.erase(lobsterQUEUE.begin());
               }
               //ALL OF THE BELOW CODE IS REDUNDANT AND THE SAME AS THE ABOVE CODE EXCEPT IT CHECKS THE OTHER VECTORS
               //BUT EVERYTHING IS THE SAME
          } else if(b.getType() == "crab"){
               b.setTotal(6);
               crab.push_back(b);
               if(!crabQUEUE.empty() && getTotalOfStock(crab) > crabQUEUE.begin()->getCurrentTotal()){
                    buyStock(crabQUEUE.at(0), crabQUEUE.begin()->getCurrentTotal());
                    cout << "Selling " << crabQUEUE.begin()->getCurrentTotal() << " crab to waiting customer." << endl;
                    crabQUEUE.erase(crabQUEUE.begin());
               }
               //ALL OF THE BELOW CODE IS REDUNDANT AND THE SAME AS THE ABOVE CODE EXCEPT IT CHECKS THE OTHER VECTORS
               //BUT EVERYTHING IS THE SAME
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

     //buy stock method that takes a box of seafood and and amount the user wants to buy
     void buyStock(BoxOfSeafood b, int amount){
          //sets the amount requested to the buffer to be able to sell across multiple boxes
          int buffer = amount;
          //checks to see what the type of the box of seafood is and then does a buy request on that
          //type of vector.  This is for the shrimp vector.
          if(b.getType() == "shrimp"){
               //checks to see if the order can be fullfilled with the current stock of the shrimp vector
               if(!checkIfFullfill(shrimp, b, amount)){
                    //checks to see if the buffer is larger than the priority box's current total
                    while(buffer >= shrimp.at(setPriority(shrimp)).getCurrentTotal()){
                         //sets the priority's current total tot the debuff to subtract from the buffer to get the
                         //remaining amount that needs to be sold.
                         int debuff = shrimp.at(setPriority(shrimp)).getCurrentTotal();
                         //checks to see if the size of shrimp vecor is greater than 1
                         if(shrimp.size() > 1){
                              //if it is greater than 1 then the priority box is erased
                              shrimp.erase(shrimp.begin() + setPriority(shrimp));
                              //sets the buffer to the amount left in the buffer minus the current total of the priority box
                              buffer = buffer - debuff;
                              //then continues through the loop  until the size if less than 1
                         } else {
                              //breaks out of the while loop if the size is greater than 1 so that it doesnt throw a range error
                              break;
                         }
                    }
                    //checks to see if the buffer is equal or less than the total stock of the shrimp vector
                    if(buffer <= getTotalOfStock(shrimp)){
                         //checks the priority box and then requests the amount of product requested and subtracts it from the current total
                         shrimp.at(setPriority(shrimp)).requestProduct(buffer);
                         //if the current total if equal to zero, which means its empty, then clear the vector because there are no more shrimp boxes in the vector.
                         if(shrimp.at(setPriority(shrimp)).getCurrentTotal() == 0){
                              //clears the vector
                              shrimp.clear();
                              cout << "\n" << endl;
                         }
                    }
               }
               //ALL OF THE BELOW CODE IS REDUNDANT AND THE SAME AS THE ABOVE CODE EXCEPT IT CHECKS THE OTHER VECTORS
               //BUT EVERYTHING IS THE SAME
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
               //ALL OF THE BELOW CODE IS REDUNDANT AND THE SAME AS THE ABOVE CODE EXCEPT IT CHECKS THE OTHER VECTORS
               //BUT EVERYTHING IS THE SAME
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
               //ALL OF THE BELOW CODE IS REDUNDANT AND THE SAME AS THE ABOVE CODE EXCEPT IT CHECKS THE OTHER VECTORS
               //BUT EVERYTHING IS THE SAME
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

     //method to check if there is more than 1 box available to sell in the vector
     //takes a vector object to check its size
     bool checkIfEnough(vector<BoxOfSeafood> v){
          //checks to see if the size is greater than 1
          if(v.size() > 1){
               //returns true if it is greter than 1
               return true;
          } else {
               //returns false if it is less than 1
               return false;
          }

     }

     //method that sets the priority of a box inside a vector and takes a vector object as a parameter
     int setPriority(vector<BoxOfSeafood> v){
          //sets the priority to the first element
          int priority = 0;
          //for loop to go through the vector to check priorities
          for(int i = 0; i < v.size(); i++){
               //cees if the index is open and the prioirty is closed
               if(v.at(i).isOpen() == "o" && v.at(priority).isOpen() == "c"){
                    //if they are both true than it sets the index as the priority
                    priority = i;
                    //checks to see if the index is open and the priority is open
               } else if (v.at(i).isOpen() == "o" && v.at(priority).isOpen() == "o") {
                    //if both are open then it checks the dates and which is the later dates
                    if(v.at(i).getDate() < v.at(priority).getDate()){
                         //then it sets the later one as the priority
                         priority = i;
                    }
                    //checks to see if the index is open and the priority is closed
               } else if (v.at(i).isOpen() == "c" && v.at(priority).isOpen() == "o"){
                    //if they are both true than it sets the priority as the priority
                    //REQUIRED FOR METHOD TO WORK
                    priority = priority;
               }else{
                    //checks to see if the index is later than the priority
                    if(v.at(i).getDate() < v.at(priority).getDate()){
                         //it sets the as the prioirty
                         priority = i;
                    }
               }
          }
          //returns the index of the priority
          return priority;
     }


     //method to see if the vector can fullfill the request by checking the total stock against the maount requested
     //takes a vector object, a box of seafood object, and the amount requested
     bool checkIfFullfill(vector<BoxOfSeafood> v, BoxOfSeafood b, int amount){
          //checks to see if the vector is shrimp and also checks to see if the total stock is less than the amount
          if(b.getType() == "shrimp" && getTotalOfStock(v) < amount){
               //print statement to user to tell them they are queued
               cout << "Putting customer on queue for: " << amount << " units."<< endl;
               //sets the total of the box of seafood requested to the amount
               b.setTotal(amount);
               //adds the box of seafood object to the shrimpQUEUE
               shrimpQUEUE.push_back(b);
               //returns true so that the buy method knows the order cant be fullfilled
               return true;
               //ALL OF THE BELOW CODE IS REDUNDANT AND THE SAME AS THE ABOVE CODE EXCEPT IT CHECKS THE OTHER VECTORS
               //BUT EVERYTHING IS THE SAME
          }else if(b.getType() == "lobster" && getTotalOfStock(v) < amount){
               cout << "Putting customer on queue for: " << amount << " units."<< endl;
               b.setTotal(amount);
               lobsterQUEUE.push_back(b);
               return true;
               //ALL OF THE BELOW CODE IS REDUNDANT AND THE SAME AS THE ABOVE CODE EXCEPT IT CHECKS THE OTHER VECTORS
               //BUT EVERYTHING IS THE SAME
          }else if(b.getType() == "crab" && getTotalOfStock(v) < amount){
               cout << "Putting customer on queue for: " << amount << " units."<< endl;
               b.setTotal(amount);
               crabQUEUE.push_back(b);
               return true;
               //ALL OF THE BELOW CODE IS REDUNDANT AND THE SAME AS THE ABOVE CODE EXCEPT IT CHECKS THE OTHER VECTORS
               //BUT EVERYTHING IS THE SAME
          }else if(b.getType() == "swordfish" && getTotalOfStock(v) < amount){
               cout << "Putting customer on queue for: " << amount << " units."<< endl;
               b.setTotal(amount);
               swordfishQUEUE.push_back(b);
               return true;
          } else {
               //returns false if the order can be fullfilled
               return false;
          }
     }

     //method to get the total stock of the vector requested
     int getTotalOfStock(vector<BoxOfSeafood> v){
          //variable for the total of the vector
          int totalTotal = 0;
          //for loop to go through the box of sea food objects and adds all of their current totals up into
          //a big sum
          for(BoxOfSeafood i : v){
               //sets the total to the current running total plus the current index of the box of seafood's current total
               totalTotal = totalTotal + i.getCurrentTotal();
          }
          //returns the total of the vector for methods to check the total of a requested vector
          return totalTotal;
     }

     //method to print out the toString() method of all the box of sea food objects inside a requested vector
     void getStockInformation(vector<BoxOfSeafood> v){
          //checks to see if the size is not 0
          //needs to be checked or an error is thrown as a segmentation fault and crashes the program
          if(v.size() != 0){
               //gets the type and prints it before all of the boxes
               cout << v.begin()->getType() << ": ";
               //for loop to go through the boxes of seafood in the vecotr specified
               for(BoxOfSeafood i : v){
                    //runs the toString() method of the box of seafood to show an output of the details of the box
                    i.toString();
                    //spaces between box details
                    cout << " ";
               }
               //breaks the line
               cout << "" << endl;
          }
     }

     //method to get the correct queue of the box requested
     //it takes a box of sea food and returns a vector of seafood
     vector<BoxOfSeafood> getCorrectQueue(BoxOfSeafood b){
          //checks to see if the type of the box is a shrimp
          if(b.getType() == "shrimp"){
               //if it is a shrimp, then return the shrimp vector
               return shrimp;
          //same as above code, just for another vector
          } else if(b.getType() == "lobster"){
               //same as above code, just for another vector
               return lobster;
          //same as above code, just for another vector
          } else if(b.getType() == "crab"){
               //same as above code, just for another vector
               return crab;
          //same as above code, just for another vector
          } else if(b.getType() == "swordfish"){
               //same as above code, just for another vector
               return swordfish;
          } else {
               //returns a shrimp vector
               //this is only so that a warning is supresed and the data generated from the data files
               //will only have the four types of seafood and no others.  This is why there is no checking
               //if there is a type that can't be bought.
               return shrimp;
          }
     }

protected:
     //vectors of the stock and the queue of the customers waiting to be given stock
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
     //box of seafood object
     BoxOfSeafood b;
     //box calculations object
     BoxCalculations c;
     //variables used for the input of the data file
     string event, date, type;
     int amount;

     //while there is still a line in the the file, read it

     while (cin >> event >> date >> type >> amount) {
          //sets the values of the box of sea food to be added to the vector
          //total is set to 0 because the total for the specific box of seafood,
          //when the type is checked, is set to what the total is of that type of box
          //when it is about to be added into the vector.
          b.set_values(0, date, type);
          //prints out the commands entered from the line
          cout << "Event: " << event << " Date: " << date << " Type: " << type << " Amount " << amount << endl;
          //checks to see if the event entered was a stock command
          if (event == "stock") {
               //if it is a stock command then it prints this to the command line to notify
               //the user that stock is being added to the stockpile.
               cout << "Adding seafood to stockpile" << endl;
               //goes through a for loop and adds the amount of boxes entered into a
               //a vector
               for(int i = 0; i < amount; i++){
                    //calls the stock box method to stock the specified box in the
                    //vector of that type
                    c.stockBox(b);
               }
               //prints out the stock information of a specific vector and gets the correct queue
               //done after every stock method to show the user the amount of stock in the vector
               c.getStockInformation(c.getCorrectQueue(b));
          //checks to see if the event enetered was a buy command
          } else if (event == "buy") {
               //prints these to the command line so that the user knows the buy command
               //went through and stock is being bought
               cout << "Selling some product from stockpile" << endl;
               cout << "Using some resources from stockpile" << endl;
               //calls the buy stock method on a vector that is checked within the method
               //by the box of sea food's type that was entered
               c.buyStock(b, amount);
               //prints out the stock information of a specific vector and gets the correct queue
               //done after every buy method to show the user the amount of stock in the vector
               c.getStockInformation(c.getCorrectQueue(b));
          }
     }

     return 0;
};
[4mpi[24m:[1m~/CSC344/Homework2[0m> cat data2.txt
++ stock 04/01/2013 swordfish 2
stock 11/22/2013 shrimp 2
stock 12/17/2012 swordfish 2
stock 06/12/2014 crab 2
stock 03/01/2012 swordfish 3
buy 01/01/2016 crab 3
stock 01/02/2014 swordfish 3
buy 01/01/2016 lobster 2
stock 07/24/2013 shrimp 4
buy 01/01/2016 shrimp 45
buy 01/02/2016 shrimp 10
buy 01/03/2016 crab 4
stock 12/08/2012 lobster 5
buy 01/03/2016 crab 2
buy 02/01/2016 shrimp 36
buy 02/01/2016 crab 3
stock 08/07/2013 crab 3
stock 05/31/2014 swordfish 1
stock 03/12/2013 crab 3
buy 03/01/2016 crab 2
stock 02/04/2013 shrimp 4
buy 03/01/2016 shrimp 24
buy 04/01/2016 swordfish 1
stock 10/25/2013 swordfish 5
buy 04/01/2016 shrimp 42
stock 02/18/2014 crab 4
stock 10/11/2013 crab 2
stock 11/30/2014 shrimp 1
stock 12/21/2012 lobster 5
stock 01/23/2012 lobster 4
buy 01/01/2016 crab 5
buy 01/01/2016 shrimp 46
buy 01/01/2016 lobster 4
buy 02/01/2016 crab 5
buy 02/01/2016 lobster 3
stock 12/09/2014 crab 5
buy 02/02/2016 crab 1
buy 03/01/2016 crab 3
buy 04/01/2016 lobster 3
buy 04/02/2016 lobster 4
buy 04/03/2016 shrimp 36
buy 04/03/2016 lobster 3
buy 04/04/2016 crab 4
buy 04/05/2016 crab 4
buy 04/05/2016 crab 2
stock 01/30/2014 lobster 1
stock 12/16/2014 crab 5
buy 04/05/2016 shrimp 14
stock 06/08/2012 lobster 2
buy 04/05/2016 lobster 3
H[4mpi[24m:[1m~/CSC344/Homework2[0m> g++ Homework2.cpp -std=c++11
[4mpi[24m:[1m~/CSC344/Homework2[0m> ./a.out < data2.txt
Event: stock Date: 04/01/2013 Type: swordfish Amount 2
Adding seafood to stockpile
swordfish: Seafood[8(8)04/01/2013]c Seafood[8(8)04/01/2013]c 
Event: stock Date: 11/22/2013 Type: shrimp Amount 2
Adding seafood to stockpile
shrimp: Seafood[50(50)11/22/2013]c Seafood[50(50)11/22/2013]c 
Event: stock Date: 12/17/2012 Type: swordfish Amount 2
Adding seafood to stockpile
swordfish: Seafood[8(8)04/01/2013]c Seafood[8(8)04/01/2013]c Seafood[8(8)12/17/2012]c Seafood[8(8)12/17/2012]c 
Event: stock Date: 06/12/2014 Type: crab Amount 2
Adding seafood to stockpile
crab: Seafood[6(6)06/12/2014]c Seafood[6(6)06/12/2014]c 
Event: stock Date: 03/01/2012 Type: swordfish Amount 3
Adding seafood to stockpile
swordfish: Seafood[8(8)04/01/2013]c Seafood[8(8)04/01/2013]c Seafood[8(8)12/17/2012]c Seafood[8(8)12/17/2012]c Seafood[8(8)03/01/2012]c Seafood[8(8)03/01/2012]c Seafood[8(8)03/01/2012]c 
Event: buy Date: 01/01/2016 Type: crab Amount 3
Selling some product from stockpile
Using some resources from stockpile
crab: Seafood[6(3)06/12/2014]o Seafood[6(6)06/12/2014]c 
Event: stock Date: 01/02/2014 Type: swordfish Amount 3
Adding seafood to stockpile
swordfish: Seafood[8(8)04/01/2013]c Seafood[8(8)04/01/2013]c Seafood[8(8)12/17/2012]c Seafood[8(8)12/17/2012]c Seafood[8(8)03/01/2012]c Seafood[8(8)03/01/2012]c Seafood[8(8)03/01/2012]c Seafood[8(8)01/02/2014]c Seafood[8(8)01/02/2014]c Seafood[8(8)01/02/2014]c 
Event: buy Date: 01/01/2016 Type: lobster Amount 2
Selling some product from stockpile
Using some resources from stockpile
Putting customer on queue for: 2 units.
Event: stock Date: 07/24/2013 Type: shrimp Amount 4
Adding seafood to stockpile
shrimp: Seafood[50(50)11/22/2013]c Seafood[50(50)11/22/2013]c Seafood[50(50)07/24/2013]c Seafood[50(50)07/24/2013]c Seafood[50(50)07/24/2013]c Seafood[50(50)07/24/2013]c 
Event: buy Date: 01/01/2016 Type: shrimp Amount 45
Selling some product from stockpile
Using some resources from stockpile
shrimp: Seafood[50(50)11/22/2013]c Seafood[50(50)11/22/2013]c Seafood[50(5)07/24/2013]o Seafood[50(50)07/24/2013]c Seafood[50(50)07/24/2013]c Seafood[50(50)07/24/2013]c 
Event: buy Date: 01/02/2016 Type: shrimp Amount 10
Selling some product from stockpile
Using some resources from stockpile
shrimp: Seafood[50(50)11/22/2013]c Seafood[50(50)11/22/2013]c Seafood[50(45)07/24/2013]o Seafood[50(50)07/24/2013]c Seafood[50(50)07/24/2013]c 
Event: buy Date: 01/03/2016 Type: crab Amount 4
Selling some product from stockpile
Using some resources from stockpile
crab: Seafood[6(5)06/12/2014]o 
Event: stock Date: 12/08/2012 Type: lobster Amount 5
Adding seafood to stockpile
Selling 2 lobster to waiting customer.
lobster: Seafood[4(2)12/08/2012]o Seafood[4(4)12/08/2012]c Seafood[4(4)12/08/2012]c Seafood[4(4)12/08/2012]c Seafood[4(4)12/08/2012]c 
Event: buy Date: 01/03/2016 Type: crab Amount 2
Selling some product from stockpile
Using some resources from stockpile
crab: Seafood[6(3)06/12/2014]o 
Event: buy Date: 02/01/2016 Type: shrimp Amount 36
Selling some product from stockpile
Using some resources from stockpile
shrimp: Seafood[50(50)11/22/2013]c Seafood[50(50)11/22/2013]c Seafood[50(9)07/24/2013]o Seafood[50(50)07/24/2013]c Seafood[50(50)07/24/2013]c 
Event: buy Date: 02/01/2016 Type: crab Amount 3
Selling some product from stockpile
Using some resources from stockpile


Event: stock Date: 08/07/2013 Type: crab Amount 3
Adding seafood to stockpile
crab: Seafood[6(6)08/07/2013]c Seafood[6(6)08/07/2013]c Seafood[6(6)08/07/2013]c 
Event: stock Date: 05/31/2014 Type: swordfish Amount 1
Adding seafood to stockpile
swordfish: Seafood[8(8)04/01/2013]c Seafood[8(8)04/01/2013]c Seafood[8(8)12/17/2012]c Seafood[8(8)12/17/2012]c Seafood[8(8)03/01/2012]c Seafood[8(8)03/01/2012]c Seafood[8(8)03/01/2012]c Seafood[8(8)01/02/2014]c Seafood[8(8)01/02/2014]c Seafood[8(8)01/02/2014]c Seafood[8(8)05/31/2014]c 
Event: stock Date: 03/12/2013 Type: crab Amount 3
Adding seafood to stockpile
crab: Seafood[6(6)08/07/2013]c Seafood[6(6)08/07/2013]c Seafood[6(6)08/07/2013]c Seafood[6(6)03/12/2013]c Seafood[6(6)03/12/2013]c Seafood[6(6)03/12/2013]c 
Event: buy Date: 03/01/2016 Type: crab Amount 2
Selling some product from stockpile
Using some resources from stockpile
crab: Seafood[6(6)08/07/2013]c Seafood[6(6)08/07/2013]c Seafood[6(6)08/07/2013]c Seafood[6(4)03/12/2013]o Seafood[6(6)03/12/2013]c Seafood[6(6)03/12/2013]c 
Event: stock Date: 02/04/2013 Type: shrimp Amount 4
Adding seafood to stockpile
shrimp: Seafood[50(50)11/22/2013]c Seafood[50(50)11/22/2013]c Seafood[50(9)07/24/2013]o Seafood[50(50)07/24/2013]c Seafood[50(50)07/24/2013]c Seafood[50(50)02/04/2013]c Seafood[50(50)02/04/2013]c Seafood[50(50)02/04/2013]c Seafood[50(50)02/04/2013]c 
Event: buy Date: 03/01/2016 Type: shrimp Amount 24
Selling some product from stockpile
Using some resources from stockpile
shrimp: Seafood[50(50)11/22/2013]c Seafood[50(50)11/22/2013]c Seafood[50(50)07/24/2013]c Seafood[50(50)07/24/2013]c Seafood[50(35)02/04/2013]o Seafood[50(50)02/04/2013]c Seafood[50(50)02/04/2013]c Seafood[50(50)02/04/2013]c 
Event: buy Date: 04/01/2016 Type: swordfish Amount 1
Selling some product from stockpile
Using some resources from stockpile
swordfish: Seafood[8(8)04/01/2013]c Seafood[8(8)04/01/2013]c Seafood[8(8)12/17/2012]c Seafood[8(8)12/17/2012]c Seafood[8(8)03/01/2012]c Seafood[8(8)03/01/2012]c Seafood[8(8)03/01/2012]c Seafood[8(7)01/02/2014]o Seafood[8(8)01/02/2014]c Seafood[8(8)01/02/2014]c Seafood[8(8)05/31/2014]c 
Event: stock Date: 10/25/2013 Type: swordfish Amount 5
Adding seafood to stockpile
swordfish: Seafood[8(8)04/01/2013]c Seafood[8(8)04/01/2013]c Seafood[8(8)12/17/2012]c Seafood[8(8)12/17/2012]c Seafood[8(8)03/01/2012]c Seafood[8(8)03/01/2012]c Seafood[8(8)03/01/2012]c Seafood[8(7)01/02/2014]o Seafood[8(8)01/02/2014]c Seafood[8(8)01/02/2014]c Seafood[8(8)05/31/2014]c Seafood[8(8)10/25/2013]c Seafood[8(8)10/25/2013]c Seafood[8(8)10/25/2013]c Seafood[8(8)10/25/2013]c Seafood[8(8)10/25/2013]c 
Event: buy Date: 04/01/2016 Type: shrimp Amount 42
Selling some product from stockpile
Using some resources from stockpile
shrimp: Seafood[50(50)11/22/2013]c Seafood[50(50)11/22/2013]c Seafood[50(50)07/24/2013]c Seafood[50(50)07/24/2013]c Seafood[50(43)02/04/2013]o Seafood[50(50)02/04/2013]c Seafood[50(50)02/04/2013]c 
Event: stock Date: 02/18/2014 Type: crab Amount 4
Adding seafood to stockpile
crab: Seafood[6(6)08/07/2013]c Seafood[6(6)08/07/2013]c Seafood[6(6)08/07/2013]c Seafood[6(4)03/12/2013]o Seafood[6(6)03/12/2013]c Seafood[6(6)03/12/2013]c Seafood[6(6)02/18/2014]c Seafood[6(6)02/18/2014]c Seafood[6(6)02/18/2014]c Seafood[6(6)02/18/2014]c 
Event: stock Date: 10/11/2013 Type: crab Amount 2
Adding seafood to stockpile
crab: Seafood[6(6)08/07/2013]c Seafood[6(6)08/07/2013]c Seafood[6(6)08/07/2013]c Seafood[6(4)03/12/2013]o Seafood[6(6)03/12/2013]c Seafood[6(6)03/12/2013]c Seafood[6(6)02/18/2014]c Seafood[6(6)02/18/2014]c Seafood[6(6)02/18/2014]c Seafood[6(6)02/18/2014]c Seafood[6(6)10/11/2013]c Seafood[6(6)10/11/2013]c 
Event: stock Date: 11/30/2014 Type: shrimp Amount 1
Adding seafood to stockpile
shrimp: Seafood[50(50)11/22/2013]c Seafood[50(50)11/22/2013]c Seafood[50(50)07/24/2013]c Seafood[50(50)07/24/2013]c Seafood[50(43)02/04/2013]o Seafood[50(50)02/04/2013]c Seafood[50(50)02/04/2013]c Seafood[50(50)11/30/2014]c 
Event: stock Date: 12/21/2012 Type: lobster Amount 5
Adding seafood to stockpile
lobster: Seafood[4(2)12/08/2012]o Seafood[4(4)12/08/2012]c Seafood[4(4)12/08/2012]c Seafood[4(4)12/08/2012]c Seafood[4(4)12/08/2012]c Seafood[4(4)12/21/2012]c Seafood[4(4)12/21/2012]c Seafood[4(4)12/21/2012]c Seafood[4(4)12/21/2012]c Seafood[4(4)12/21/2012]c 
Event: stock Date: 01/23/2012 Type: lobster Amount 4
Adding seafood to stockpile
lobster: Seafood[4(2)12/08/2012]o Seafood[4(4)12/08/2012]c Seafood[4(4)12/08/2012]c Seafood[4(4)12/08/2012]c Seafood[4(4)12/08/2012]c Seafood[4(4)12/21/2012]c Seafood[4(4)12/21/2012]c Seafood[4(4)12/21/2012]c Seafood[4(4)12/21/2012]c Seafood[4(4)12/21/2012]c Seafood[4(4)01/23/2012]c Seafood[4(4)01/23/2012]c Seafood[4(4)01/23/2012]c Seafood[4(4)01/23/2012]c 
Event: buy Date: 01/01/2016 Type: crab Amount 5
Selling some product from stockpile
Using some resources from stockpile
crab: Seafood[6(6)08/07/2013]c Seafood[6(6)08/07/2013]c Seafood[6(6)08/07/2013]c Seafood[6(6)03/12/2013]c Seafood[6(6)03/12/2013]c Seafood[6(5)02/18/2014]o Seafood[6(6)02/18/2014]c Seafood[6(6)02/18/2014]c Seafood[6(6)02/18/2014]c Seafood[6(6)10/11/2013]c Seafood[6(6)10/11/2013]c 
Event: buy Date: 01/01/2016 Type: shrimp Amount 46
Selling some product from stockpile
Using some resources from stockpile
shrimp: Seafood[50(50)11/22/2013]c Seafood[50(50)11/22/2013]c Seafood[50(50)07/24/2013]c Seafood[50(50)07/24/2013]c Seafood[50(47)02/04/2013]o Seafood[50(50)02/04/2013]c Seafood[50(50)11/30/2014]c 
Event: buy Date: 01/01/2016 Type: lobster Amount 4
Selling some product from stockpile
Using some resources from stockpile
lobster: Seafood[4(4)12/08/2012]c Seafood[4(4)12/08/2012]c Seafood[4(4)12/08/2012]c Seafood[4(4)12/08/2012]c Seafood[4(4)12/21/2012]c Seafood[4(4)12/21/2012]c Seafood[4(4)12/21/2012]c Seafood[4(4)12/21/2012]c Seafood[4(4)12/21/2012]c Seafood[4(2)01/23/2012]o Seafood[4(4)01/23/2012]c Seafood[4(4)01/23/2012]c Seafood[4(4)01/23/2012]c 
Event: buy Date: 02/01/2016 Type: crab Amount 5
Selling some product from stockpile
Using some resources from stockpile
crab: Seafood[6(6)08/07/2013]c Seafood[6(6)08/07/2013]c Seafood[6(6)08/07/2013]c Seafood[6(6)03/12/2013]c Seafood[6(6)03/12/2013]c Seafood[6(6)02/18/2014]c Seafood[6(6)02/18/2014]c Seafood[6(6)02/18/2014]c Seafood[6(6)10/11/2013]c Seafood[6(6)10/11/2013]c 
Event: buy Date: 02/01/2016 Type: lobster Amount 3
Selling some product from stockpile
Using some resources from stockpile
lobster: Seafood[4(4)12/08/2012]c Seafood[4(4)12/08/2012]c Seafood[4(4)12/08/2012]c Seafood[4(4)12/08/2012]c Seafood[4(4)12/21/2012]c Seafood[4(4)12/21/2012]c Seafood[4(4)12/21/2012]c Seafood[4(4)12/21/2012]c Seafood[4(4)12/21/2012]c Seafood[4(3)01/23/2012]o Seafood[4(4)01/23/2012]c Seafood[4(4)01/23/2012]c 
Event: stock Date: 12/09/2014 Type: crab Amount 5
Adding seafood to stockpile
crab: Seafood[6(6)08/07/2013]c Seafood[6(6)08/07/2013]c Seafood[6(6)08/07/2013]c Seafood[6(6)03/12/2013]c Seafood[6(6)03/12/2013]c Seafood[6(6)02/18/2014]c Seafood[6(6)02/18/2014]c Seafood[6(6)02/18/2014]c Seafood[6(6)10/11/2013]c Seafood[6(6)10/11/2013]c Seafood[6(6)12/09/2014]c Seafood[6(6)12/09/2014]c Seafood[6(6)12/09/2014]c Seafood[6(6)12/09/2014]c Seafood[6(6)12/09/2014]c 
Event: buy Date: 02/02/2016 Type: crab Amount 1
Selling some product from stockpile
Using some resources from stockpile
crab: Seafood[6(6)08/07/2013]c Seafood[6(6)08/07/2013]c Seafood[6(6)08/07/2013]c Seafood[6(6)03/12/2013]c Seafood[6(6)03/12/2013]c Seafood[6(5)02/18/2014]o Seafood[6(6)02/18/2014]c Seafood[6(6)02/18/2014]c Seafood[6(6)10/11/2013]c Seafood[6(6)10/11/2013]c Seafood[6(6)12/09/2014]c Seafood[6(6)12/09/2014]c Seafood[6(6)12/09/2014]c Seafood[6(6)12/09/2014]c Seafood[6(6)12/09/2014]c 
Event: buy Date: 03/01/2016 Type: crab Amount 3
Selling some product from stockpile
Using some resources from stockpile
crab: Seafood[6(6)08/07/2013]c Seafood[6(6)08/07/2013]c Seafood[6(6)08/07/2013]c Seafood[6(6)03/12/2013]c Seafood[6(6)03/12/2013]c Seafood[6(2)02/18/2014]o Seafood[6(6)02/18/2014]c Seafood[6(6)02/18/2014]c Seafood[6(6)10/11/2013]c Seafood[6(6)10/11/2013]c Seafood[6(6)12/09/2014]c Seafood[6(6)12/09/2014]c Seafood[6(6)12/09/2014]c Seafood[6(6)12/09/2014]c Seafood[6(6)12/09/2014]c 
Event: buy Date: 04/01/2016 Type: lobster Amount 3
Selling some product from stockpile
Using some resources from stockpile
lobster: Seafood[4(4)12/08/2012]c Seafood[4(4)12/08/2012]c Seafood[4(4)12/08/2012]c Seafood[4(4)12/08/2012]c Seafood[4(4)12/21/2012]c Seafood[4(4)12/21/2012]c Seafood[4(4)12/21/2012]c Seafood[4(4)12/21/2012]c Seafood[4(4)12/21/2012]c Seafood[4(4)01/23/2012]c Seafood[4(4)01/23/2012]c 
Event: buy Date: 04/02/2016 Type: lobster Amount 4
Selling some product from stockpile
Using some resources from stockpile
lobster: Seafood[4(4)12/08/2012]c Seafood[4(4)12/08/2012]c Seafood[4(4)12/08/2012]c Seafood[4(4)12/08/2012]c Seafood[4(4)12/21/2012]c Seafood[4(4)12/21/2012]c Seafood[4(4)12/21/2012]c Seafood[4(4)12/21/2012]c Seafood[4(4)12/21/2012]c Seafood[4(4)01/23/2012]c 
Event: buy Date: 04/03/2016 Type: shrimp Amount 36
Selling some product from stockpile
Using some resources from stockpile
shrimp: Seafood[50(50)11/22/2013]c Seafood[50(50)11/22/2013]c Seafood[50(50)07/24/2013]c Seafood[50(50)07/24/2013]c Seafood[50(11)02/04/2013]o Seafood[50(50)02/04/2013]c Seafood[50(50)11/30/2014]c 
Event: buy Date: 04/03/2016 Type: lobster Amount 3
Selling some product from stockpile
Using some resources from stockpile
lobster: Seafood[4(4)12/08/2012]c Seafood[4(4)12/08/2012]c Seafood[4(4)12/08/2012]c Seafood[4(4)12/08/2012]c Seafood[4(4)12/21/2012]c Seafood[4(4)12/21/2012]c Seafood[4(4)12/21/2012]c Seafood[4(4)12/21/2012]c Seafood[4(4)12/21/2012]c Seafood[4(1)01/23/2012]o 
Event: buy Date: 04/04/2016 Type: crab Amount 4
Selling some product from stockpile
Using some resources from stockpile
crab: Seafood[6(6)08/07/2013]c Seafood[6(6)08/07/2013]c Seafood[6(6)08/07/2013]c Seafood[6(6)03/12/2013]c Seafood[6(6)03/12/2013]c Seafood[6(4)02/18/2014]o Seafood[6(6)02/18/2014]c Seafood[6(6)10/11/2013]c Seafood[6(6)10/11/2013]c Seafood[6(6)12/09/2014]c Seafood[6(6)12/09/2014]c Seafood[6(6)12/09/2014]c Seafood[6(6)12/09/2014]c Seafood[6(6)12/09/2014]c 
Event: buy Date: 04/05/2016 Type: crab Amount 4
Selling some product from stockpile
Using some resources from stockpile
crab: Seafood[6(6)08/07/2013]c Seafood[6(6)08/07/2013]c Seafood[6(6)08/07/2013]c Seafood[6(6)03/12/2013]c Seafood[6(6)03/12/2013]c Seafood[6(6)02/18/2014]c Seafood[6(6)10/11/2013]c Seafood[6(6)10/11/2013]c Seafood[6(6)12/09/2014]c Seafood[6(6)12/09/2014]c Seafood[6(6)12/09/2014]c Seafood[6(6)12/09/2014]c Seafood[6(6)12/09/2014]c 
Event: buy Date: 04/05/2016 Type: crab Amount 2
Selling some product from stockpile
Using some resources from stockpile
crab: Seafood[6(6)08/07/2013]c Seafood[6(6)08/07/2013]c Seafood[6(6)08/07/2013]c Seafood[6(6)03/12/2013]c Seafood[6(6)03/12/2013]c Seafood[6(4)02/18/2014]o Seafood[6(6)10/11/2013]c Seafood[6(6)10/11/2013]c Seafood[6(6)12/09/2014]c Seafood[6(6)12/09/2014]c Seafood[6(6)12/09/2014]c Seafood[6(6)12/09/2014]c Seafood[6(6)12/09/2014]c 
Event: stock Date: 01/30/2014 Type: lobster Amount 1
Adding seafood to stockpile
lobster: Seafood[4(4)12/08/2012]c Seafood[4(4)12/08/2012]c Seafood[4(4)12/08/2012]c Seafood[4(4)12/08/2012]c Seafood[4(4)12/21/2012]c Seafood[4(4)12/21/2012]c Seafood[4(4)12/21/2012]c Seafood[4(4)12/21/2012]c Seafood[4(4)12/21/2012]c Seafood[4(1)01/23/2012]o Seafood[4(4)01/30/2014]c 
Event: stock Date: 12/16/2014 Type: crab Amount 5
Adding seafood to stockpile
crab: Seafood[6(6)08/07/2013]c Seafood[6(6)08/07/2013]c Seafood[6(6)08/07/2013]c Seafood[6(6)03/12/2013]c Seafood[6(6)03/12/2013]c Seafood[6(4)02/18/2014]o Seafood[6(6)10/11/2013]c Seafood[6(6)10/11/2013]c Seafood[6(6)12/09/2014]c Seafood[6(6)12/09/2014]c Seafood[6(6)12/09/2014]c Seafood[6(6)12/09/2014]c Seafood[6(6)12/09/2014]c Seafood[6(6)12/16/2014]c Seafood[6(6)12/16/2014]c Seafood[6(6)12/16/2014]c Seafood[6(6)12/16/2014]c Seafood[6(6)12/16/2014]c 
Event: buy Date: 04/05/2016 Type: shrimp Amount 14
Selling some product from stockpile
Using some resources from stockpile
shrimp: Seafood[50(50)11/22/2013]c Seafood[50(50)11/22/2013]c Seafood[50(50)07/24/2013]c Seafood[50(50)07/24/2013]c Seafood[50(47)02/04/2013]o Seafood[50(50)11/30/2014]c 
Event: stock Date: 06/08/2012 Type: lobster Amount 2
Adding seafood to stockpile
lobster: Seafood[4(4)12/08/2012]c Seafood[4(4)12/08/2012]c Seafood[4(4)12/08/2012]c Seafood[4(4)12/08/2012]c Seafood[4(4)12/21/2012]c Seafood[4(4)12/21/2012]c Seafood[4(4)12/21/2012]c Seafood[4(4)12/21/2012]c Seafood[4(4)12/21/2012]c Seafood[4(1)01/23/2012]o Seafood[4(4)01/30/2014]c Seafood[4(4)06/08/2012]c Seafood[4(4)06/08/2012]c 
Event: buy Date: 04/05/2016 Type: lobster Amount 3
Selling some product from stockpile
Using some resources from stockpile
lobster: Seafood[4(4)12/08/2012]c Seafood[4(4)12/08/2012]c Seafood[4(4)12/08/2012]c Seafood[4(4)12/08/2012]c Seafood[4(4)12/21/2012]c Seafood[4(4)12/21/2012]c Seafood[4(4)12/21/2012]c Seafood[4(4)12/21/2012]c Seafood[4(4)12/21/2012]c Seafood[4(2)01/30/2014]o Seafood[4(4)06/08/2012]c Seafood[4(4)06/08/2012]c 
[4mpi[24m:[1m~/CSC344/Homework2[0m> exit
exit

Script done on Fri 04 Nov 2016 12:36:22 AM EDT
