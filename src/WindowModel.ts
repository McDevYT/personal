import type React from 'react';

export interface Window {
    taskbarIcon: string;
    title: string;
    resizeable: boolean;
    open: boolean;

    children: React.ReactElement;
}

export class WindowModel {
    id: string = crypto.randomUUID();
    props: Window;
    constructor(window: Window) {
        this.props = window;
    }
}
