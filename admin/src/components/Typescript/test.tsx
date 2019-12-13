import React from "react";

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
