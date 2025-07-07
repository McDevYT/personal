import { useState } from 'react';
import './Background.css';
import Clock from './Clock';
import { type Size, type Position } from '../../constants';

function Background() {
    const [selectorPosition, setSelectorPosition] = useState<Position>({
        x: 0,
        y: 0,
    });
    const [showSelector, setShowSelector] = useState(false);
    const [selectorSize, setSelectorSize] = useState<Size>({
        width: 0,
        height: 0,
    });

    const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
        const startX = e.clientX;
        const startY = e.clientY;

        const mouseMove = (moveEvent: MouseEvent) => {
            setShowSelector(true);
            const currentX = moveEvent.clientX;
            const currentY = moveEvent.clientY;

            const left = Math.min(startX, currentX);
            const top = Math.min(startY, currentY);
            const width = Math.abs(currentX - startX);
            const height = Math.abs(currentY - startY);

            setSelectorPosition({ x: left, y: top });
            setSelectorSize({ width, height });
        };

        const mouseUp = () => {
            setSelectorSize({ width: 0, height: 0 });
            setShowSelector(false);
            window.removeEventListener('mousemove', mouseMove);
            window.removeEventListener('mouseup', mouseUp);
        };

        window.addEventListener('mousemove', mouseMove);
        window.addEventListener('mouseup', mouseUp);
    };

    return (
        <div
            className="background"
            style={{
                position: 'absolute',
                flexDirection: 'column',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                userSelect: 'none',
                width: '100%',
                height: '100%',
            }}
            onMouseDown={handleMouseDown}
        >
            {showSelector && (
                <div
                    className="selector"
                    style={{
                        position: 'absolute',
                        width: selectorSize.width,
                        height: selectorSize.height,
                        top: selectorPosition.y,
                        left: selectorPosition.x,
                    }}
                />
            )}
            <Clock />
            <h1 className="backgroundText">Super Crazy Mega OS</h1>
        </div>
    );
}

export default Background;
