var errMsg = (error: unknown) => {
  if (error instanceof Error) {
    return error.message;
  } else if (typeof error === "string") {
    return error;
  } else {
    return JSON.stringify(error);
  }
};
export default errMsg;
