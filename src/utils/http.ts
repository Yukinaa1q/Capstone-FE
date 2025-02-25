import { isJSON } from "./utils";

export enum ENV {
  PROD,
  DEV,
}

interface ApiArguments {
  method: "GET" | "POST" | "PUT" | "DELETE";
  queryString?: Record<string, string>;
  headers?: HeadersInit;
  body?: BodyInit;
}

export class StatusError extends Error {
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
  private static productEnv: ENV = ENV.DEV;
  private static baseUrl: string = TucourApi.productEnv === ENV.PROD ? "https://tucour.herokuapp.com" : "http://localhost:8000";

  private static urlFormatter(url: string, queryString?: Record<string, string>) {
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

  public static async call(url: string, arg: ApiArguments) {
    const formatUrl = this.urlFormatter(url, arg?.queryString);
    try {
      const res = await fetch(formatUrl, {
        method: arg.method,
        headers: arg.headers,
        body: arg.body,
      });
      // Directly return the data if the status code is < 400
      if (res.ok) {
        try {
          let returnResult = await res.text();
          return isJSON(returnResult) ? JSON.parse(returnResult) : returnResult;
        } catch {
          throw new Error("Cannot convert to json or text");
        }
      }
      const error = new StatusError(
        res.status,
        res.statusText,
        await res.json()
      );
      throw error;
    } catch (err) {
      throw err;
    }
  }
}
