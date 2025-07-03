import { useRef } from 'react';

function MenuAppButton(props: {
    icon: string;
    title: string;
    onClick: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}) {
    const ref = useRef<HTMLDivElement>(null);

    return (
        <div
            ref={ref}
            style={{
                aspectRatio: '1/1',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'start',
                flexDirection: 'column',
                color: 'white',
                cursor: 'pointer',
            }}
            onClick={(e) => props.onClick(e)}
        >
            <img
                draggable="false"
                className="menu-app-button"
                style={{
                    borderRadius: '10px',
                    width: '70px',
                    objectFit: 'fill',
                }}
                src={props.icon}
            />
            <p>{props.title}</p>
        </div>
    );
}

export default MenuAppButton;
