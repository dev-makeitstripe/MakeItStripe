/* eslint-disable */
/* tslint:disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export interface Address {
  /** @format int32 */
  addressID?: number;
  addressType?: AddressType;
  address1?: string | null;
  address2?: string | null;
  city?: string | null;
  state?: string | null;
  zipcode?: string | null;
  /** @format int32 */
  customerID?: number;
}

/** @format int32 */
export enum AddressType {
  Value0 = 0,
  Value1 = 1,
  Value2 = 2,
}

export interface BooleanMakeItStripeResult {
  result?: boolean;
  errorMessage?: string | null;
  stackTrace?: string | null;
}

export interface CapturedEmail {
  /** @format int32 */
  capturedID?: number;
  toAddress: string | null;
  fromAddress: string | null;
  body: string | null;
  hasError: boolean;
  /** @format date-time */
  date?: string;
  errorMessage: string | null;
  stackTrace: string | null;
}

export interface CapturedEmailIEnumerableMakeItStripeResult {
  result?: CapturedEmail[] | null;
  errorMessage?: string | null;
  stackTrace?: string | null;
}

export interface ContactFormEntities {
  customerTitles: CustomerTitle[] | null;
  services: Service[] | null;
  referalTypes: ReferalType[] | null;
}

export interface ContactFormEntitiesMakeItStripeResult {
  result?: ContactFormEntities;
  errorMessage?: string | null;
  stackTrace?: string | null;
}

export interface Customer {
  /** @format int32 */
  customerID?: number;
  /** @format uuid */
  customerGuid?: string;
  middleInitial?: string | null;
  firstName?: string | null;
  lastName?: string | null;
  email?: string | null;
  phoneNumber?: string | null;
  /** @format int32 */
  titleID?: number | null;
  /** @format date-time */
  creationDate?: string;
  title?: CustomerTitle;
  address?: Address[] | null;
  services?: CustomerToService[] | null;
  descriptionOfNeeds: string | null;
  referalType?: ReferalType;
  /** @format int32 */
  referalTypeID: number;
}

export interface CustomerTitle {
  /** @format int32 */
  titleID?: number;
  title?: string | null;
  active?: boolean;
}

export interface CustomerTitleIEnumerableMakeItStripeResult {
  result?: CustomerTitle[] | null;
  errorMessage?: string | null;
  stackTrace?: string | null;
}

export interface CustomerToService {
  /** @format int32 */
  customerServiceID?: number;
  /** @format int32 */
  customerID?: number;
  /** @format int32 */
  serviceID?: number;
  service?: Service;
}

export interface ReferalType {
  /** @format int32 */
  referalID?: number;
  referalName: string | null;
  active?: boolean;
}

export interface ReferalTypeIEnumerableMakeItStripeResult {
  result?: ReferalType[] | null;
  errorMessage?: string | null;
  stackTrace?: string | null;
}

export interface Service {
  /** @format int32 */
  serviceID?: number;
  serviceName?: string | null;
}

export interface Testimony {
  /** @format int32 */
  testimonialID?: number;
  /** @format int32 */
  rating: number;
  testimonialMessage: string | null;
  /** @format date-time */
  testimonialDate?: string;
  name: string | null;
  testimonySource: string | null;
}

export interface TestimonyIEnumerableMakeItStripeResult {
  result?: Testimony[] | null;
  errorMessage?: string | null;
  stackTrace?: string | null;
}

export interface TestimonyMakeItStripeResult {
  result?: Testimony;
  errorMessage?: string | null;
  stackTrace?: string | null;
}

export type QueryParamsType = Record<string | number, any>;
export type ResponseFormat = keyof Omit<Body, "body" | "bodyUsed">;

export interface FullRequestParams extends Omit<RequestInit, "body"> {
  /** set parameter to `true` for call `securityWorker` for this request */
  secure?: boolean;
  /** request path */
  path: string;
  /** content type of request body */
  type?: ContentType;
  /** query params */
  query?: QueryParamsType;
  /** format of response (i.e. response.json() -> format: "json") */
  format?: ResponseFormat;
  /** request body */
  body?: unknown;
  /** base url */
  baseUrl?: string;
  /** request cancellation token */
  cancelToken?: CancelToken;
}

export type RequestParams = Omit<FullRequestParams, "body" | "method" | "query" | "path">;

export interface ApiConfig<SecurityDataType = unknown> {
  baseUrl?: string;
  baseApiParams?: Omit<RequestParams, "baseUrl" | "cancelToken" | "signal">;
  securityWorker?: (securityData: SecurityDataType | null) => Promise<RequestParams | void> | RequestParams | void;
  customFetch?: typeof fetch;
}

export interface HttpResponse<D extends unknown, E extends unknown = unknown> extends Response {
  data: D;
  error: E;
}

type CancelToken = Symbol | string | number;

export enum ContentType {
  Json = "application/json",
  FormData = "multipart/form-data",
  UrlEncoded = "application/x-www-form-urlencoded",
  Text = "text/plain",
}

export class HttpClient<SecurityDataType = unknown> {
  public baseUrl: string = "";
  private securityData: SecurityDataType | null = null;
  private securityWorker?: ApiConfig<SecurityDataType>["securityWorker"];
  private abortControllers = new Map<CancelToken, AbortController>();
  private customFetch = (...fetchParams: Parameters<typeof fetch>) => fetch(...fetchParams);

  private baseApiParams: RequestParams = {
    credentials: "same-origin",
    headers: {},
    redirect: "follow",
    referrerPolicy: "no-referrer",
  };

  constructor(apiConfig: ApiConfig<SecurityDataType> = {}) {
    Object.assign(this, apiConfig);
  }

  public setSecurityData = (data: SecurityDataType | null) => {
    this.securityData = data;
  };

  protected encodeQueryParam(key: string, value: any) {
    const encodedKey = encodeURIComponent(key);
    return `${encodedKey}=${encodeURIComponent(typeof value === "number" ? value : `${value}`)}`;
  }

  protected addQueryParam(query: QueryParamsType, key: string) {
    return this.encodeQueryParam(key, query[key]);
  }

  protected addArrayQueryParam(query: QueryParamsType, key: string) {
    const value = query[key];
    return value.map((v: any) => this.encodeQueryParam(key, v)).join("&");
  }

  protected toQueryString(rawQuery?: QueryParamsType): string {
    const query = rawQuery || {};
    const keys = Object.keys(query).filter((key) => "undefined" !== typeof query[key]);
    return keys
      .map((key) => (Array.isArray(query[key]) ? this.addArrayQueryParam(query, key) : this.addQueryParam(query, key)))
      .join("&");
  }

  protected addQueryParams(rawQuery?: QueryParamsType): string {
    const queryString = this.toQueryString(rawQuery);
    return queryString ? `?${queryString}` : "";
  }

  private contentFormatters: Record<ContentType, (input: any) => any> = {
    [ContentType.Json]: (input: any) =>
      input !== null && (typeof input === "object" || typeof input === "string") ? JSON.stringify(input) : input,
    [ContentType.Text]: (input: any) => (input !== null && typeof input !== "string" ? JSON.stringify(input) : input),
    [ContentType.FormData]: (input: any) =>
      Object.keys(input || {}).reduce((formData, key) => {
        const property = input[key];
        formData.append(
          key,
          property instanceof Blob
            ? property
            : typeof property === "object" && property !== null
              ? JSON.stringify(property)
              : `${property}`,
        );
        return formData;
      }, new FormData()),
    [ContentType.UrlEncoded]: (input: any) => this.toQueryString(input),
  };

  protected mergeRequestParams(params1: RequestParams, params2?: RequestParams): RequestParams {
    return {
      ...this.baseApiParams,
      ...params1,
      ...(params2 || {}),
      headers: {
        ...(this.baseApiParams.headers || {}),
        ...(params1.headers || {}),
        ...((params2 && params2.headers) || {}),
      },
    };
  }

  protected createAbortSignal = (cancelToken: CancelToken): AbortSignal | undefined => {
    if (this.abortControllers.has(cancelToken)) {
      const abortController = this.abortControllers.get(cancelToken);
      if (abortController) {
        return abortController.signal;
      }
      return void 0;
    }

    const abortController = new AbortController();
    this.abortControllers.set(cancelToken, abortController);
    return abortController.signal;
  };

  public abortRequest = (cancelToken: CancelToken) => {
    const abortController = this.abortControllers.get(cancelToken);

    if (abortController) {
      abortController.abort();
      this.abortControllers.delete(cancelToken);
    }
  };

  public request = async <T = any, E = any>({
    body,
    secure,
    path,
    type,
    query,
    format,
    baseUrl,
    cancelToken,
    ...params
  }: FullRequestParams): Promise<HttpResponse<T, E>> => {
    const secureParams =
      ((typeof secure === "boolean" ? secure : this.baseApiParams.secure) &&
        this.securityWorker &&
        (await this.securityWorker(this.securityData))) ||
      {};
    const requestParams = this.mergeRequestParams(params, secureParams);
    const queryString = query && this.toQueryString(query);
    const payloadFormatter = this.contentFormatters[type || ContentType.Json];
    const responseFormat = format || requestParams.format;

    return this.customFetch(`${baseUrl || this.baseUrl || ""}${path}${queryString ? `?${queryString}` : ""}`, {
      ...requestParams,
      headers: {
        ...(requestParams.headers || {}),
        ...(type && type !== ContentType.FormData ? { "Content-Type": type } : {}),
      },
      signal: (cancelToken ? this.createAbortSignal(cancelToken) : requestParams.signal) || null,
      body: typeof body === "undefined" || body === null ? null : payloadFormatter(body),
    }).then(async (response) => {
      const r = response.clone() as HttpResponse<T, E>;
      r.data = null as unknown as T;
      r.error = null as unknown as E;

      const data = !responseFormat
        ? r
        : await response[responseFormat]()
            .then((data) => {
              if (r.ok) {
                r.data = data;
              } else {
                r.error = data;
              }
              return r;
            })
            .catch((e) => {
              r.error = e;
              return r;
            });

      if (cancelToken) {
        this.abortControllers.delete(cancelToken);
      }

      if (!response.ok) throw data;
      return data;
    });
  };
}

/**
 * @title MakeItStripe
 * @version 1.0
 */
export class Api<SecurityDataType extends unknown> extends HttpClient<SecurityDataType> {
  api = {
    /**
     * No description
     *
     * @tags CapturedEmail
     * @name GetCapturedEmails
     * @request GET:/api/CapturedEmail
     */
    getCapturedEmails: (params: RequestParams = {}) =>
      this.request<CapturedEmailIEnumerableMakeItStripeResult, any>({
        path: `/api/CapturedEmail`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Contact
     * @name AddContact
     * @request POST:/api/Contact
     */
    addContact: (data: Customer, params: RequestParams = {}) =>
      this.request<BooleanMakeItStripeResult, any>({
        path: `/api/Contact`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Contact
     * @name ContactGetContactFormEntitiesList
     * @request GET:/api/Contact/GetContactFormEntities
     */
    contactGetContactFormEntitiesList: (params: RequestParams = {}) =>
      this.request<ContactFormEntitiesMakeItStripeResult, any>({
        path: `/api/Contact/GetContactFormEntities`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags ReferalType
     * @name GetReferalTypes
     * @request GET:/api/ReferalType
     */
    getReferalTypes: (params: RequestParams = {}) =>
      this.request<ReferalTypeIEnumerableMakeItStripeResult, any>({
        path: `/api/ReferalType`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Testimony
     * @name GetTestimonies
     * @request GET:/api/Testimony
     */
    getTestimonies: (params: RequestParams = {}) =>
      this.request<TestimonyIEnumerableMakeItStripeResult, any>({
        path: `/api/Testimony`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Testimony
     * @name AddTestimony
     * @request POST:/api/Testimony
     */
    addTestimony: (data: Testimony, params: RequestParams = {}) =>
      this.request<TestimonyMakeItStripeResult, any>({
        path: `/api/Testimony`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Title
     * @name GetTitles
     * @request GET:/api/Title
     */
    getTitles: (params: RequestParams = {}) =>
      this.request<CustomerTitleIEnumerableMakeItStripeResult, any>({
        path: `/api/Title`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Zipcode
     * @name Inquire
     * @request GET:/api/Zipcode
     */
    inquire: (
      query?: {
        /** @format int32 */
        zip?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<BooleanMakeItStripeResult, any>({
        path: `/api/Zipcode`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),
  };
}
