import { describe, it } from "mocha";
import { expect } from "chai";
import { createSandbox, SinonSandbox } from "sinon";
import { IMockerType } from "../mocks/MockerType";
import { UsersMockPlaceHolder } from "../mocks/UsersMockPlaceHolder";
import CONTAINER from "../../src/architecture/Architecture";
import SYMBOLS from "../../src/constants/Symbols";
import { SearchUserRequest } from "../../src/models/SearchUserRequest";
import { SaveUser } from "../../src/models/SaveUserSchema";

import { Mock } from "ts-mockery";
import { IAxiosInstance, IUserHttpResponse } from "../../src/repository/ITypes";
import { AxiosError, AxiosResponse } from "axios";
import { IHttpRequestAdapter } from "../../src/repository/IHttpRequestAdapter";
import { ErrorMessage } from "../../src/constants/MethodHttp";

describe("IHttpRequestAdapter", () => {
  let sb: SinonSandbox;

  let axios: IMockerType<IAxiosInstance>;

  function mockAxios(isError?: boolean) {
    axios = Mock.of<IMockerType<IAxiosInstance>>({
      request: isError
        ? sb.stub().rejects(new AxiosError("Error PlaceHolder", "500"))
        : sb.stub().returns(
            Mock.of<AxiosResponse>({
              data: [{ ...UsersMockPlaceHolder, id: "1" }],
              status: 200,
            })
          ),
    });
    CONTAINER.unbind(SYMBOLS.AxiosInstance);
    CONTAINER.bind<IAxiosInstance>(SYMBOLS.AxiosInstance).toConstantValue(
      Mock.of<IAxiosInstance>({
        request: axios.request,
      })
    );
  }

  beforeEach(() => {
    process.env.PLACE_HOLDER_API = "https://jsonplaceholder.typicode.com/users";
  });

  describe("queryUsers", () => {
    let searchUserRequest: SearchUserRequest = {};

    beforeEach(() => {
      sb = createSandbox();
      CONTAINER.snapshot();
    });

    afterEach(() => {
      CONTAINER.restore();
      sb.restore();
    });

    it("should get a users when dont receive params", (done) => {
      searchUserRequest.name = undefined;
      mockAxios();
      const adapter: IHttpRequestAdapter = CONTAINER.get<IHttpRequestAdapter>(
        SYMBOLS.HttpRequestAdapter
      );
      adapter.queryUsers(searchUserRequest).subscribe({
        next: (res: IUserHttpResponse) => {
          expect(axios.request.onCall(1));
          expect(res).to.be.not.empty;
          done();
        },
      });
    });

    it("should get a user when search param is name", (done) => {
      searchUserRequest.name = "Jean";
      mockAxios();
      const adapter: IHttpRequestAdapter = CONTAINER.get<IHttpRequestAdapter>(
        SYMBOLS.HttpRequestAdapter
      );
      adapter.queryUsers(searchUserRequest).subscribe({
        next: (res: IUserHttpResponse) => {
          expect(axios.request.onCall(1));
          expect(res).to.be.not.empty;
          done();
        },
      });
    });

    it("should get a user when search param is city", (done) => {
      searchUserRequest.name = "Quito";
      mockAxios();
      const adapter: IHttpRequestAdapter = CONTAINER.get<IHttpRequestAdapter>(
        SYMBOLS.HttpRequestAdapter
      );
      adapter.queryUsers(searchUserRequest).subscribe({
        next: (res: IUserHttpResponse) => {
          expect(axios.request.onCall(1));
          expect(res).to.be.not.empty;
          done();
        },
      });
    });

    it("should get a user when search param is company", (done) => {
      searchUserRequest.company = "google";
      mockAxios();
      const adapter: IHttpRequestAdapter = CONTAINER.get<IHttpRequestAdapter>(
        SYMBOLS.HttpRequestAdapter
      );
      adapter.queryUsers(searchUserRequest).subscribe({
        next: (res: IUserHttpResponse) => {
          expect(axios.request.onCall(1));
          expect(res).to.be.not.empty;
          done();
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

    it("should save when receive new user", (done) => {
      mockAxios();
      const adapter: IHttpRequestAdapter = CONTAINER.get<IHttpRequestAdapter>(
        SYMBOLS.HttpRequestAdapter
      );
      adapter.saveUsers(request).subscribe({
        next: (res: IUserHttpResponse) => {
          expect(axios.request.onCall(1));
          expect(res).to.be.not.empty;
          expect(res[0].id).to.be.equal("1");
          done();
        },
      });
    });

    it("should throw error when place holder api fail ", (done) => {
      mockAxios(true);
      const adapter: IHttpRequestAdapter = CONTAINER.get<IHttpRequestAdapter>(
        SYMBOLS.HttpRequestAdapter
      );
      adapter.saveUsers(request).subscribe({
        error: (err: Error) => {
          expect(axios.request.onCall(1));
          expect(err.message).to.be.contains(ErrorMessage.MESSAGE);
          done();
        },
      });
    });
  });
});
