import {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
} from "axios";
import {
  catchError,
  map,
  mergeMap,
  Observable,
  switchMap,
  throwError,
} from "rxjs";
import { inject, injectable } from "inversify";
import SYMBOLS from "../constants/Symbols";
import { IHttpRequestAdapter } from "repository/IHttpRequestAdapter";
import { SaveUser } from "models/SaveUserSchema";
import { UserSchema } from "models/UserSchema";
import { ITypeGeneric, IUserHttpResponse, trigger } from "repository/ITypes";
import { SearchUserRequest } from "models/SearchUserRequest";
import { UserFieldEnum } from "constants/UserFIeldEnum";
import { ErrorMessage, MethodType } from "constants/MethodHttp";
@injectable()
export class HttpRequestAdapter implements IHttpRequestAdapter {
  private readonly _axiosInstance: AxiosInstance;

  constructor(@inject(SYMBOLS.AxiosInstance) axiosInstance: AxiosInstance) {
    this._axiosInstance = axiosInstance;
  }

  public saveUsers(request: SaveUser): Observable<IUserHttpResponse> {
    return trigger.pipe(
      mergeMap(() =>
        this.post<IUserHttpResponse>(`${process.env.PLACE_HOLDER_API}`, <
          UserSchema
        >{
          ...request,
          company: {
            ...request.company,
            ws: `[CHAOS] ${request.company.ws}`,
          },
        })
      )
    );
  }

  public queryUsers(request: SearchUserRequest): Observable<IUserHttpResponse> {
    return trigger.pipe(
      mergeMap(() => {
        const firstValidKey = Object.keys(UserFieldEnum).find(
          (field) => request[field as keyof typeof UserFieldEnum] != null
        ) as keyof typeof UserFieldEnum | undefined;

        const queryString = firstValidKey
          ? `${encodeURIComponent(UserFieldEnum[firstValidKey])}=${encodeURIComponent(request[firstValidKey]!)}`
          : "";

        return this.get<IUserHttpResponse>(
          `${process.env.PLACE_HOLDER_API}?${queryString}`
        );
      })
    );
  }

  private get<T = ITypeGeneric>(url: string): Observable<T> {
    return this._request<T>({
      url,
      method: MethodType.GET,
    });
  }

  private post<T = ITypeGeneric>(
    url: string,
    body: ITypeGeneric
  ): Observable<T> {
    return this._request<T>({
      url,
      data: body,
      method: MethodType.POST,
    });
  }

  private _request<T = ITypeGeneric>(
    axiosRequestConfig: AxiosRequestConfig
  ): Observable<T> {
    return trigger.pipe(
      switchMap(async () => {
        return this._axiosInstance.request<T>(axiosRequestConfig);
      }),
      catchError((error: AxiosError) =>
        throwError(
          () =>
            new Error(
              `[${error.status}] ${ErrorMessage.MESSAGE}: ${axiosRequestConfig.method} : ${axiosRequestConfig.url}`
            )
        )
      ),
      map((response: AxiosResponse) => {
        return <T>response.data;
      })
    );
  }
}
