import { Context } from '../context';
export declare class Strategy {
    name: string;
    private returnValue;
    constructor(name: string, returnValue?: boolean);
    isEnabled(parameters: any, context: Context): boolean;
}
export interface StrategyTransportInterface {
    name: string;
    parameters: any;
}
