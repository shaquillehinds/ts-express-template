export const authHeader = {
  key: "Authorization",
  value: `Bearer {{jwt}}`,
};

export const jsonHeader = {
  key: "Content-Type",
  value: "application/json",
};
export const formDataHeader = {
  key: "Content-Type",
  value: "multipart/form-data",
};

export const versionHeader = {
  key: "version",
  value: "{{version}}",
};

export const headers = [versionHeader, authHeader, jsonHeader];
export const fileHeaders = [versionHeader, authHeader, formDataHeader];
