import { List } from "../src/index";

test('map', () => {
    // FIXTURES
    let myArray = [1, 2, 3]
    let myList = new List(myArray);

    //exercise
    let exercise = myList.map((num: any) => `num${num}`)

    expect(exercise.toList()).toBe([
        'num1',
        'num2',
        'num3',
    ]);
});

test('filter', () => {
    // FIXTURES
    let myArray = [1, 2, 3, 4]
    let myList = new List(myArray);

    //exercise
    let exercise = myList.filter((num: number) => num % 2 === 0)

    expect(exercise.toList()).toBe([
        2, 
        4
    ]);
});

test('distinct', () => {
    // FIXTURES
    let myArray = [1, 2, 2, 3, 3, 3, 4, 4, 4, 4]
    let myList = new List(myArray);

    //exercise
    let exercise = myList.distinct();

    expect(exercise.toList()).toBe([
        1,
        2, 
        3, 
        4
    ]);
});

test('distinct objects', () => {
    // FIXTURES
    let myObjArray = [{"name": "XPTO"},{"name": "AMILSON"},{"name": "AMILSON"}]
    let myList = new List(myObjArray);

    //exercise
    let exercise = myList.distinct((obj) => obj["name"]);

    expect(exercise.toList()).toBe([
        {"name": "XPTO"},
        {"name": "AMILSON"}
    ]);
});

test('each', () => {
    // FIXTURES
    let myObjArray = [1, 2, 3, 4]
    let myList = new List(myObjArray);

    //exercise
    let count = 0;
    myList.each((obj) => count++);

    expect(count).toBe(4);
});

test('entries', () => {
    // FIXTURES
    let myObjArray = [1, 2, 3, 4]
    let myList = new List(myObjArray);

    //exercise
    let exercise = [...myList.entries()];

    expect(exercise).toBe([
        1,
        2,
        3,
        4
    ]);
});

test('first', () => {
    // FIXTURES
    let myArray = [1, 2, 3, 4]
    let myList = new List(myArray);

    //exercise
    let value = myList.first()

    expect(value).toBe(1);
});

test('first condition: has any', () => {
    // FIXTURES
    let myArray = [1, 2, 3, 4]
    let myList = new List(myArray);

    //exercise
    let value = myList.first((num: number) => num % 2 === 0);

    expect(value).toBe(2);
});

test('first condition: has none', () => {
    // FIXTURES
    let myArray = [1, 2, 3, 4]
    let myList = new List(myArray);

    //exercise
    let value = myList.first((num: number) => num > 4);

    expect(value).toBe(null);
});

test('last', () => {
    // FIXTURES
    let myArray = [1, 2, 3, 4]
    let myList = new List(myArray);

    //exercise
    let value = myList.last();

    expect(value).toBe(4);
});

test('any: exists', () => {
    // FIXTURES
    let myArray = [1, 2, 3, 4]
    let myList = new List(myArray);

    //exercise
    let value = myList.any((num) => num > 3);

    expect(value).toBe(true);
});

test('any: not exists', () => {
    // FIXTURES
    let myArray = [1, 2, 3, 4]
    let myList = new List(myArray);

    //exercise
    let value = myList.any((num) => num > 4);

    expect(value).toBe(false);
});


