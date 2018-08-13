/// <reference types="node" />
import { EventEmitter } from 'events';
import { Strategy, StrategyTransportInterface } from './strategy';
import Repository from './repository';
export default class UnleashClient extends EventEmitter {
    private repository;
    private strategies;
    private warned;
    constructor(repository: Repository, strategies: Strategy[]);
    private getStrategy(name);
    warnOnce(missingStrategy: string, name: string, strategies: StrategyTransportInterface[]): void;
    isEnabled(name: string, context: any, fallbackValue?: boolean): boolean;
}
