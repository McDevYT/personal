import './Background.css';
import Clock from './Clock';

function Background() {
    return (
        <div
            className="background"
            style={{
                position: 'absolute',
                zIndex: '-1',
                flexDirection: 'column',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                width: '100%',
                userSelect: 'none',
                height: '100%',
            }}
        >
            <Clock />
            <h1 className="backgroundText">Super Crazy Mega OS</h1>
        </div>
    );
}

export default Background;
