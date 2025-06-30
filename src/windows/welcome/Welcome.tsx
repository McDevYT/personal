import './Welcome.css';

function Welcome() {
    return (
        <div
            className="welcome-div"
            style={{
                width: '100%',
                height: '100%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            Welcome
        </div>
    );
}

export default Welcome;
