export interface ConfigApiI {
    version: string;
    port: number;
    security: { [username: string]: string };
    timeout: number;
}

export interface ConfigLogI {
    level: 'debug' | 'info' | 'warn' | 'error';
    color: boolean;
}

export interface ConfigButtonsI {
    pins: number[];
}

export interface ConfigLedI {
    pin: number;
}
