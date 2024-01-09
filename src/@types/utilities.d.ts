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
  company?: CompanyDocument;
  track?: (opts?: {
    trackName?: string;
    distinctId?: string;
    data?: import("mixpanel").PropertyDict;
  }) => void;
};

type Prettify<T> = {
  [K in keyof T]: T[K];
} & {};

type ParsedQs = Prettify<import("qs").ParsedQs> & { event?: string };

type PaginationQs = ParsedQs & { limit?: number; skip?: skip };
