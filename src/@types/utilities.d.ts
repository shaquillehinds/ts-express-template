type ExtractModelType<M> = M extends import("mongoose").Model<infer U>
  ? U
  : never;

type AuthenticatedRequest<
  P = import("express-serve-static-core").ParamsDictionary,
  ResBody = any,
  ReqBody = any,
  ReqQuery = qs.ParsedQs,
  Locals extends Record<string, any> = Record<string, any>
> = import("express").Request<P, ResBody, ReqBody, ReqQuery, Locals> & {
  user?: UserDocument;
};
