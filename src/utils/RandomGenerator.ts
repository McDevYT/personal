export function RandomIP4(): string {
    return `${Math.floor(Math.random() * 256)}.${Math.floor(
        Math.random() * 256
    )}.${Math.floor(Math.random() * 256)}.${Math.floor(Math.random() * 256)}`;
}
