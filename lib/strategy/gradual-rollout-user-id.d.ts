import { Strategy } from './strategy';
import { Context } from '../context';
export declare class GradualRolloutUserIdStrategy extends Strategy {
    constructor();
    isEnabled(parameters: any, context: Context): boolean;
}
