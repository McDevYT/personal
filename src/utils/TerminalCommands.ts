export function cowsay(message: string) {
    if (message.length > 1000) message = "I can't say that much at once!";

    const lineLength = 30;
    const cow = `    \\   ^__^
     \\  (oo)\\_______
        (__)\\       )\\/\\
            ||----w |
            ||     ||
    `;
    const lines: string[] = [];
    for (let i = 0; i < message.length; i += lineLength) {
        lines.push(message.slice(i, i + lineLength));
    }

    const bubbleWidth = Math.max(...lines.map((l) => l.length));

    let bubble = ' ' + '_'.repeat(bubbleWidth + 2) + '\n';

    if (lines.length === 1) {
        bubble += `< ${lines[0].padEnd(bubbleWidth, ' ')} >\n`;
    } else {
        for (let i = 0; i < lines.length; i++) {
            const line = lines[i].padEnd(bubbleWidth, ' ');
            if (i === 0) {
                bubble += `/ ${line} \\\n`;
            } else if (i === lines.length - 1) {
                bubble += `\\ ${line} /\n`;
            } else {
                bubble += `| ${line} |\n`;
            }
        }
    }

    bubble += ' ' + '-'.repeat(bubbleWidth + 2);

    return bubble + '\n' + cow;
}

export function help(): string {
    return `Available commands:

  help       - Show this help message
  echo       - Make the console say something. Usage: echo <message>
  cowsay     - Make the cow say something. Usage: cowsay <message>
  home       - Get to Terminal startscreen

Usage:
  Type a command followed by any necessary arguments.
  For example: cowsay Hello world!

`;
}

export function roll(args: string[]): string {
    if (args.length === 0) return 'Usage: roll <number>d<sides>, e.g. roll 2d6';

    const match = args[0].match(/^(\d+)d(\d+)$/);
    if (!match) return 'Usage: roll <number>d<sides>, e.g. roll 2d6';

    const count = parseInt(match[1]);
    const sides = parseInt(match[2]);

    if (count > 100) return 'Too many dice! Max 100.';

    const rolls: number[] = [];
    for (let i = 0; i < count; i++) {
        rolls.push(Math.floor(Math.random() * sides) + 1);
    }

    const total = rolls.reduce((a, b) => a + b, 0);
    return `You rolled: ${rolls.join(', ')} (Total: ${total})`;
}

export function reverse(args: string[]): string {
    if (args.length === 0) return 'Usage: reverse <text>';
    const text = args.join(' ');
    return text.split('').reverse().join('');
}

export function shout(args: string[]): string {
    if (args.length === 0) return 'Usage: shout <text>';
    const text = args.join(' ');
    return text.toUpperCase();
}

export function time(): string {
    return `Current time: ${new Date().toLocaleString()}`;
}

export function weather(): string {
    return "It's always sunny inside this program!";
}
