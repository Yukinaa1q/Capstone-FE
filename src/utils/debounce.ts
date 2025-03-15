import { useEffect } from "react";
import { clearTimeout } from "timers";

export default function useDebounce() {
  useEffect(() => {
    
  })
  return debounce;
} 

function debounce(fn: () => void, delay: number) {
  let timeout = undefined;
  clearTimeout(timeout);
  timeout = setTimeout(fn, delay);
}