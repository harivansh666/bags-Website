import { useEffect } from "react";

export function useKeyboardShortcut(
  key: string,
  callback: (e: KeyboardEvent) => void,
  metaOrCtrl = false
) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const isKeyMatch = e.key.toLowerCase() === key.toLowerCase();
      const isMetaMatch = !metaOrCtrl || e.metaKey || e.ctrlKey;

      if (isKeyMatch && isMetaMatch) {
        e.preventDefault();
        callback(e);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [key, callback, metaOrCtrl]);
}
