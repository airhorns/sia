import { fiveThousandUsers } from "./common.js";
import { Packr } from "msgpackr";

const packr = new Packr();

export const msgpackrRecordsFiveThousandUsers = () => packr.pack(fiveThousandUsers);

const encoded = msgpackrRecordsFiveThousandUsers();

export const msgpackrRecordsFiveThousandUsersDecode = () => packr.unpack(encoded);
