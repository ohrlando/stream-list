/**
 * Class function wrapper class with callback and function behavior
 */
class Action {
    private _type: string
    private _func: Function

    constructor(func: Function, type: string) {
        this._func = func;
    }

    /**
     * Function behavior for stream api
     */
    get type() {
        return this._type;
    }

    /**
     * Get callback function
     */
    get func() {
        return this._func;
    }
}

/**
 * Empowered Array like java java.util.Collection.stream or C# System.Linq.Enumerable API implementation. Safe chain calling with minimal iteration
 * @example
 * let myNumbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
 * let mylist = new List(myNumbers);
 * myList
 *  .filter((num) => num % 2 == 0)  //only pair
 *  .map((num) => num * num)  // square
 *  .map((num) => num/2) // half
 *  .toList(); // myNumbers was just itered once
 * 
 * safe branches
 * @example
 * let myNumbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
 * let myList = new List(myNumbers);
 * let pairNumbers = myList.filter((num) => num % 2 == 0);
 * let pairNumbersGreaterEqualThan5 = pairNumbers.filter((num) => num >= 5).toList();  //first full iteration from myNumbers
 * let pairNumbersLessThan5 = pairNumbers.filter((num) => num >= 5).toList();  //another full iteration from myNumbers
 * 
 */
export class List {
    private _array: Array<any>;
    private _callbackArray: Array<Action>;

    private behaviorFunctionTypes = {
        "a": function <T>(func: (item: T) => boolean, item: any) {
            // any function
            let retorno = func(item);
            if (retorno === true) {
                this.a = this.r = true;
            }
            return item;
        },
        "d": function (func: Action, item: any) {
            // implemented as wrapper from behavior "where"
            // future implementation maybe
        },
        "e": function <T>(func: (item: T, index: number) => T, item: any, index: number) {
            // each function
            func(item, index);
            return item;
        },
        "f": function <T>(func: (item: T) => boolean, item: any) {
            //first function
            let retorno = func(item);
            if (retorno === true) {
                this.r = item;
                return this.a = true;
            }
            return item;
        },
        "s": function <T>(func: (item: T, index: number) => any, item: any, index: number) {
            //select function
            return func(item, index);
        },
        "w": function <T>(func: (item: T, index: number) => boolean, item: any, index: number) {
            return func(item, index) ? item : null;
        },
    }

    /**
     * Empowered Array like java java.util.Collection.stream or C# System.Linq.Enumerable API implementation. Safe chain calling with minimal iteration
     * @example
     * let myNumbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
     * let mylist = new List(myNumbers);
     * myList
     *  .filter((num) => num % 2 == 0)  //only pair
     *  .map((num) => num * num)  // square
     *  .map((num) => num/2) // half
     *  .toList(); // myNumbers was just itered once
     * 
     * safe branches
     * @example
     * let myNumbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
     * let myList = new List(myNumbers);
     * let pairNumbers = myList.filter((num) => num % 2 == 0);
     * let pairNumbersGreaterEqualThan5 = pairNumbers.filter((num) => num >= 5).toList();  //first full iteration from myNumbers
     * let pairNumbersLessThan5 = pairNumbers.filter((num) => num >= 5).toList();  //another full iteration from myNumbers
     * @param array based
     * @param inheritCallbacks 
     */
    constructor (array: Array<any>, inheritCallbacks: Array<Action>) {
        this._array = array;
        this._callbackArray = inheritCallbacks || [];
    }

    /**
     * Generate safe new List with new configuration functions
     * @param list list that will be cloned
     * @param lastACtion action that will be added
     * @returns 
     */
    private static newBranch(list: List, lastACtion: Action): List {
       /**
        * TODO: can I prevent full iteration like below?
        *  maybe with newBranch receiving `entries` instead of array. Take care with `index`.
        * @example
        * let myNumbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
        * let myList = new List(myNumbers);
        * let pairNumbers = myList.filter((num) => num % 2 == 0);
        * let pairNumbersGreaterEqualThan5 = pairNumbers.filter((num) => num >= 5).toList();  //first full iteration from myNumbers
        * let pairNumbersLessThan5 = pairNumbers.filter((num) => num >= 5).toList();  //another full iteration from myNumbers
         */
        let _callbacks = list._callbackArray.slice();
        list._callbackArray.push(lastACtion);
        return new List(list._array.slice(), _callbacks);
    }

    /**
     * Creates a new, shallow-copied Array instance from an array-like or iterable object.
     * @returns A new Array instance.
     */
    toArray(): Array<any> {
        if (this._callbackArray.length === 0) {
            return Array.from(this._array);
        }
        return this.toList(); 
    }

    /**
     * Adds one to the end of an array and returns the new length of the array.
     * @param any The element to add to the end of the array.
     */
    push(any: any) {
        this._array.push(any);
    }

    /**
     * Extends the list by appending all the items from the iterable
     * @param other An iterable to be applied on base array
     */
    extend(other: Array<any>) {
        if (other instanceof List) {
            this._array.push.apply(this._array, other.toArray());
        } else {
            this._array.push.apply(this._array, other);
        }
    }

    /**
     * Removes an element in to the specified index
     * @param index Index of the element that will be removed
     */
    removeAt(index: number) {
        this._array.splice(index, 1);
    }

    /**
     * returns a shallow copy of a portion of an array into a new array object selected from start to end (end not included)
     *  where start and end represent the index of items in that array. The original array will not be modified.
     * @param start Zero-based index at which to start extraction. 
     * A negative index can be used, indicating an offset from the end of the sequence. slice(-2) extracts the last two elements in the sequence. 
     * If start is undefined, slice starts from the index 0. 
     * If start is greater than the index range of the sequence, an empty array is returned.
     * @param end The index of the first element to exclude from the returned array. slice extracts up to but not including end. For example, slice(1,4) extracts the second element through the fourth element (elements indexed 1, 2, and 3). 
     * A negative index can be used, indicating an offset from the end of the sequence. slice(2,-1) extracts the third element through the second-to-last element in the sequence. 
     * If end is omitted, slice extracts through the end of the sequence (arr.length). 
     * If end is greater than the length of the sequence, slice extracts through to the end of the sequence (arr.length).
     */
    slice(start?: number, end?: number) {
        this._array.slice(start, end);
    }

    /* IList API */
    /* end methods */

    /**
     * Returns the first element of a sequence, or a default value if the sequence contains no elements.
     * @param func A function to test each element for a condition.
     * @param default_ default value if the sequence contains no elements.
     * @returns The first element in the sequence that passes the test in the specified predicate function.
     */
    first(func?: (element: any) => any, default_?: any) {
        if (!func) {
            if (this._callbackArray.length === 0) {
                return this._array[0];
            } 
            let retorno = this.toList();
            return retorno[0];
        }
        let action = new Action(func, "f");
        this._callbackArray.push(action);
        let retorno = this.toList();
        this._callbackArray.pop();
        return retorno.length > 0 ? retorno[0] : (default_ || null);
    }
    
    /**
     * Returns the last element of a sequence.
     * @returns The value at the last position in the source sequence.
     */
    last() {
        /// <summary>Retorna o último membro da lista</summary>
        let retorno = this.toList();
        return retorno[retorno.length - 1];
    }

    /**
     * Determines whether any element of a sequence exists or satisfies a condition.
     * @param func A function to test each element for a condition.
     * @returns true if the source sequence contains any elements; otherwise, false.
     */
    any<T>(func: (item: T) => boolean) {
        /// <summary>Retorna true caso tenha um item com o filtro selecionado</summary>
        /// <param name="action" type="bool function(item){}"></param>
        /// <returns type="List" />
        let action = new Action(func, "a");
        this._callbackArray.push(action);
        let retorno = this.toList();
        this._callbackArray.pop();
        return retorno.length !== 0;
    }
    /* --- */

    /**
     * Filters a sequence of values based on a predicate.
     * @param func A function to test each element for a condition.
     * @returns A List that contains elements from the input sequence that satisfy the condition.
     */
    where<T>(func: (item: T, index: number) => boolean): List {
        let lastAction = new Action(func, "w");
        return List.newBranch(this, lastAction);
    }
    
    /**
     * Projects each element of a sequence into a new form.
     * @param func A transform function to apply to each element.
     * @returns A List whose elements are the result of invoking the transform function on each element of source.
     */
    select<T>(func: (item: T, index: number) => any): List {
        let lastAction = new Action(func, "s");
        return List.newBranch(this, lastAction);
    }

    /**
     * Returns distinct elements from a sequence. Each item needs to be hashable or you should use a function that returns a key
     * @returns A List that contains distinct elements from the source sequence.
     */
    distinct<T>(): List;
    /**
     * Returns distinct elements from a sequence.
     * @param func The sequence to remove duplicate elements from. The function needs to return a key to distinguish elements.
     * @returns A List that contains distinct elements from the source sequence.
     */
    distinct<T>(func: (item: T) => any): List;  
    distinct<T>(func?: (item: T) => any): List {
        let lastAction: Action;
        if (!func) {
            lastAction = new Action(function (item: any) {
                // item needs to be hashable
                return item;
            }, "w");
        } else {
            let contextObject: {[key: string]: any} = {}

            lastAction = new Action(function(item: any, index: number) {
                //this as {[key: string]: any}
                let key = func(item);
                let retorno = !!this[key];
                return retorno === true ? false : (this[key] = true);
            }.bind(contextObject), "w")
        }
        return List.newBranch(this, lastAction);
    }

    /**
     * Performs the specified action on each element of the specified array
     * @param func The function to perform on each element of array
     */
    each<T>(func: (item: T, index: number) => T) {
        /// <summary>Percorre item a item da lista</summary>
        /// <param name="action" type="object function(item, i){}"></param>
        let lastAction = new Action(func, "e");
        List.newBranch(this, lastAction).toList();
    }

    /**
     * Returns a generator function. It conforms to both the iterable protocol and the iterator protocol.
     * @returns 
     */
    *entries(): Iterable<any> {
        /// <signature>
        /// <returns type="Array" />
        /// </signature>
        let i = 0;
        for (; i < this._array.length; i++) {
            let j = 0;
            let item = this._array[i];
            let _item: any = item; //initial value
            let stopAny = {
                a: false,
                r: null
            };

            if (this._callbackArray.length > 0) {
                for (; j < this._callbackArray.length; j++) {
                    let action: Action = this._callbackArray[j];
                    _item = this.behaviorFunctionTypes[action.type].apply(stopAny, [action.func, _item, i]);
                    if (stopAny.a) {
                        if (stopAny.r) {
                            yield stopAny.r;
                        }
                        break;
                    }

                    if (!_item) break;
                }
            }
            yield _item
        }
    }

    /**
     * Simple iteration from List
     * @returns Array¹
     */
    toList(): Array<any> {
        // @ts-ignore
        return [...this.entries()]
    }

    /**
     * returns a string representing the specified array and its elements.
     * @returns A string representing the elements of the array.
     */
    toString() {
        return this._array.toString();
    }

}
