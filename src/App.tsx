import { useState } from 'react';
import './App.css';
import Taskbar from './components/taskbar/Taskbar';
import Window from './components/window/Window';
import { WindowModel } from './WindowModel';
import Welcome from './windows/welcome/Welcome.tsx';
import TaskbarButton from './components/taskbar/TaskbarButton';
import Background from './components/background/Background';
import IFrame from './windows/iframe/IFrame.tsx';
import Menu from './components/menu/Menu.tsx';

function App() {
    const [windows] = useState<WindowModel[]>([
        new WindowModel({
            children: <Welcome />,
            taskbarIcon: '../personal/icons/discord.png',
            title: 'Welcome',
            resizeable: true,
            open: true,
        }),
        new WindowModel({
            children: <IFrame src="https://mcdevyt.com" />,
            taskbarIcon: '../personal/icons/mcdevyt.png',
            title: 'mcdevyt.com',
            resizeable: true,
            open: false,
        }),
        new WindowModel({
            children: <IFrame src="https://www.terminaltemple.com/" />,
            taskbarIcon: '../personal/icons/javascript.png',
            title: 'Terminal',
            resizeable: true,
            open: false,
        }),
        new WindowModel({
            children: <div>2</div>,
            taskbarIcon: '../personal/icons/javascript.png',
            title: 'd3',
            resizeable: false,
            open: false,
        }),
    ]);

    const [windowsOrder, setWindowsOrder] = useState<string[]>(
        windows.filter((window) => window.props.open).map((window) => window.id)
    );

    const handleWindowClick = (id: string) => {
        const filteredWindows = windowsOrder.filter((wid) => wid !== id);
        setWindowsOrder([...filteredWindows, id]);
    };

    const handleWindowClose = (id: string) => {
        const filteredWindows = windowsOrder.filter((wid) => wid !== id);
        setWindowsOrder(filteredWindows);
    };

    return (
        <div className="desktop">
            <Background />
            {windowsOrder.map((id) => {
                const window = windows.find((w) => w.id === id);
                if (!window) return;
                return (
                    <Window
                        key={id}
                        title={window.props.title}
                        id={window.id}
                        resizeable={window.props.resizeable}
                        onClick={handleWindowClick}
                        onClose={handleWindowClose}
                    >
                        {window.props.children}
                    </Window>
                );
            })}
            <Menu />
            <Taskbar>
                {windows.map((window, i) => (
                    <TaskbarButton
                        key={i}
                        id={window.id}
                        icon={window.props.taskbarIcon}
                        title={window.props.title}
                        onClick={handleWindowClick}
                    />
                ))}
            </Taskbar>
        </div>
    );
}

export default App;
