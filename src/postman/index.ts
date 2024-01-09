import { Collection, VariableDefinition } from "postman-collection";
import userGroup from "./requests/user.postman.requests";
import * as vars from "./config/vars.postman.config";
import { writeFileSync } from "fs";

const postmanCollection = new Collection({
  info: {
    name: "Path AI Core Restful Service Gateway",
    //@ts-ignore
    description:
      "You don't need to fill out the body for any of the requests since all of the endpoints request body are prefilled, just send. The Create Company endpoint requires you to attach a file to the body on the image field but will still work without it since a default photo will be saved to the field on the server. The collection has variables that are automatically set when certain requests are made, for example Login User will save the jwt and userId collection variables. If some requests don't work, you might need to set certain variables by sending another request from another endpoint so that certain collection variables are updated/saved, for example authentication required endpoints require an up to date jwt collection variable.",
  },
  variable: (() => {
    const varsArray: VariableDefinition[] = [];
    for (let varr in vars) {
      varsArray.push(vars[varr as keyof typeof vars]);
    }
    return varsArray;
  })(),
  item: [userGroup],
});

writeFileSync(
  "src/postman/collection.json",
  JSON.stringify(postmanCollection.toJSON()),
  {
    encoding: "utf-8",
  }
);
