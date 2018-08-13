/// <reference types="node" />
import { EventEmitter } from 'events';
import { FeatureInterface } from './feature';
import { CustomHeaders } from './unleash';
export interface StorageImpl {
    new (Storage: any): any;
}
export interface RepositoryOptions {
    backupPath: string;
    url: string;
    appName: string;
    instanceId: string;
    refreshInterval?: number;
    StorageImpl?: StorageImpl;
    headers?: CustomHeaders;
}
export default class Repository extends EventEmitter implements EventEmitter {
    private timer;
    private url;
    private storage;
    private etag;
    private appName;
    private instanceId;
    private refreshInterval?;
    private headers?;
    constructor({
        backupPath,
        url,
        appName,
        instanceId,
        refreshInterval,
        StorageImpl,
        headers,
    }: RepositoryOptions);
    timedFetch(): void;
    validateFeature(feature: FeatureInterface): void;
    fetch(): void;
    stop(): void;
    getToggle(name: string): FeatureInterface;
    getToggles(): FeatureInterface[];
}
