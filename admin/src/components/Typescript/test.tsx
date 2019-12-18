import React from "react";
import { any } from "prop-types";

// enum
enum dailyType {
  learning,
  sexing,
  reading,
  jogging,
  resting,
  working,
}
let dailyLearing: dailyType = dailyType.learning;

// tuple
let tupleList: [number, string, boolean, number[], dailyType] = [
  1,
  "2",
  false,
  [1, 2, 3],
  dailyType.jogging,
];

// never
function err(message: string): never {
  throw new Error(message);
}
function fail() {
  return err("Something Bad!");
}
// 类实现一个接口
interface ClockInterfaceD {
  currentTime: Date;
}
class ClockD implements ClockInterfaceD {
  currentTime: Date;
  constructor(h: number, m: number) {}
}

// 类实现一个接口时，接口只描述了类的公共部分，并且只对其实例部分进行检查
interface ClockConstructor {
  new (hour: number, minute: number): ClockInterface;
}
interface ClockInterface {
  tick();
}

function createClock(ctor: ClockConstructor, hour: number, minute: number): ClockInterface {
  return new ctor(hour, minute);
}

class DigitalClock implements ClockInterface {
  constructor(h: number, m: number) {}
  tick() {
    console.log("beep beep");
  }
}
class AnalogClock implements ClockInterface {
  constructor(h: number, m: number) {}
  tick() {
    console.log("tick tock");
  }
}

let digital = createClock(DigitalClock, 12, 17);
let analog = createClock(AnalogClock, 7, 32);

// 接口继承
interface Shape {
  color: string;
}
interface PenStroke {
  penWidth: number;
}
// 可以继承多个接口
interface Square extends Shape, PenStroke {
  sideLength: number;
}
let square = {} as Square;
square.color = "blue";
square.sideLength = 10;
square.penWidth = 5.0;

// 接口定义函数
interface SearchFunc {
  (source: string, subString: string): boolean;
}
// 接口定义混合类型，a:Counter 既可以a(1), 也可以a.interval,a.reset()调用
interface Counter {
  (start: number): string;
  interval: number;
  reset(): void;
}
function getCounter(): Counter {
  let counter = function(start: number) {} as Counter;
  counter.interval = 123;
  counter.reset = function() {};
  return counter;
}
let c = getCounter();
c(10);
c.reset();
c.interval = 5.0;
// class private, protected 标识符
// private name 只能在所在类中(Person)通过this.name访问，实例(new Person("yourName").name)和子类(Employee)(this.name)、子类实例(new Employee("anotherName").name)都不可访问
// protected 在所在类(Person)及子类(Employee)中可以访问(this.name)，但子类的实例(new Employee("anotherName").name)不能访问
class AnimalWithPrivateName {
  private name: string;
  constructor(theName: string) {
    this.name = theName;
  }
}

class RhinoPrivate extends AnimalWithPrivateName {
  constructor() {
    super("Rhino");
  }
  getName() {
    // err: 在子类中不能访问父类的private属性
    // return this.name;
  }
}
let animalWithPrivate = new AnimalWithPrivateName("Goat");
let rhinoPrivate = new RhinoPrivate();
// err: 下面访问name属性都报错
// animalWithPrivate.name;
// rhinoPrivate.name;

class AnimalWithProtectedName {
  // readonly 必须在声明时或构造函数里初始化
  readonly sex: string;
  protected name: string;
  // constructor构造函数也可以被标记为protected，但当前类不能被实例化，继承的子类可以被实例化
  constructor(theName: string) {
    this.name = theName;
    this.sex = "male";
  }
}

class RhinoProtected extends AnimalWithProtectedName {
  constructor() {
    super("Rhino");
  }
  getName() {
    // 在子类中可以访问父类的protected属性
    return this.name;
  }
}
// 如果 AnimalWithProtectedName 的构造函数被标记为protected，则AnimalWithProtectedName类不能实例化，
// 但其子类rhinoProtected可以被实例化
let animalWithProtected = new AnimalWithProtectedName("Goat");
let rhinoProtected = new RhinoProtected();
// err: 下面访问name属性都报错
// animalWithProtected.name;
// rhinoProtected.name;

// 抽象类 作为其他派生类的基类使用，一般不会直接被实例化
// abstract 关键字定义抽象类和在抽象类内部定义抽象方法
abstract class Department {
  constructor(public name: string) {}
  printName(): void {
    console.log("Department name: " + this.name);
  }
  // 抽象类中的抽象方法不包含具体实现并且必须在派生类中实现
  abstract printMeeting(): void; // 必须在派生类中实现
}
class AccountingDepartment extends Department {
  constructor() {
    super("Accounting and Auditing"); // 在派生类的构造函数中必须调用 super()
  }
  printMeeting(): void {
    console.log("The Accounting Department meets each Monday at 10am.");
  }
  generateReports(): void {
    console.log("Generating accounting reports...");
  }
}
let department: Department; // 允许创建一个对抽象类型的引用
// department = new Department(); // 错误: 不能创建一个抽象类的实例
department = new AccountingDepartment(); // 允许对一个抽象子类进行实例化和赋值
department.printName();
department.printMeeting();
// department.generateReports(); // 错误: 方法在声明的抽象类中不存在

// 类型兼容的基本规则：如果x要兼容y，那么y至少具有与x相同的属性
interface Named {
  name: string;
}
let nameX: Named;
let nameY = { name: "Jack", age: 21 };
// nameX兼容nameY，但nameX不可以直接赋值{name: "Jack", age: 21}
nameX = nameY;
// 检查函数参数时使用相同的规则
function greetNameD(n: Named) {
  return n.name;
}
greetNameD(nameY);

// 交叉类型intersection
function extend<T, U>(first: T, second: U): T & U {
  let result = {} as T & U;
  for (let id in first) {
    (result as any)[id] = (first as any)[id];
  }
  for (let id in second) {
    if (!result.hasOwnProperty(id)) {
      (result as any)[id] = (second as any)[id];
    }
  }
  return result;
}
// 联合类型Union
interface Bird {
  fly();
  layEggs();
}
interface Fish {
  swim();
  layEggs();
}
function getSmallPet(): Fish | Bird {
  // ...
  return {} as Fish | Bird;
}
let pet = getSmallPet();
//  联合类型 只能访问所有类型中共有的成员
pet.layEggs(); // okay
// pet.swim();    // errors

// 类型保护与区分类型 Type Guards and Differentiating Types
// 多次使用类型断言，很冗余
if ((pet as Fish).swim) {
  (pet as Fish).swim();
} else {
  (pet as Bird).fly();
}
// 类型保护机制，会在运行时检查以确保在某个作用域里的类型，定义一个类型保护，需要定义一个函数，返回值是一个类型谓词
// pet is Fish就是类型谓词，谓词为parameterName is Type 这种形式
// 每当使用一些变量调用isFish是，TypeScript会将变量缩减为那个具体的类型
function isFish(pet: Fish | Bird): pet is Fish {
  return (pet as Fish).swim !== undefined;
}
// TS不仅知道if分支里pet类型为Fish，而且还知道else分支里pet类型一定为Bird
if (isFish(pet)) {
  pet.swim();
} else {
  pet.fly();
}

// typeof 类型保护
// 对于原始类型来说，必须定义一个函数来判断其类型太痛苦了。不必将typeof x === "typename"抽象成一个函数，TS可以将它识别为一个类型保护，
// 直接在代码里检查类型了
// ps: typename 必须是"number","string","boolean","symbol"
function padLeft(value: string, padding: string | number) {
  if (typeof padding === "number") {
    return Array(padding + 1).join(" ") + value;
  }
  if (typeof padding === "string") {
    return padding + value;
  }
  throw new Error(`excepted string or number`);
}

// instanceof类型保护
// instanceof 右侧要求是一个构造函数，TS将细化为：
// 1. 此构造函数prototype属性的类型，如果不为any
// 2. 构造签名所返回的类型的联合
function getRandomClass() {
  return Math.random() < 0.5 ? new AnimalWithPrivateName("animal") : new RhinoProtected();
}
let randomAnimalClass = getRandomClass();
if (randomAnimalClass instanceof AnimalWithPrivateName) {
  randomAnimalClass;
} else {
  randomAnimalClass;
}

// null和undefined 可以赋值给任何类型，是其他类型的一个有效值，意味着不能阻止将它们赋值给其他类型
// --strictNullChecks 标记可以解决此错误，声明一个变量时不会自动的包含null和undefined
let s = "foo";
// s = null; // 错误, 'null'不能赋值给'string'
let sn: string | null = "bar";
sn = null; // 可以
// 使用 --strictNullChecks，可选参数和可选属性会被自动的加上 | undefined
function fOption(x: number, y?: number) {
  return x + (y || 0);
}
fOption(1, 2);
fOption(1, undefined);
// fOption(1,null); // error, 'null' is not assignable to 'number | undefined'

// 判断null或undefined
function fNull(sn: string | null): string {
  if (sn === null) {
    return "default";
  } else {
    return sn;
  }
  // 或者 return sn || "default";
}
// 可以使用类型断言手动取出null，方法是添加!后缀, 如 identifier!

// 类型别名，类似于接口，但可以作用于原始值，联合类型，元祖以及其他任何需要手写的类型
type stringName = string;
type NameResolver = () => string;
type NameOrResolver = stringName | NameResolver;
function getTypeName(n: NameOrResolver): Name {
  if (typeof n === "string") {
    return n;
  } else {
    return n();
  }
}
// 类型别名也可以是泛型
type Container<T> = { value: T };
// 类型别名不能出现在声明右侧的任何地方
// type Yikes = Array<Yikes>; // error

// 字符串字面量
type Easing = "ease-in" | "ease-out" | "ease-in-out";
// 字符串字面量类型还可以用于区分函数重载
function createElement(tagName: "img"): HTMLImageElement;
function createElement(tagName: "input"): HTMLInputElement;
// ... more overloads ...
function createElement(tagName: string): Element {
  // ... code goes here ...
}
// 可辨识联合（Discriminated Unions）,也称做标签联合或代数数据类型
// 合并单例类型，联合类型，类型保护和类型别名来创建一个叫做 可辨识联合的高级模式
interface Square {
  kind: "square";
  size: number;
}
interface Rectangle {
  kind: "rectangle";
  width: number;
  height: number;
}
interface Circle {
  kind: "circle";
  radius: number;
}
type AllShape = Square | Rectangle | Circle;
// 使用可辨识联合:
function area(s: AllShape) {
  switch (s.kind) {
    case "square":
      return s.size * s.size;
    case "rectangle":
      return s.height * s.width;
    case "circle":
      return Math.PI * s.radius ** 2;
  }
}
// 当没有涵盖所有可辨识联合的变化时，我们想让编译器可以通知我们
// 两种方式可以实现。 首先是启用 --strictNullChecks并且指定一个返回值类型：
function area1(s: AllShape): number {
  // error: returns number | undefined
  switch (s.kind) {
    case "square":
      return s.size * s.size;
    case "rectangle":
      return s.height * s.width;
    case "circle":
      return Math.PI * s.radius ** 2;
  }
}
// 第二种方法使用 never类型，编译器用它来进行完整性检查：
// 1.总是会抛出异常或根本就不会有返回值的函数表达式或箭头函数表达式的返回值类型。
// 2.变量也可能是Never类型，当它们被永不为真的类型保护所约束时。
// Never类型是任何类型的子类型，可以赋值给任何类型；没有类型是Never的子类型或可以赋值给Never类型（除了Never本身）。 即使 Any类型也不可以赋值给Never类型。
function assertNever(x: never): never {
  throw new Error("Unexpected object: " + x);
}
function areaWithNever(s: AllShape) {
  switch (s.kind) {
    case "square":
      return s.size * s.size;
    case "rectangle":
      return s.height * s.width;
    case "circle":
      return Math.PI * s.radius ** 2;
    default:
      return assertNever(s); // error here if there are missing cases
  }
}

// 索引类型（Index types）使用索引类型，编译器就能够检查使用了动态属性名的代码

// 通过 索引类型查询和 索引访问操作符：
function pluck<T, K extends keyof T>(o: T, names: K[]): T[K][] {
  return names.map(n => o[n]);
}
interface Person {
  name: string;
  age: number;
}
let person: Person = {
  name: "Jarid",
  age: 35,
};
let strings: string[] = pluck(person, ["name"]); // ok, string[]
// keyof T， 索引类型查询操作符。 对于任何类型 T， keyof T的结果为 T上已知的公共属性名的联合。 例如：
let personProps: keyof Person; // 'name' | 'age'
// T[K]， 索引访问操作符
// getProperty里的 o: T和 name: K，意味着 o[name]: T[K]。 当你返回 T[K]的结果，编译器会实例化键的真实类型，因此 getProperty的返回值类型会随着你需要的属性改变。
function getProperty<T, K extends keyof T>(o: T, name: K): T[K] {
  return o[name]; // o[name] is of type T[K]
}
let name: string = getProperty(person, "name");
let age: number = getProperty(person, "age");
// let unknown = getProperty(person, 'unknown'); // error, 'unknown' is not in 'name' | 'age'
// 索引类型和字符串索引签名
// keyof和 T[K]与字符串索引签名进行交互。 如果你有一个带有字符串索引签名的类型，那么 keyof T会是 string。 并且 T[string]为索引签名的类型：
interface Map<T> {
  [key: string]: T;
}
let keys: keyof Map<number>; // string
let value: Map<number>["foo"]; // number

// 映射类型 改变已知属性的每个属性类型，如将每个类型都变为可选的或者只读的
type Readonly<T> = {
  readonly [P in keyof T]: T[P];
};
type Partial<T> = {
  [P in keyof T]?: T[P];
};
type Pick<T, K extends keyof T> = {
  [P in K]: T[P];
};
type Record<K extends string, T> = {
  [P in K]: T;
};
type PersonPartial = Partial<Person>;
type ReadonlyPerson = Readonly<Person>;
type ThreeStringProps = Record<"prop1" | "prop2" | "prop3", string>;

type AppProps = { message: string };
enum Job {
  "Teacher",
  "Doctor",
  "lawyer",
  "official",
}
type IUser = {
  name: string;
  age: number;
  sex: boolean;
  job: Job;
};

const App = ({ message }: AppProps) => {
  const [val, toggle] = React.useState(false);
  const [user, setUser] = React.useState<IUser | null>(null);
  const ref1 = React.useRef<HTMLElement>(null!);
  const ref2 = React.useRef<HTMLElement | null>(null);
  const inputEl = React.useRef<HTMLInputElement>(null);
  React.useEffect(() => {}, []);
  const onButtonClick = () => {
    if (inputEl && inputEl.current) {
      inputEl.current.focus();
    }
  };
  type PartialPointX = { x: number };
  type Point = PartialPointX & { y: number };
  interface IPoint extends Point {
    z: number;
  }
  type PointK = IPoint & { k: number };
  const a = { who: "me" };
  type b = { why: string } & typeof a;
  type d = { who: string; why: string };
  const k: d = { who: "her", why: "no" };
  const c: b = { who: "this", why: "how" };
  const flag = typeof k === typeof c;

  const data: dataType = {
    a: 3,
    hello: "world",
  };
  type dataType = { a: number; hello: string };
  function get<S extends dataType, T extends keyof S>(o: S, name: T) {
    return o[name];
  }

  // 类型约束 extends关键字和true约束T的类型
  type isTrue<T> = T extends true ? true : false;
  type kkk = dataType extends boolean ? true : false;

  interface obj1 {
    name: string;
  }
  interface obj2 {
    password: string;
  }
  let userK: obj1 | obj2;
  userK = { name: "D", password: "dd" };
  enum doorState {
    open,
    closed,
  }
  const doorOpen: doorState = doorState.open;
  type AppState = {};
  type Action = { type: "SET_ONE"; payload: string } | { type: "SET_TWO"; payload: number };
  function useLoading() {
    const [isLoading, setState] = React.useState(false);
    const load = (aPromise: Promise<any>) => {
      setState(true);
      return aPromise.finally(() => setState(false));
    };
    // [isLoading, load] 会被类型推论-> 最佳通用类型，未找到最佳通用类型，类型推断的结果为联合数组类型
    // let a = [1, "1"] ; a会被推论为(string | number)[], 所以再次赋值：a = [1,2,3,4] 这样是可以的
    // as const 后 a 的类型为： readonly [1, "1"]
    return [isLoading, load] as const; // infers [boolean, typeof load] instead of (boolean | typeof load)[]
  }

  function getActions(): readonly Action[] {
    // ts会将mutable的值自动进行类型推断
    // 除了主动声明类型，类型推断 as const 也可以解决
    let result = [
      { type: "SET_ONE", payload: "one" },
      { type: "SET_TWO", payload: 2 },
    ] as const;
    return result;
  }
  function reducer(state: AppState, action: Action): AppState {
    switch (action.type) {
      case "SET_ONE":
        return {
          ...state,
          one: action.payload,
        };
      case "SET_TWO":
        return {
          ...state,
          two: action.payload,
        };
      default:
        return state;
    }
  }
  return (
    <>
      <div>{message}</div>;
      <input ref={inputEl} type="text" />
      <button onClick={onButtonClick}></button>
    </>
  );
};
