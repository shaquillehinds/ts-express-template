export const createUserEvent = `
try {
  pm.collectionVariables.set('jwt', pm.response.json().token);
  pm.collectionVariables.set('userId', pm.response.json().user.userId);
}catch(e){
  console.error("Postman Test Error: ", e);
}
`;

export const loginUserEvent = `
try {
  pm.collectionVariables.set('jwt', pm.response.json().token);
  pm.collectionVariables.set('userId', pm.response.json().user.userId);
}catch(e){
  console.error("Postman Test Error: ", e);
}
`;
