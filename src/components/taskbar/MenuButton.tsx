function MenuButton(props: { onClick: () => void }) {
    return (
        <div
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
            onClick={() => props.onClick()}
        >
            <img
                style={{
                    width: '100%',
                    objectFit: 'fill',
                }}
                src={'./icons/menu.svg'}
            />
        </div>
    );
}

export default MenuButton;
