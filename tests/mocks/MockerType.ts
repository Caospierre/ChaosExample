import { SinonStub } from "sinon";

export type IMockerType<T> = {
  [K in keyof T]: SinonStub;
};
