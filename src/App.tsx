import { useState } from 'react';
import './App.css';
import Taskbar from './components/taskbar/Taskbar';
import Window from './components/window/Window';
import { WindowModel } from './WindowModel';
import Welcome from './windows/Welcome';
import TaskbarButton from './components/taskbar/TaskbarButton';

function App() {
    const [windows, setWindows] = useState<WindowModel[]>([
        new WindowModel(
            <div>2</div>,
            '../public/icons/discord.png',
            'd3',
            false,
            true
        ),
        new WindowModel(
            <div>3</div>,
            '../public/icons/discord.png',
            'd4',
            false,
            true
        ),
        new WindowModel(
            <div>4</div>,
            '../public/icons/discord.png',
            'd5',
            false,
            true
        ),
        new WindowModel(
            <Welcome />,
            '../public/icons/discord.png',
            'Welcome',
            true,
            true
        ),
    ]);

    const handleWindowClick = (id: string) => {
        const window = windows.find((w) => w.id === id);

        if (!window) return;

        const filteredWindows = windows.filter((w) => w.id !== id);
        window.open = true;
        setWindows([...filteredWindows, window]);
    };

    return (
        <div className="desktop">
            {windows.map((window) => (
                <Window
                    key={window.id}
                    title={window.title}
                    id={window.id}
                    resizeable={window.resizeable}
                    onClick={handleWindowClick}
                    open={window.open}
                >
                    {window.children}
                </Window>
            ))}
            <Taskbar>
                {windows.map((window) => (
                    <TaskbarButton
                        key={window.id}
                        id={window.id}
                        icon={window.taskbarIcon}
                        title={window.title}
                        onClick={handleWindowClick}
                    />
                ))}
            </Taskbar>
        </div>
    );
}

export default App;
