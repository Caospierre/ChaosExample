import { Container } from "inversify";
import SYMBOLS from "../constants/Symbols";
import axios from "axios";
import { IUserController } from "repository/IUserController";
import { UserController } from "controller/UserController";
import { IHttpRequestAdapter } from "repository/IHttpRequestAdapter";
import { HttpRequestAdapter } from "adapter/HttpRequestAdapter";
import { IAxiosInstance } from "repository/ITypes";

const AXIOS_INSTANCE: IAxiosInstance = axios.create();

const CONTAINER: Container = new Container();

CONTAINER.bind<IAxiosInstance>(SYMBOLS.AxiosInstance).toConstantValue(
  AXIOS_INSTANCE
);

CONTAINER.bind<IUserController>(SYMBOLS.UserController).to(UserController);
CONTAINER.bind<IHttpRequestAdapter>(SYMBOLS.HttpRequestAdapter).to(
  HttpRequestAdapter
);

export default CONTAINER;
