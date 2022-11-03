export declare class RequestAnimationFrame {
    private readonly render;
    tick: number;
    private rafId;
    private fps;
    private tolerance;
    private now;
    constructor(render: () => void);
    start(): void;
    stop(): void;
}
