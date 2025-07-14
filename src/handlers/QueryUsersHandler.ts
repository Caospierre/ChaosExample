import "reflect-metadata";
import { APIGatewayProxyEvent, Handler } from "aws-lambda";
import { firstValueFrom, mergeMap, of } from "rxjs";
import middy from "@middy/core";
import httpErrorHandler from "@middy/http-error-handler";
import httpResponseSerializer from "@middy/http-response-serializer";
import {ITypeGeneric, IUserHttpResponse, trigger} from "repository/ITypes";
import { SearchUserRequest } from "models/SearchUserRequest";
import CONTAINER from "architecture/Architecture";
import { UserController } from "controller/UserController";
import SYMBOLS from "constants/Symbols";
import {SERIALIZER_JSON} from "constants/MethodHttp";
import {defaultTo} from "lodash"

const LAMBDA_HANDLER = async (event) => {

    return await firstValueFrom(
    trigger.pipe(
      mergeMap(() => of(<SearchUserRequest>defaultTo(event.queryStringParameters,{}))),
      mergeMap((request: SearchUserRequest) =>CONTAINER.get<UserController>(SYMBOLS.UserController).getUser(request)
      )
    ),

  );
};

export const HANDLER: Handler<APIGatewayProxyEvent, ITypeGeneric> = middy(
  LAMBDA_HANDLER
)
  .use(httpErrorHandler())
  .use(
    httpResponseSerializer({
      defaultContentType: "application/json",
        serializers: [SERIALIZER_JSON],
    })
  );
