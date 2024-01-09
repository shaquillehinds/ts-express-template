import { config } from "dotenv";
config();
import { errMsg, sendErrRes } from "./errMsg";
import glog from "../sdks/gcpLogging";

global.errMsg = errMsg;
global.sendErrRes = sendErrRes;
global.glog = glog;
global.is = function <T>(value: T) {
  return value ? value : undefined;
};
