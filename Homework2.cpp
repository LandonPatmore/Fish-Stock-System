#include <iostream>
#include <cstring>
#include <vector>

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
               printf("%s\n", "Not empty.");
          } else {
               printf("%s\n", "Empty.");
          }
     }
     string isOpen(){
          if(currentAmount != total){
               return "o";
          } else {
               return "c";
          }
          return "open";
     }
     void toString(){
          printf("Seafood[%d(%d)%s]%s\n", getTotal(), getCurrentTotal(), getDate().c_str(), isOpen().c_str());
     }
};

vector<BoxOfSeafood> shrimp;
vector<BoxOfSeafood> lobster;
vector<BoxOfSeafood> crab;
vector<BoxOfSeafood> swordfish;

int main(void){

     BoxOfSeafood b;
     b.set_values(50, "10/30/2016", "lobster");
     if(b.getType() == "shrimp"){
          shrimp.push_back(b);
          printf("%s\n", "Added to shrimp vector.");
     }else if(b.getType() == "lobster"){
          lobster.push_back(b);
          printf("%s\n", "Added to lobster vector.");
          for(BoxOfSeafood i : lobster){
               i.toString();
          }
     }else if(b.getType() == "crab"){
          crab.push_back(b);
          printf("%s\n", "Added to crab vector.");
     }else if(b.getType() == "swordfish"){
          swordfish.push_back(b);
          printf("%s\n", "Added to swordfish vector.");
     }else{
          printf("%s\n", "Not a proper type.");
     }

     return 0;
}
