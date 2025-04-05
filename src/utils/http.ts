import { isJSON, jwtDecoder } from "./utils";

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
  public errorBody?: JsonType;
  constructor(status: number, message: string, info?: JsonType) {
    super(message);
    this.statusCode = status;
    this.errorBody = info;
  }
}

export type JsonType =
  | StatusResponse
  | PrimitiveType[]
  | PrimitiveType;

type PrimitiveType = string | number | boolean | object | null;
// string | number | boolean | JsonType[] | object;

export interface StatusResponse {
  statusCode: number;
  statusText: string;
  data: JsonType;
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

  public static addBearerToken(arg: ApiArguments): ApiArguments {
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
    try {
      const res = await fetch(formatUrl, {
        method: arg.method,
        headers: arg.headers,
        body: arg.body,
      });

      // const returnResult = await res.text();
      // return isJSON(returnResult) ? JSON.parse(returnResult) : returnResult;
      if (res.ok) {
        const returnResult = await res.text();
        return isJSON(returnResult) ? JSON.parse(returnResult) : returnResult;
      } else {
        console.log(
          "Server Connection Successfully But Status >= 300............"
        );
        throw await res.json();
      }
    } catch (err) {
      if (err instanceof TypeError)
        throw {
          statusCode: 555,
          statusText: "Error Not Because of Server",
          data: (err as Error).message,
        };
      else {
        const statusError = err as { statusCode: number; message: string };
        if (statusError.statusCode === 401) {
          const token = jwtDecoder(localStorage.getItem("token") || "");
          console.log(token);
          localStorage.removeItem("token");
          if (token.payload.payload.role === "student" || token.payload.payload.role === "tutor")
            window.location.replace("/login");
          else 
            window.location.replace("/staff/login");
        }
        throw err;
      }
    }
  }

  public static async get(
    url: string,
    arg?: Omit<ApiArguments, "method">
  ): Promise<JsonType> {
    const authenHeaders: ApiArguments = this.addBearerToken({
      method: "GET",
      ...arg,
    });
    return this.call(url, { ...authenHeaders });
  }

  public static async post(
    url: string,
    arg?: Omit<ApiArguments, "method">
  ): Promise<JsonType> {
    const authenHeaders: ApiArguments = this.addBearerToken({
      method: "POST",
      ...arg,
    });
    return this.call(url, { ...authenHeaders, method: "POST" });
  }

  public static async put(
    url: string,
    arg?: Omit<ApiArguments, "method">
  ): Promise<JsonType> {
    const authenHeaders: ApiArguments = this.addBearerToken({
      method: "PUT",
      ...arg,
    });
    return this.call(url, { ...authenHeaders, method: "PUT" });
  }

  public static async delete(
    url: string,
    arg?: Omit<ApiArguments, "method">
  ): Promise<JsonType> {
    const authenHeaders: ApiArguments = this.addBearerToken({
      method: "DELETE",
      ...arg,
    });
    return this.call(url, { ...authenHeaders, method: "DELETE" });
  }
}
