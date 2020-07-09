import { useEffect } from 'react';

export function useOutsideClick(ref: any, cb: () => any) {
    useEffect(() => {
        function handleClickOutside(event: any) {
            if (ref.current && !ref.current.contains(event.target)) {
                cb();
            }
        }

        // Bind the event listener
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            // Unbind the event listener on clean up

            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [ref, cb]);
}
