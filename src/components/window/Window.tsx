import React, { useState, useRef } from 'react';
import './Window.css';
import type { Size, Position } from '../../constants.ts';

interface WindowProps {
    id: string;
    title: string;
    resizeable?: boolean;
    onClick: (id: string) => void;
    onClose: (id: string) => void;
    children: React.ReactElement;
    position?: Position;
    size?: Size;
}

const TRANSITIONS = {
    OPEN: 'window-open',
    CLOSE: 'window-close',
    NONE: '',
};

const Window = (props: WindowProps) => {
    const windowRef = useRef<HTMLDivElement>(null);

    const [size, setSize] = useState<Size>(
        props.size ?? { width: 600, height: 400 }
    );

    const [position, setPosition] = useState<Position>(
        props.position ?? {
            x: window.innerWidth / 2 - size.width / 2,
            y: window.innerHeight / 2 - size.height / 2,
        }
    );

    const [transitionState, setTransitionState] = useState(TRANSITIONS.OPEN);
    const dragging = useRef(false);
    const resizing = useRef(false);
    const dragOffset = useRef<Position>({ x: 0, y: 0 });

    const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
        dragging.current = true;
        dragOffset.current = {
            x: e.clientX - position.x,
            y: e.clientY - position.y,
        };
        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);
    };

    const handleMouseMove = (e: MouseEvent) => {
        if (dragging.current) {
            setPosition({
                x: e.clientX - dragOffset.current.x,
                y: e.clientY - dragOffset.current.y,
            });
        } else if (resizing.current) {
            setSize({
                width: Math.max(150, e.clientX - position.x),
                height: Math.max(100, e.clientY - position.y),
            });
        }
    };

    const handleMouseUp = () => {
        dragging.current = false;
        resizing.current = false;
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
    };

    const handleResizeMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
        resizing.current = true;
        e.stopPropagation();
        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);
    };

    const handleClose = (e: React.MouseEvent) => {
        e.stopPropagation();
        setTransitionState(TRANSITIONS.CLOSE);
    };

    const handleAnimationEnd = () => {
        if (transitionState === TRANSITIONS.CLOSE) {
            props.onClose(props.id);
        }

        setTransitionState(TRANSITIONS.NONE);
    };
    return (
        <div
            ref={windowRef}
            className={`window ${transitionState}`}
            onMouseDown={() => props.onClick(props.id)}
            onAnimationEnd={handleAnimationEnd}
            style={{
                overflow: 'hidden',
                position: 'absolute',
                left: position.x,
                top: position.y,
                width: size.width,
                height: size.height,
                border: '2px solid #444',
                background: '#fff',
                boxShadow: '4px 8px 2px rgba(0,0,0,0.4)',
                display: 'flex',
                flexDirection: 'column',
                borderRadius: '8px',
            }}
        >
            <div
                onMouseDown={handleMouseDown}
                style={{
                    background: '#0078D7',
                    padding: '8px',
                    color: '#fff',
                    cursor: 'move',
                    display: 'flex',

                    userSelect: 'none',
                }}
            >
                <p
                    style={{
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        textWrap: 'nowrap',
                        margin: '0',
                        flex: '1',
                    }}
                >
                    {props.title}
                </p>
                <img
                    className="close-button"
                    src="./icons/close.svg"
                    onMouseDown={(e) => e.stopPropagation()}
                    onClick={handleClose}
                    style={{
                        width: '20px',
                        height: '20px',
                        background: 'rgb(185, 39, 39)',
                        cursor: 'pointer',
                        userSelect: 'none',
                        borderRadius: '7px',
                        justifySelf: 'flex-end',
                        marginLeft: 'auto',
                    }}
                />
            </div>
            <div
                style={{
                    flex: 1,
                    overflow: 'hidden',
                    padding: '0',
                    margin: '0',
                }}
            >
                {props.children}
            </div>
            {props.resizeable && (
                <div
                    onMouseDown={handleResizeMouseDown}
                    style={{
                        width: '16px',
                        height: '16px',
                        background: '#0078D7',
                        position: 'absolute',
                        right: 0,
                        bottom: 0,
                        cursor: 'nwse-resize',

                        userSelect: 'none',
                    }}
                />
            )}
        </div>
    );
};

export default Window;
