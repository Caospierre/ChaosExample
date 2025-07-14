import {ISerializerHandler} from "repository/ISerializerHandler";

export enum MethodType {
  GET = "get",
  POST = "post",
}
export enum ErrorMessage {
  MESSAGE = "Error al realizar la siguiente operacíon ",
}
export const SERIALIZER_JSON: ISerializerHandler = {
  regex: /^application\/json$/,
  serializer: ({ body }) => JSON.stringify(body),
};