declare global {
    interface Window {
        webkitAudioContext: typeof AudioContext;
    }
}
export declare class Sound {
    private sounds;
    private audioContext;
    private onInit;
    constructor();
    private init;
    private loadSounds;
    play(): void;
}
