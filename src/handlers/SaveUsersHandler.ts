import "reflect-metadata";
import { APIGatewayProxyEvent, Handler } from "aws-lambda";
import { firstValueFrom, mergeMap, of } from "rxjs";
import middy from "@middy/core";
import httpErrorHandler from "@middy/http-error-handler";
import httpResponseSerializer from "@middy/http-response-serializer";
import httpJsonBodyParser from "@middy/http-json-body-parser";
import { SaveUser } from "models/SaveUserSchema";
import { UserController } from "controller/UserController";
import CONTAINER from "architecture/Architecture";
import SYMBOLS from "constants/Symbols";
import {ITypeGeneric, IUserHttpResponse, trigger} from "repository/ITypes";
import {SERIALIZER_JSON} from "constants/MethodHttp";

const LAMBDA_HANDLER: Handler<ITypeGeneric, ITypeGeneric> = async (event) => {
    console.log("Start request", JSON.stringify(event));

    return await firstValueFrom(
    trigger.pipe(
      mergeMap(() => of(<SaveUser>event.body)),
      mergeMap((request: SaveUser) => {
          console.log("Received request", JSON.stringify(request));

          return   CONTAINER.get<UserController>(SYMBOLS.UserController).saveUser(request)
          }
      ),
      mergeMap((res:IUserHttpResponse)=>{
            console.log("Response",JSON.stringify(res))
            return of(res)
      })
    )
  );
};
export const HANDLER: Handler<APIGatewayProxyEvent, ITypeGeneric> = middy(
  LAMBDA_HANDLER
)
  .use(httpJsonBodyParser())
  .use(httpErrorHandler())
  .use(
    httpResponseSerializer({
      defaultContentType: "application/json",
        serializers: [SERIALIZER_JSON],
    })
  );
