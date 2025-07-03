import { useState } from 'react';
import './Terminal.css';

function Terminal() {
    const startValue = `Welcome to the Matrix Terminal
Type 'help' to get started
> `;

    const [input, setInput] = useState('');

    return (
        <div
            className="terminal-div"
            style={{
                width: '100%',
                height: '100%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            <textarea
                className="terminal-textarea"
                style={{ width: '100%', height: '100%' }}
            >
                {startValue}
            </textarea>
        </div>
    );
}

export default Terminal;
