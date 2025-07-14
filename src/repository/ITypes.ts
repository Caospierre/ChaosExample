import { Observable, of } from "rxjs";

export type ITypeGeneric = any;
export const trigger: Observable<number> = of(1);
import { AxiosInstance } from "axios";
import { UserSchema } from "models/UserSchema";
export type IAxiosInstance = AxiosInstance;

export type IUserHttpResponse = UserSchema | UserSchema[];
