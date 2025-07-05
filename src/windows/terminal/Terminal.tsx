import { useEffect, useRef, useState, type ChangeEvent } from 'react';
import './Terminal.css';

function Terminal() {
    const startValue = `Welcome to the Terminal
Type 'help' to get started
> `;

    const area = useRef<HTMLTextAreaElement>(null);

    let currentInput = '';
    const [value, setValue] = useState(startValue);
    useEffect(() => {
        area.current?.addEventListener('keydown', (event) => {
            if (event.key.length === 1) {
                currentInput += event.key;
            }
        });
    });

    const handleOnChange = (e: ChangeEvent<HTMLTextAreaElement>) => {};

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
                ref={area}
                className="terminal-textarea"
                style={{ width: '100%', height: '100%' }}
                onChange={(e) => handleOnChange(e)}
                value={value + currentInput}
            />
        </div>
    );
}

export default Terminal;
