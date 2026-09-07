import { useEffect, useRef, type RefObject } from "react";

interface UseCloseOnClickProps {
  close: () => void;
  listenCapturing?: true;
}

export default function useCloseOnClick({
  close,
  listenCapturing = true,
}: UseCloseOnClickProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(
    function () {
      function handleClick(e: MouseEvent) {
        if (ref.current && !ref.current.contains(e.target as Node)) {
          close();
        }
      }

      document.addEventListener("click", handleClick, listenCapturing);

      return () => {
        document.removeEventListener("click", handleClick, listenCapturing);
      };
    },
    [close, ref, listenCapturing], // Add ref to dependencies
  );

  return ref;
}
