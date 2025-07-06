import { useRef, useState, type ChangeEvent, type KeyboardEvent } from 'react';
import './Terminal.css';
import {
    cowsay,
    reverse,
    roll,
    shout,
    time,
    weather,
} from '../../utils/TerminalCommands';

interface TerminalProps {
    ip?: string;
}

function Terminal(props: TerminalProps) {
    const { ip } = props;

    const startValue = `--------------------------------------------------
          WELCOME TO TERMINAL SYSTEM v1.0
--------------------------------------------------

User: guest
Host: ${ip ?? '122.223.565.111'}
OS: Linux 5.15.0-70-generic

Type 'help' to list available commands.
 `;

    const commands: Record<string, (args: string[]) => void> = {
        clear: (_args: string[]) => clear(),
        echo: (args: string[]) => printLine(args.join(' ')),
        cowsay: (args: string[]) => printLine(cowsay(args.join(' '))),
        home: (_args: string[]) => {
            clear();
            print(startValue);
        },

        roll: (args: string[]) => printLine(roll(args)),
        reverse: (args: string[]) => printLine(reverse(args)),
        shout: (args: string[]) => printLine(shout(args)),
        time: (_args: string[]) => printLine(time()),
        weather: (_args: string[]) => printLine(weather()),
    };

    const area = useRef<HTMLTextAreaElement>(null);
    const [history, setHistory] = useState(startValue);
    const [currentInput, setCurrentInput] = useState('');

    const allowInput = true;

    const clear = () => {
        setHistory('');
        setCurrentInput('');
        if (area.current) {
            area.current.scrollTop = 0;
        }
    };

    const printLine = (message: string = '') => {
        setHistory((prev) => prev + message + '\n');
    };
    const print = (message: string = '') => {
        setHistory((prev) => prev + message);
    };

    const runCommand = (input: string) => {
        const [cmd, ...args] = input.trim().split(/\s+/);
        const command = commands[cmd];

        setHistory((prev) => prev + input);
        printLine();
        if (command) {
            command(args);
        } else {
            printLine(`Unknown command: ${cmd}`);
        }

        print('guest@my-computer:~$ ');
        setCurrentInput('');
    };

    const handleOnChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        const text = e.target.value;
        if (!allowInput || text.slice(0, history.length) !== history) return;

        const input = text.slice(history.length);
        setCurrentInput(input);
    };

    const handleKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            runCommand(currentInput);
        }
        setTimeout(() => {
            if (area.current) {
                area.current.scrollTop = area.current.scrollHeight;
            }
        }, 0);
    };

    return (
        <div
            className="terminal-div"
            style={{ width: '100%', height: '100%', overflow: 'hidden' }}
        >
            <textarea
                ref={area}
                className="terminal-textarea"
                style={{ width: '100%', height: '100%' }}
                onChange={handleOnChange}
                onKeyDown={handleKeyDown}
                value={history + currentInput}
            />
        </div>
    );
}

export default Terminal;
