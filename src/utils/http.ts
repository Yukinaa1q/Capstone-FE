import axios from "axios";

export enum ENV {
    PROD,
    DEV,
}

interface ApiArguments {
    url: string;
    method: "GET" | "POST" | "PUT" | "DELETE";
    queryString?: Record<string, string>;
    headers?: HeadersInit;
    body?: BodyInit;
}

class StatusError extends Error {
    public statusCode: number;
    public errorBody?: any;
    constructor(status: number, message: string, info?: any) {
        super(message);
        this.statusCode = status;
        this.errorBody = info;
    }
}

/*
TucourApi: create an abstraction for fetching data from the tucour api
*/
export default class TucourApi {
    private baseUrl: string;

    constructor(env: ENV) {
        if (env === ENV.PROD) {
            this.baseUrl = "https://tucour.herokuapp.com";
        } else {
            this.baseUrl = "http://localhost:8000";
        }
    }

    urlFormatter(url: string, queryString?: Record<string, string>) {
        let formattedUrl = this.baseUrl;
        if (url[0] === "/") {
            formattedUrl = `${this.baseUrl}${url}`;
        }
        else {
            formattedUrl = `${this.baseUrl}/${url}`;
        }
        if (queryString) {
            const params = new URLSearchParams(queryString);
            formattedUrl = `${formattedUrl}?${params.toString()}`;
        }
        return formattedUrl;
    }

    async call(arg: ApiArguments) {
        const formatUrl = this.urlFormatter(arg.url, arg?.queryString);
        try {
            const res = await fetch(formatUrl, {method: arg.method, headers: arg.headers, body: arg.body});
            // Directly return the data if the status code is < 400
            if (res.ok) {
                return await res.json();
    
            }
            const error = new StatusError(res.status, res.statusText, await res.json());
            throw error;

        }
        catch (err) {
            console.log(err)
            // const error = new StatusError(err.status, res.statusText, await res.json());
            // throw error;
        }
    }



    async get(arg: Omit<ApiArguments, "method">) {
        const formatUrl = this.urlFormatter(arg.url, arg?.queryString);
        try {
            const res = await fetch(formatUrl, {
                method: "GET",
                headers: arg.headers,
            });
            // Directly return the data if the status code is < 400
            if (res.ok) {
                return await res.json()
            }

        }
        catch (err) {
            alert("Something went wrong while connecting to the server");
            console.log(err);
        }
    }

    async post(arg: ApiArguments) {
        const formatUrl = this.urlFormatter(arg.url, arg?.queryString);
        try {
            const res = await fetch(formatUrl, {
                method: "POST",
                headers: arg.headers,
                body: arg.body,
            });
            // Directly return the data if the status code is < 400
            if (res.ok) {
                return await res.json()
            }
        }
        catch (err) {
            alert("Something went wrong while connecting to the server");
            console.log(err);
        }
    }

    async put(arg: ApiArguments) {
        const formatUrl = this.urlFormatter(arg.url, arg?.queryString);
        try {
            const res = await fetch(formatUrl, {
                method: "PUT",
                headers: arg.headers,
                body: arg.body,
            });
            // Directly return the data if the status code is < 400
            if (res.ok) {
                return await res.json()
            }
        }
        catch (err) {
            alert("Something went wrong while connecting to the server");
            console.log(err);
        }
    }
}