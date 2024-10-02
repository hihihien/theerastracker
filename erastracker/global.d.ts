// global.d.ts
declare global {
    interface Window {
        instgrm: {
            Embeds: {
                process: () => void;
            };
        };
    }
}

// This is necessary to make the above declarations work
export {};
