import { useEffect, useRef, useState, type JSX } from 'react';
import './Menu.css';

const TRANSITIONS = {
    OPEN: 'menu-open',
    CLOSE: 'menu-close',
    NONE: '',
};

function Menu(props: { open: boolean; children: JSX.Element[] | JSX.Element }) {
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
                    userSelect: 'none',
                    padding: '40px',
                    borderRadius: '10px',
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                }}
                onAnimationEnd={onAnimationEnd}
            >
                <div
                    style={{
                        height: '100%',
                        width: '100%',
                        display: 'flex',
                        flexWrap: 'wrap',
                        gap: '20px',
                    }}
                >
                    {props.children}
                </div>
            </div>
        )
    );
}

export default Menu;
