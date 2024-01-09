import { EventDefinition } from "postman-collection";

export default function createTestEvent(exec: string): EventDefinition {
  return {
    listen: "test",
    script: {
      type: "text/javascript",
      exec,
    },
  };
}
