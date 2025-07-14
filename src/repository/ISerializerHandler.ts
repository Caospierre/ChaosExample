import {ITypeGeneric} from "repository/ITypes";

export interface ISerializerHandler {
    regex: RegExp;
    serializer: (
        response: ITypeGeneric
    ) => string | { body: ITypeGeneric; [key: string]: ITypeGeneric };
}