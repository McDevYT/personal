import { useRef } from 'react';

function TaskbarButton(props: {
    icon: string;
    title: string;
    onClick: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}) {
    const ref = useRef<HTMLDivElement>(null);

    return (
        <div
            ref={ref}
            className="taskbar-button"
            style={{
                height: '100%',
                aspectRatio: '1/1',
                display: 'flex',
                borderRadius: '15px',
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'hidden',
                cursor: 'pointer',
            }}
            onClick={(e) => props.onClick(e)}
        >
            <img
                draggable="false"
                style={{
                    width: '100%',
                    objectFit: 'fill',
                }}
                src={props.icon}
            />
        </div>
    );
}

export default TaskbarButton;
