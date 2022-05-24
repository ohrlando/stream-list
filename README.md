# Stream List
Empowered Array like java java.util.Collection.stream or C# System.Linq.Enumerable API implementation. Safe chain calling with minimal iteration

## Installation

```
$ npm i stream-list
```

## Examples
```javascript
 let myNumbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
 let mylist = new List(myNumbers);
 myList
  .filter((num) => num % 2 == 0)  //only pair
  .map((num) => num * num)  // square
  .map((num) => num/2) // half
  .toList(); // myNumbers was just iterated once
 
 // safe branches
 let myNumbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
 let myList = new List(myNumbers);
 let pairNumbers = myList.filter((num) => num % 2 == 0);
 let pairNumbersGreaterEqualThan5 = pairNumbers.filter((num) => num >= 5).toList();  //first full iteration from myNumbers
 let pairNumbersLessThan5 = pairNumbers.filter((num) => num >= 5).toList();  //another full iteration from myNumbers
```

## APIs

### first

### last

### any

### where

### select

### distinct

### each

### entries

### toList

# Release Notes
## v0.0.1
- Initial files