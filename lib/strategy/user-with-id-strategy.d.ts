import { Strategy } from './strategy';
import { Context } from '../context';
export declare class UserWithIdStrategy extends Strategy {
    constructor();
    isEnabled(parameters: any, context: Context): any;
}
