import { fiveThousandUsers } from "./common.js";
import v8 from "v8";

export const v8FiveThousandUsers = () =>
  v8.serialize(fiveThousandUsers);

const encoded = v8FiveThousandUsers();

export const v8FiveThousandUsersDecode = () => v8.deserialize(encoded);
