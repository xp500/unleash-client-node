import { Unleash, UnleashConfig } from './unleash';
export { Strategy } from './strategy/index';
export { Unleash } from './unleash';
export declare function initialize(options: UnleashConfig): Unleash;
export declare function isEnabled(name: string, context: any, fallbackValue?: boolean): boolean;
export declare function destroy(): any;
export declare function getFeatureToggleDefinition(toggleName: string): any;
export declare function getAllFeatureToggleDefinitions(): any;
export declare function count(toggleName: string, enabled: boolean): any;
