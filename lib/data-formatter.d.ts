import { FeatureInterface } from './feature';
export interface FeaturesBase {
    features: FeatureInterface[];
}
export interface Features extends FeaturesBase {
    version: number;
    features: FeatureInterface[];
}
export declare function toNewFormat(data: any): Features;
export declare function pickData(serverData: any): FeaturesBase;
