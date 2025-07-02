import { useEffect, useRef, useState } from 'react';
import './Menu.css';

const TRANSITIONS = {
    OPEN: 'menu-open',
    CLOSE: 'menu-close',
    NONE: '',
};

function Menu() {
    const [transitionState, setTransitionState] = useState(TRANSITIONS.CLOSE);

    const menuRef = useRef<HTMLDivElement>(null);

    const [open] = useState(false);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                menuRef.current &&
                !menuRef.current.contains(event.target as Node)
            ) {
                setTransitionState(TRANSITIONS.CLOSE);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        open && (
            <div
                ref={menuRef}
                className={`menu ${transitionState}`}
                style={{
                    height: '50vh',
                    width: '50vw',

                    background: 'white',
                    padding: '20px',
                    borderRadius: '10px',
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                }}
            ></div>
        )
    );
}

export default Menu;
