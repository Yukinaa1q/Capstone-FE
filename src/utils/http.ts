import { isJSON } from "./utils";

export enum ENV {
  PROD,
  DEV,
}

export type JsonType =
  | string
  | number
  | boolean
  | JsonType[]
  | object;

interface ApiArguments {
  method: "GET" | "POST" | "PUT" | "DELETE";
  queryString?: Record<string, string>;
  headers?: HeadersInit;
  body?: BodyInit;
}

export class StatusError extends Error {
  public statusCode: number;
  public errorBody?: JsonType;
  constructor(status: number, message: string, info?: JsonType) {
    super(message);
    this.statusCode = status;
    this.errorBody = info;
  }
}

/*
TucourApi: create an abstraction for fetching data from the tucour api
*/
export default class TucourApi {
  private static productEnv: ENV = ENV.DEV;
  private static baseUrl: string =
    TucourApi.productEnv === ENV.PROD
      ? "https://tucour.herokuapp.com"
      : "http://localhost:8000";

  private static urlFormatter(
    url: string,
    queryString?: Record<string, string>
  ) {
    let formattedUrl = TucourApi.baseUrl;
    if (url[0] === "/") {
      formattedUrl = `${TucourApi.baseUrl}${url}`;
    } else {
      formattedUrl = `${TucourApi.baseUrl}/${url}`;
    }
    if (queryString) {
      const params = new URLSearchParams(queryString);
      formattedUrl = `${formattedUrl}?${params.toString()}`;
    }
    return formattedUrl;
  }

  public static addBearerToken(arg: ApiArguments) {
    return {
      ...arg,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        ...arg.headers,
      },
    };
  }

  public static async call(url: string, arg: ApiArguments): Promise<JsonType> {
    const formatUrl = this.urlFormatter(url, arg?.queryString);
    const res = await fetch(formatUrl, {
      method: arg.method,
      headers: arg.headers,
      body: arg.body,
    });
    // Directly return the data if the status code is < 400
    if (res.ok) {
      try {
        const returnResult = await res.text();
        return isJSON(returnResult) ? JSON.parse(returnResult) : returnResult;
      } catch {
        throw new Error("Cannot convert to json or text");
      }
    }
    const error = new StatusError(res.status, res.statusText, await res.json());
    throw error;
  }

  public static async get(url: string, arg: ApiArguments): Promise<JsonType> {
    const authenHeaders: ApiArguments = this.addBearerToken(arg);
    return await this.call(url, { ...authenHeaders, method: "GET" });
  }

  public static async post(url: string, arg: ApiArguments): Promise<JsonType> {
    const authenHeaders: ApiArguments = this.addBearerToken(arg);
    return await this.call(url, { ...authenHeaders, method: "POST" });
  }

  public static async put(url: string, arg: ApiArguments): Promise<JsonType> {
    const authenHeaders: ApiArguments = this.addBearerToken(arg);
    return await this.call(url, { ...authenHeaders, method: "PUT" });
  }

  public static async delete(
    url: string,
    arg: ApiArguments
  ): Promise<JsonType> {
    const authenHeaders: ApiArguments = this.addBearerToken(arg);
    return await this.call(url, { ...authenHeaders, method: "DELETE" });
  }
}
