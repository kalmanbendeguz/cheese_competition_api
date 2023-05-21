module.exports = async function (req, res, next) {
    try {
        console.log('mw:remove_dependent(product/many/del/mw/remove_dependent)')
        // dependencies are: entry_fee_payment and rating.
        // BUT WE DONT WANT TO REMOVE ANY ENTRY FEE PAYMENTS,
        // SO ONLY RATING !!!
        // since we want recursive removal of dependencies, we should
        // call the remove endpoints of the dependencies
        //try {
        const axios = require('axios')
        //const response = await axios.delete('https://jsonplaceholder.typicode.com/todos/1');
        //console.log(`/api/a/rating/m?product_id=${res.locals.product._id}`)
        const delete_request_promises = res.locals.products.map(product => axios({
            url: '/api/a/rating/m',
            method: 'delete',
            baseURL: process.env.SERVER_URL,
            params: {
                product_id: product._id
            }
        }))

        await Promise.all(delete_request_promises)

        //url ?: string;
        //method ?: Method | string;
        //baseURL ?: string;
        //transformRequest ?: AxiosRequestTransformer | AxiosRequestTransformer[];
        //transformResponse ?: AxiosResponseTransformer | AxiosResponseTransformer[];
        //headers ?: (RawAxiosRequestHeaders & MethodsHeaders) | AxiosHeaders;
        //params ?: any;
        //paramsSerializer ?: ParamsSerializerOptions | CustomParamsSerializer;
        //data ?: D;
        //timeout ?: Milliseconds;
        //timeoutErrorMessage ?: string;
        //withCredentials ?: boolean;
        //adapter ?: AxiosAdapterConfig | AxiosAdapterConfig[];
        //auth ?: AxiosBasicCredentials;
        //responseType ?: ResponseType;
        //responseEncoding ?: responseEncoding | string;
        //xsrfCookieName ?: string;
        //xsrfHeaderName ?: string;
        //onUploadProgress ?: (progressEvent: AxiosProgressEvent) => void;
        //onDownloadProgress ?: (progressEvent: AxiosProgressEvent) => void;
        //maxContentLength ?: number;
        //validateStatus ?: ((status: number) => boolean) | null;
        //maxBodyLength ?: number;
        //maxRedirects ?: number;
        //maxRate ?: number | [MaxUploadRate, MaxDownloadRate];
        //beforeRedirect ?: (options: Record<string, any>, responseDetails: { headers: Record<string, string> }) => void;
        //socketPath ?: string | null;
        //transport ?: any;
        //httpAgent ?: any;
        //httpsAgent ?: any;
        //proxy ?: AxiosProxyConfig | false;
        //cancelToken ?: CancelToken;
        //decompress ?: boolean;
        //transitional ?: TransitionalOptions;
        //signal ?: GenericAbortSignal;
        //insecureHTTPParser ?: boolean;
        //env ?: {
        //    FormData?: new (...args: any[]) => object;
        //};
        //formSerializer ?: FormSerializerOptions;
        //family ?: 4 | 6 | undefined;
        //lookup ?: ((hostname: string, options: object, cb: (err: Error | null, address: string, family: number) => void) => void) |
        //    ((hostname: string, options: object) => Promise < [address: string, family: number] | string >);

        //console.log(response)
        //console.log('ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff')

        //console.log(response.data) // EZT KELL KIÍRATNI !!!!!!!!!!

        //} catch (err) {
        //    console.log(err)
        //}

        // fontos a /m !!! (/many endpoint!)
        //.delete(`URI/api/a/rating/m?product_id=${res.locals.product._id}`)

        return next()
    } catch (err) {
        return next(err)
    }
}
