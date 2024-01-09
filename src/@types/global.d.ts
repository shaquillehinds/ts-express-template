declare var errMsg: (error: unknown) => string;
declare var sendErrRes: (props: SendErrResProps) => void;
declare var glog: (
  text: string,
  opts?: import("../utils/sdks/gcpLogging").GLogOpts
) => void;

/**
 * Takes any value and returns that value if it's a non nullish value.
 * Returns undefined if it's a nullish value.
 * Nullish values are (0, "", null, false and undefined).
 * This function is important for any other type of function that requires a value or undefined to work correctly.
 */
declare var is: <T>(value: T) => T | undefined;
