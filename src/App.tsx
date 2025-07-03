import { useState } from 'react';
import './App.css';
import Taskbar from './components/taskbar/Taskbar';
import Window from './components/window/Window';
import { WindowModel } from './WindowModel';
import Welcome from './windows/welcome/Welcome.tsx';
import TaskbarButton from './components/taskbar/TaskbarButton';
import Background from './components/background/Background';
import Menu from './components/menu/Menu.tsx';
import MenuAppButton from './components/menu/MenuAppButton.tsx';
import Terminal from './windows/terminal/Terminal.tsx';

function App() {
    const [menuOpen, setMenuOpen] = useState(false);

    const [taskbarButtonCount] = useState(4);

    const [windows] = useState<WindowModel[]>([
        new WindowModel({
            children: <Welcome />,
            taskbarIcon: './icons/discord.png',
            title: 'Welcome',
            resizeable: true,
            open: true,
        }),

        new WindowModel({
            children: <Terminal />,
            taskbarIcon: './icons/terminal.png',
            title: 'Terminal',
            size: { width: 1000, height: 600 },
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
        <div className="desktop" onClick={() => setMenuOpen(false)}>
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
                        position={window.props.position}
                        size={window.props.size}
                    >
                        {window.props.children}
                    </Window>
                );
            })}
            <Menu open={menuOpen}>
                {windows.map((window, i) => (
                    <MenuAppButton
                        key={i}
                        icon={window.props.taskbarIcon}
                        title={window.props.title}
                        onClick={() => {
                            handleWindowClick(window.id);

                            setMenuOpen(false);
                        }}
                    />
                ))}
            </Menu>
            <Taskbar>
                <>
                    <TaskbarButton
                        key={-1}
                        icon={'./icons/menu.svg'}
                        title={'Menu'}
                        onClick={(e) => {
                            setMenuOpen(!menuOpen);
                            e.stopPropagation();
                        }}
                    />
                    {windows.map((window, i) => {
                        return (
                            i < taskbarButtonCount && (
                                <TaskbarButton
                                    key={i}
                                    icon={window.props.taskbarIcon}
                                    title={window.props.title}
                                    onClick={() => handleWindowClick(window.id)}
                                />
                            )
                        );
                    })}
                </>
            </Taskbar>
        </div>
    );
}

export default App;
