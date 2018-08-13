/// <reference types="request" />
import * as request from 'request';
import { CustomHeaders } from './unleash';
export interface RequestOptions {
    url: string;
    timeout?: number;
    headers?: CustomHeaders;
}
export interface GetRequestOptions extends RequestOptions {
    etag?: string;
    appName?: string;
    instanceId?: string;
}
export interface Data {
    [key: string]: any;
}
export interface PostRequestOptions extends RequestOptions {
    json: Data;
    appName?: string;
    instanceId?: string;
}
export declare const post: (
    { url, appName, timeout, instanceId, headers, json }: PostRequestOptions,
    cb: any,
) => request.Request;
export declare const get: (
    { url, etag, appName, timeout, instanceId, headers }: GetRequestOptions,
    cb: any,
) => request.Request;
