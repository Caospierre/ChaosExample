import { Observable } from "rxjs";
import { SearchUserRequest } from "models/SearchUserRequest";
import { UserSchema } from "models/UserSchema";
import { IUserHttpResponse } from "repository/ITypes";

export interface IHttpRequestAdapter {
  queryUsers(request: SearchUserRequest): Observable<IUserHttpResponse>;

  saveUsers(request: UserSchema): Observable<IUserHttpResponse>;
}
