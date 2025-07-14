import { Observable } from "rxjs";
import { SearchUserRequest } from "models/SearchUserRequest";
import { SaveUser } from "models/SaveUserSchema";
import { IUserHttpResponse } from "repository/ITypes";

export interface IUserController {
  getUser(request: SearchUserRequest): Observable<IUserHttpResponse>;

  saveUser(request: SaveUser): Observable<IUserHttpResponse>;
}
