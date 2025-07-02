import { useRef } from 'react';

function TaskbarButton(props: {
    icon: string;
    title: string;
    id: string;
    onClick: (id: string) => void;
}) {
    const ref = useRef<HTMLDivElement>(null);

    const handleClick = () => {
        const el = ref.current;
        if (!el) return;

        el.classList.add('is-pressed');
        props.onClick(props.id);
        const removeClass = () => {
            el.classList.remove('is-pressed');
            el.removeEventListener('animationend', removeClass);
        };

        el.addEventListener('animationend', removeClass);
    };
    return (
        <div
            ref={ref}
            className="taskbar-button"
            style={{
                height: '100%',
                aspectRatio: '1/1',
                display: 'flex',
                borderRadius: '20px',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'red',
                overflow: 'hidden',
                cursor: 'pointer',
            }}
            onClick={handleClick}
        >
            <img
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
