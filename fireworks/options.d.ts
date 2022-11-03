import type { FireworksOptions, IBoundaries, IMouse, ISounds, LineStyle, LineWidth, MinMax } from './types.js';
declare class Options implements FireworksOptions {
    hue: MinMax;
    rocketsPoint: MinMax;
    opacity: number;
    acceleration: number;
    friction: number;
    gravity: number;
    particles: number;
    explosion: number;
    mouse: IMouse;
    boundaries: IBoundaries;
    sound: ISounds;
    delay: MinMax;
    brightness: MinMax;
    decay: MinMax;
    flickering: number;
    intensity: number;
    traceLength: number;
    traceSpeed: number;
    lineWidth: LineWidth;
    lineStyle: LineStyle;
    autoresize: boolean;
    constructor();
    updateOptions<T extends FireworksOptions>(options: T): void;
}
declare const opts: Options;
export { opts };
