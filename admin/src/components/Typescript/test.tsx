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
