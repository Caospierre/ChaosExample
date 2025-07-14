// test/UserService.spec.ts
import { describe, it } from "mocha";
import { expect } from "chai";
import { createSandbox, SinonSandbox } from "sinon";
import { of } from "rxjs";
import { IMockerType } from "../mocks/MockerType";
import { IHttpRequestAdapter } from "../../src/repository/IHttpRequestAdapter";
import { UsersMockPlaceHolder } from "../mocks/UsersMockPlaceHolder";
import CONTAINER from "../../src/architecture/Architecture";
import SYMBOLS from "../../src/constants/Symbols";
import { SearchUserRequest } from "../../src/models/SearchUserRequest";
import { IUserController } from "../../src/repository/IUserController";
import { UserSchema } from "../../src/models/UserSchema";
import { SaveUser } from "../../src/models/SaveUserSchema";
import { IUserHttpResponse } from "../../src/repository/ITypes";

describe("UserController", () => {
  let sb: SinonSandbox;

  let adapter: IMockerType<IHttpRequestAdapter>;

  function mockHttpRequest() {
    adapter = {
      queryUsers: sb.stub().returns(of([UsersMockPlaceHolder])),
      saveUsers: sb.stub().returns(of([{ ...UsersMockPlaceHolder, id: "1" }])),
    };

    CONTAINER.unbind(SYMBOLS.HttpRequestAdapter);
    CONTAINER.bind<IHttpRequestAdapter>(
      SYMBOLS.HttpRequestAdapter
    ).toConstantValue(<IHttpRequestAdapter>adapter);
  }

  describe("getUser", () => {
    let searchUserRequest: SearchUserRequest = {};

    beforeEach(() => {
      sb = createSandbox();

      CONTAINER.snapshot();
    });

    afterEach(() => {
      CONTAINER.restore();
      sb.restore();
    });

    it("should get a user when search param is  name", () => {
      searchUserRequest.name = "Jean";
      mockHttpRequest();
      const controller: IUserController = CONTAINER.get<IUserController>(
        SYMBOLS.UserController
      );
      controller.getUser(searchUserRequest).subscribe({
        next: (res: IUserHttpResponse) => {
          expect(adapter.saveUsers.onCall(1));
          expect(res).to.be.not.empty;
        },
      });
    });
  });

  describe("saveUser", () => {
    let request: SaveUser = UsersMockPlaceHolder;

    beforeEach(() => {
      sb = createSandbox();

      CONTAINER.snapshot();
    });

    afterEach(() => {
      CONTAINER.restore();
      sb.restore();
    });

    it("should save when receive new user", () => {
      mockHttpRequest();
      const controller: IUserController = CONTAINER.get<IUserController>(
        SYMBOLS.UserController
      );
      controller.saveUser(request).subscribe({
        next: (res: IUserHttpResponse) => {
          expect(adapter.saveUsers.onCall(1));
          expect(res).to.be.not.empty;
          expect(res[0].id).to.be.equal("1");
        },
      });
    });
  });
});
