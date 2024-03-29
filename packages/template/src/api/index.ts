import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { getUrl } from '../util';

export interface IGetAxiosRequestConfig<P> extends AxiosRequestConfig {
    params: P;
}

export interface IResponseData<R = any> {
    code: string;
    data: R;
}

// 处理响应
const handleResponse = <R, D>(request: Promise<AxiosResponse<IResponseData<R>, D>>): Promise<R> => {
    return new Promise((resolve, reject) => {
        request.then(res => {
            const { status, data: responseData } = res;
            if (status !== 200) {
                reject(res);
            }

            const { code, data } = responseData;
            if (code !== '0') {
                reject(res);
            }

            resolve(data);
        });
    });
};

const createAxiosInstance = (base: string) => {
    const instance = axios.create({
        baseURL: base
    });

    return {
        get<R = unknown, P = unknown>(path: string, config?: IGetAxiosRequestConfig<P>) {
            return handleResponse<R, unknown>(
                instance.get<R, AxiosResponse<IResponseData<R>, unknown>>(path, config || {})
            );
        },
        post<R = unknown, D = unknown>(path: string, data: D, config?: AxiosRequestConfig<D>) {
            return handleResponse<R, D>(
                instance.post<R, AxiosResponse<IResponseData<R>, D>, D>(path, data, config || {})
            );
        }
    };
};

const baseUrl = getUrl();
export const templateRequest = createAxiosInstance(baseUrl);
