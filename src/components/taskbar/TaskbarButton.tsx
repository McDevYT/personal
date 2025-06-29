function TaskbarButton(props: {
    icon: string;
    title: string;
    id: string;
    onClick: (id: string) => void;
}) {
    return (
        <div
            style={{
                height: '100%',
                aspectRatio: '1/1',
                display: 'flex',
                borderRadius: '300px',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'red',
                overflow: 'hidden',
                cursor: 'pointer',
            }}
            onClick={() => props.onClick(props.id)}
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
