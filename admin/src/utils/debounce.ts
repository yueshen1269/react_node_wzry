export default function debounce(func, threshold: number = 500, immediate: boolean = false) {
  if (typeof func !== "function") {
    throw new Error("First argument of debounce function should be a function");
  }
  let timer: NodeJS.Timeout | null = null;
  return function debounced(this: any, ...args) {
    const context = this;
    const callNow = immediate && !timer;
    const later = () => {
      timer = null;
      if (!immediate) func.apply(context, args);
    };
    console.log("please wait from debounce.js");
    timer !== null && clearTimeout(timer);
    timer = setTimeout(later, threshold);
    if (callNow) func.apply(context, args);
  };
}
