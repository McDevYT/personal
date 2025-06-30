import './Background.css';

function Background() {
    return (
        <div
            className="background"
            style={{
                position: 'absolute',
                zIndex: '-1',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                width: '100%',
                height: '100%',
            }}
        >
            <h1 className="backgroundText">Super Crazy Mega OS</h1>
        </div>
    );
}

export default Background;
