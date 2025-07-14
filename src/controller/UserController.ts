import { mergeMap, Observable } from "rxjs";
import { inject, injectable } from "inversify";
import { IUserController } from "repository/IUserController";
import { HttpRequestAdapter } from "adapter/HttpRequestAdapter";
import { SearchUserRequest } from "models/SearchUserRequest";
import SYMBOLS from "constants/Symbols";
import { IUserHttpResponse, trigger } from "repository/ITypes";
import { SaveUser } from "models/SaveUserSchema";

@injectable()
export class UserController implements IUserController {
  private readonly _httpRequester: HttpRequestAdapter;

  constructor(
    @inject(SYMBOLS.HttpRequestAdapter) httpRequester: HttpRequestAdapter
  ) {
    this._httpRequester = httpRequester;
  }

  public getUser(request: SearchUserRequest): Observable<IUserHttpResponse> {
    return trigger.pipe(
      mergeMap(() => this._httpRequester.queryUsers(request))
    );
  }

  public saveUser(request: SaveUser): Observable<IUserHttpResponse> {
    return trigger.pipe(mergeMap(() => this._httpRequester.saveUsers(request)));
  }
}
