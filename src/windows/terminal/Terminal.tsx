import { useEffect, useRef, useState, type ChangeEvent } from 'react';
import './Terminal.css';

function Terminal() {
    const startValue = `Welcome to the Terminal
Type 'help' to get started
> `;

    const commands: Record<string, (args: string[]) => void> = {
        clear: (_args: string[]) => clear(),
        echo: (args: string[]) => print(args.join(' ')),
    };

    function runCommand(input: string) {
        const [cmd, ...args] = input.trim().split(/\s+/);
        const command = commands[cmd];
        if (command) {
            command(args);
        } else {
            print(`Unknown command: ${cmd}`);
        }
    }

    const area = useRef<HTMLTextAreaElement>(null);

    const allowInput = true;

    const [history, setHistory] = useState(startValue);
    const [currentInput, setCurrentInput] = useState('');

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Enter') {
                runCommand(currentInput);
                event.preventDefault();
            }
        };

        area?.current?.addEventListener('keydown', handleKeyDown);
        return () =>
            area.current?.removeEventListener('keydown', handleKeyDown);
    }, [currentInput]);

    const clear = () => {
        setHistory('');
        setCurrentInput('');
    };

    const print = (message: string) => {
        const newHistory = history + message + '\n> ';
        setHistory(newHistory);
        setCurrentInput('');
    };

    const handleOnChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        const text = e.target.value;
        if (!allowInput || text.slice(0, history.length) !== history) return;

        const input = text.slice(history.length);
        setCurrentInput(input);
    };

    return (
        <div
            className="terminal-div"
            style={{
                width: '100%',
                height: '100%',
                overflow: 'hidden',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            <textarea
                ref={area}
                className="terminal-textarea"
                style={{ width: '100%', height: '100%' }}
                onChange={handleOnChange}
                value={history + currentInput}
            />
        </div>
    );
}

export default Terminal;
