export declare class Mouse {
    private readonly canvas;
    active: boolean;
    x: number;
    y: number;
    constructor(canvas: HTMLCanvasElement);
    subscribe(): void;
    unsubscribe(): void;
    private usePointer;
    private pointerDown;
    private pointerUp;
    private pointerMove;
}
