export function debounce<T>(fn: (arg: T) => void) {
  let timer: NodeJS.Timeout;
  return (arg: T) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(arg), 500);
  };
}
