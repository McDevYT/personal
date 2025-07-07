import {
    useEffect,
    useRef,
    useState,
    type ChangeEvent,
    type KeyboardEvent,
} from 'react';
import './Terminal.css';
import {
    cowsay,
    help,
    joke,
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

    let user = 'guest@my-computer:~$ ';
    const [inputHistory] = useState<string[]>([]);
    const [inputIndex, setInputIndex] = useState(2);

    useEffect(() => {
        setCurrentInput(inputHistory[inputIndex] || '');
    }, [inputIndex, inputHistory]);

    const commands: Record<string, (args: string[]) => void> = {
        clear: async () => clear(),
        echo: async (args: string[]) => printLine(args.join(' ')),
        cowsay: async (args: string[]) => printLine(cowsay(args.join(' '))),
        home: async () => {
            clear();
            print(startValue);
        },
        joke: async () => joke().then((joke) => printLine(joke)),
        help: async () => printLine(help()),
        roll: async (args: string[]) => printLine(roll(args)),
        reverse: async (args: string[]) => printLine(reverse(args)),
        shout: async (args: string[]) => printLine(shout(args)),
        time: async () => printLine(time()),
        weather: async () => printLine(weather()),
    };

    const area = useRef<HTMLTextAreaElement>(null);
    const [history, setHistory] = useState(startValue + '\n' + user);
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

    const runCommand = async (input: string) => {
        const [cmd, ...args] = input.trim().split(/\s+/);
        const command = commands[cmd];

        inputHistory.push(input);
        setInputIndex(inputHistory.length);

        setHistory((prev) => prev + input);
        printLine();
        if (command) {
            await command(args);
        } else {
            printLine(`Unknown command: ${cmd}`);
        }

        print(user);
        setCurrentInput('');
    };

    const handleOnChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        const text = e.target.value;
        if (!allowInput || text.slice(0, history.length) !== history) return;

        const input = text.slice(history.length);
        setCurrentInput(input);
    };

    const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            if (currentInput.trim()) runCommand(currentInput);
        }
        if (e.key === 'ArrowUp') {
            setInputIndex((prev) =>
                Math.min(prev - 1, inputHistory.length - 1)
            );
            e.preventDefault();
        } else if (e.key === 'ArrowDown') {
            setInputIndex((prev) => Math.max(prev + 1, 0));
            e.preventDefault();
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
