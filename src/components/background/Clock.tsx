import { useEffect, useState } from 'react';

function Clock() {
    const [time, setTime] = useState<string>(
        new Date().toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
        })
    );

    useEffect(() => {
        const interval = setInterval(() => {
            setTime(
                new Date().toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit',
                })
            );
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div
            style={{
                color: 'white',
                fontSize: '48px',
                fontWeight: '600',
                userSelect: 'none',
            }}
        >
            {time}
        </div>
    );
}

export default Clock;
