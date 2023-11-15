import type { RefObject } from 'react';
import { useEffect } from 'react';

/**
 * This hook allows you to detect clicks outside of a specified element.
 * SEE: https://usehooks.com/useOnClickOutside/
 */
export function useClickOutside(ref: RefObject<HTMLElement>, handler: (event: Event) => void) {
  useEffect(
    () => {
      function listener(event: Event) {
        // Do nothing if clicking ref's element or descendent elements
        if (ref.current === null || ref.current.contains(event.target as Node)) {
          return;
        }
        handler(event);
      }

      document.addEventListener('mousedown', listener);
      document.addEventListener('touchstart', listener);

      return () => {
        document.removeEventListener('mousedown', listener);
        document.removeEventListener('touchstart', listener);
      };
    },

    /**
     * You should wrap handler in useCallback before passing it into this hook.
     */
    [ref, handler]
  );
}
