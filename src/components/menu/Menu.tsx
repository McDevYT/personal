import React, { useEffect, useRef, useState } from 'react';
import './Menu.css';

const TRANSITIONS = {
    OPEN: 'menu-open',
    CLOSE: 'menu-close',
    NONE: '',
};

function Menu(props: { open: boolean }) {
    const { open } = props;
    const [transitionState, setTransitionState] = useState(TRANSITIONS.NONE);
    const [rendering, setRendering] = useState<boolean>(false);
    const menuRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        setRendering(true);
        setTransitionState(open ? TRANSITIONS.OPEN : TRANSITIONS.CLOSE);
    }, [open]);
    useEffect(() => setRendering(false), []);
    const onAnimationEnd = () => {
        setTransitionState(TRANSITIONS.NONE);
        setRendering(open);
    };

    return (
        rendering && (
            <div
                onClick={(e) => e.stopPropagation()}
                ref={menuRef}
                className={`menu ${transitionState}`}
                style={{
                    height: '50vh',
                    width: '50vw',
                    zIndex: '11',

                    background: 'white',
                    padding: '20px',
                    borderRadius: '10px',
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                }}
                onAnimationEnd={onAnimationEnd}
            ></div>
        )
    );
}

export default Menu;
