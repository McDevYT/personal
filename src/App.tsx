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
import { RandomIP4 } from './utils/RandomGenerator.ts';

function App() {
    const [menuOpen, setMenuOpen] = useState(false);

    const [taskbarButtonCount] = useState(4);

    const [windows] = useState<WindowModel[]>([
        new WindowModel({
            children: <Welcome />,
            icon: './personal/icons/discord.png',
            title: 'Welcome',
            resizeable: true,
            open: true,
            hideInTaskbar: true,
            hideInMenu: true,
        }),

        new WindowModel({
            children: <Terminal ip={RandomIP4()} />,
            icon: './personal/icons/terminal.svg',
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
                {windows
                    .filter((window) => !window.props.hideInMenu)
                    .map((window, i) => (
                        <MenuAppButton
                            key={i}
                            icon={window.props.icon}
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
                        icon={'./personal/icons/menu.svg'}
                        title={'Menu'}
                        onClick={(e) => {
                            setMenuOpen(!menuOpen);
                            e.stopPropagation();
                        }}
                    />
                    {windows
                        .filter((window) => !window.props.hideInTaskbar)
                        .map((window, i) => {
                            return (
                                i < taskbarButtonCount && (
                                    <TaskbarButton
                                        key={i}
                                        icon={window.props.icon}
                                        title={window.props.title}
                                        onClick={() =>
                                            handleWindowClick(window.id)
                                        }
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
