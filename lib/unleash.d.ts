/// <reference types="node" />
import { Strategy } from './strategy/index';
export { Strategy } from './strategy/index';
import { EventEmitter } from 'events';
import { FeatureInterface } from './feature';
export interface CustomHeaders {
    [key: string]: string;
}
export interface UnleashConfig {
    appName: string;
    instanceId?: string;
    url: string;
    refreshInterval?: number;
    metricsInterval?: number;
    disableMetrics?: boolean;
    backupPath?: string;
    strategies?: Strategy[];
    customHeaders?: CustomHeaders;
}
export declare class Unleash extends EventEmitter {
    private repository;
    private client;
    private metrics;
    constructor({
        appName,
        instanceId,
        url,
        refreshInterval,
        metricsInterval,
        disableMetrics,
        backupPath,
        strategies,
        customHeaders,
    }: UnleashConfig);
    destroy(): void;
    isEnabled(name: string, context: any, fallbackValue?: boolean): boolean;
    getFeatureToggleDefinition(toggleName: string): FeatureInterface;
    getAllFeatureToggleDefinitions(): FeatureInterface[];
    count(toggleName: string, enabled: boolean): void;
}
