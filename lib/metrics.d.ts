/// <reference types="node" />
import { EventEmitter } from 'events';
import { Data } from './request';
import { CustomHeaders } from './unleash';
export interface MetricsOptions {
    appName: string;
    instanceId: string;
    strategies: string[];
    metricsInterval: number;
    disableMetrics?: boolean;
    bucketInterval?: number;
    url: string;
    headers?: CustomHeaders;
}
export default class Metrics extends EventEmitter {
    private bucket;
    private appName;
    private instanceId;
    private sdkVersion;
    private strategies;
    private metricsInterval;
    private disabled;
    private bucketInterval;
    private url;
    private timer;
    private started;
    private headers?;
    constructor({
        appName,
        instanceId,
        strategies,
        metricsInterval,
        disableMetrics,
        url,
        headers,
    }: MetricsOptions);
    private startTimer();
    stop(): void;
    registerInstance(): boolean;
    sendMetrics(): boolean;
    count(name: string, enabled: boolean): boolean;
    private bucketIsEmpty();
    private resetBucket();
    private closeBucket();
    private getPayload();
    getClientData(): Data;
    getMetricsData(): Data;
}
