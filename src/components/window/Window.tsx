import React, { useState, useRef } from 'react';

interface WindowProps {
    id: string;
    title: string;
    resizeable?: boolean;
    onClick: (id: string) => void;
    children: React.ReactElement;
    open: boolean;
}

type Position = { x: number; y: number };
type Size = { width: number; height: number };

const Window = (props: WindowProps) => {
    const [size, setSize] = useState<Size>({ width: 300, height: 200 });
    const [position, setPosition] = useState<Position>({
        x: window.innerWidth / 2 - size.width / 2,
        y: window.innerHeight / 2 - size.height / 2,
    });
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

    return (
        <div
            onMouseDown={() => props.onClick(props.id)}
            style={{
                position: 'absolute',
                left: position.x,
                top: position.y,
                width: size.width,
                height: size.height,
                border: '2px solid #444',
                background: '#fff',
                boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
                display: 'flex',
                flexDirection: 'column',
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
                <div
                    style={{
                        width: '16px',
                        height: '16px',
                        background: '#444',
                        cursor: 'pointer',
                        userSelect: 'none',
                        justifySelf: 'flex-end',
                        marginLeft: 'auto',
                    }}
                />
            </div>
            <div style={{ flex: 1, padding: '10px' }}> {props.children}</div>
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
