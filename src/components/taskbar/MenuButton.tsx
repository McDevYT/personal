import { useRef } from 'react';

function MenuButton() {
    const ref = useRef<HTMLDivElement>(null);

    const handleClick = () => {
        const el = ref.current;
        if (!el) return;

        el.classList.add('is-pressed');

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
                src={'../personal/icons/menu.svg'}
            />
        </div>
    );
}

export default MenuButton;
