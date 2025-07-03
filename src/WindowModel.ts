import type React from 'react';
import type { Size, Position } from './constants.ts';

export interface Window {
    taskbarIcon: string;
    title: string;
    resizeable: boolean;
    open: boolean;
    size?: Size;
    position?: Position;
    children: React.ReactElement;
}

export class WindowModel {
    id: string = crypto.randomUUID();
    props: Window;
    constructor(window: Window) {
        this.props = window;
    }
}
