var Trie = function() {
  // a counter
  //a storage use {}
  this.count = 0;
  this.storage = {};
};

var Node = function(value) {
  //accept a value
  //children's array
  this.value = value;
  this.next = {};
};

Trie.prototype.insert = function(string) {

};

Trie.prototype.search = function(string) {

};

Trie.prototype.startsWith = function(string) {

};


// 3 methods, insert(no return), search( returns boolean), startsWith(returns boolean).


//insert(string)
/*
 //loop through every character of the string
   //for every character we're iterating through, set it as a node in the trie, and push the next character into the node's children's array.
 //
*/

//search(string)
/*
  //iterate through the tree recursively
  //pass the whole string into the recursive call
  //if the current character doesn't match a node's value, return false.

  //pop the first chracter off of the string, and continue to recurse down the tree.
  //if string's length === 0, and the current's next value !== null, return false, BUT if i traverse through the children's array and there's a null value, return true.
*/

//startsWith()
/*
  //iterate through the tree recursively
  //pass the whole string into the recursive call
  //if the current character doesn't match a node's value, return false.

  //pop the first chracter off of the string, and continue to recurse down the tree.
  //if the length of the string === 0, and every node matched every character of the string, return true.
*/