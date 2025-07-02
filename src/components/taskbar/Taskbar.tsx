import MenuButton from './MenuButton';
import './Taskbar.css';

function Taskbar(props: { children: React.ReactElement[] }) {
    return (
        <div
            style={{
                userSelect: 'none',
                height: '60px',
                padding: '10px',
                display: 'flex',
                justifyContent: 'center',
                marginBottom: '20px',
                position: 'fixed',
                bottom: '0',
                left: '50%',
                transform: 'translate(-50%)',
                borderRadius: '10px',
                backdropFilter: 'blur(10px)',
                gap: '10px',
                background: 'rgba(255, 255, 255, 0.2)',
                color: 'white',
                WebkitBackdropFilter: 'blur(10px)',
            }}
        >
            <MenuButton />
            {props.children}
        </div>
    );
}

export default Taskbar;
