export type SymbolsMapper = {
  AxiosInstance: symbol;

  HttpRequestAdapter: symbol;
  UserController: symbol;
  [x: string]: symbol;
};

const SYMBOLS: SymbolsMapper = {
  AxiosInstance: Symbol.for("AxiosInstance"),
  HttpRequestAdapter: Symbol.for("HttpRequestAdapter"),
  UserController: Symbol.for("UserController"),
};
export default SYMBOLS;
