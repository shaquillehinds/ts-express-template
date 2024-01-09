import { EventDefinition } from "postman-collection";

declare module "postman-collection" {
  interface ItemDefinition {
    event?: EventDefinition[];
  }
  interface FormParamDefinition {
    type?: string;
  }
  interface CollectionDefinition extends C {
    info?: {
      description?: string;
    };
  }
}
