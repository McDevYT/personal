import type React from 'react';

export class WindowModel {
    id: string = crypto.randomUUID();

    taskbarIcon: string;
    title: string;
    resizeable: boolean;
    open: boolean;

    children: React.ReactElement;

    constructor(
        children: React.ReactElement,
        icon: string,
        title: string,
        resizeable: boolean = true,
        openAtStart = true
    ) {
        this.taskbarIcon = icon;
        this.open = openAtStart;
        this.resizeable = resizeable;
        this.children = children;
        this.title = title;
    }
}
