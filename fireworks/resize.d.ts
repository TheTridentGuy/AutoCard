import type { Fireworks } from './index.js';
export declare class Resize {
    private readonly fireworks;
    constructor(fireworks: Fireworks);
    subscribe(): void;
    unsubscribe(): void;
    private handleResize;
}
