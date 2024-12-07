import { Bench } from "tinybench";
import {
  siaFiveThousandUsers,
  siaFiveThousandUsersDecode,
} from "./tests/sia.js";
import {
  jsonFiveThousandUsers,
  jsonFiveThousandUsersDecode,
} from "./tests/json.js";
import {
  cborFiveThousandUsers,
  cborFiveThousandUsersDecode,
} from "./tests/cbor.js";
import {
  siaOneFiveThousandUsers,
  siaOneFiveThousandUsersDecode,
} from "./tests/sia-v1.js";
import {
  msgpackrFiveThousandUsers,
  msgpackrFiveThousandUsersDecode,
} from "./tests/msgpackr.js";

import {
  protobufFiveThousandUsers,
  protobufFiveThousandUsersDecode,
} from "./tests/protobuf.js";
import { avscFiveThousandUsers, avscFiveThousandUsersDecode } from "./tests/avsc.js";
import { furyFiveThousandUsers, furyFiveThousandUsersDecode } from "./tests/fury.js";
import { msgpackrRecordsFiveThousandUsers, msgpackrRecordsFiveThousandUsersDecode } from "./tests/msgpackr-records.js";
import { v8FiveThousandUsers, v8FiveThousandUsersDecode } from "./tests/v8.js";
import { seqprotoFiveThousandUsers, seqprotoFiveThousandUsersDecode } from "./tests/seqproto.js";

const bench = new Bench({ name: "serialization", time: 60 * 1000 });

bench.add("JSON", () => jsonFiveThousandUsers());
bench.add("Sializer", () => siaFiveThousandUsers());
bench.add("Sializer (v1)", () => siaOneFiveThousandUsers());
bench.add("CBOR-X", () => cborFiveThousandUsers());
bench.add("MsgPackr", () => msgpackrFiveThousandUsers());
bench.add("MsgPackr (records)", () => msgpackrRecordsFiveThousandUsers());
bench.add("Protobuf", () => protobufFiveThousandUsers());
bench.add("avsc", () => avscFiveThousandUsers());
bench.add("Fury", () => furyFiveThousandUsers());
bench.add("SeqProto", () => seqprotoFiveThousandUsers());
bench.add("V8", () => v8FiveThousandUsers());

console.log(`Running ${bench.name} benchmark...`);
await bench.run();

console.table(bench.table());

const deserializeBench = new Bench({
  name: "deserialization",
  time: 60 * 1000,
});

deserializeBench.add("JSON", () => jsonFiveThousandUsersDecode());
deserializeBench.add("Sializer", () => siaFiveThousandUsersDecode());
deserializeBench.add("Sializer (v1)", () => siaOneFiveThousandUsersDecode());
deserializeBench.add("CBOR-X", () => cborFiveThousandUsersDecode());
deserializeBench.add("MsgPackr", () => msgpackrFiveThousandUsersDecode());
deserializeBench.add("MsgPackr (records)", () => msgpackrRecordsFiveThousandUsersDecode());
deserializeBench.add("Protobuf", () => protobufFiveThousandUsersDecode());
deserializeBench.add("avsc", () => avscFiveThousandUsersDecode());
deserializeBench.add("Fury", () => furyFiveThousandUsersDecode());
deserializeBench.add("SeqProto", () => seqprotoFiveThousandUsersDecode());
deserializeBench.add("V8", () => v8FiveThousandUsersDecode());

console.log(`Running ${deserializeBench.name} benchmark...`);
await deserializeBench.run();

console.table(deserializeBench.table());

console.log("Sia file size:", siaFiveThousandUsers().length);
console.log("Sia v1 file size:", siaOneFiveThousandUsers().length);
console.log("JSON file size:", jsonFiveThousandUsers().length);
console.log("MsgPackr file size:", cborFiveThousandUsers().length);
console.log("MsgPackr (records) file size:", msgpackrRecordsFiveThousandUsers().length);
console.log("CBOR-X file size:", msgpackrFiveThousandUsers().length);
console.log("Protobuf file size:", protobufFiveThousandUsers().length);
console.log("avsc file size:", avscFiveThousandUsers().length);
console.log("Fury file size:", furyFiveThousandUsers().length);
console.log("SeqProto file size:", seqprotoFiveThousandUsers().byteLength);
console.log("V8 file size:", v8FiveThousandUsers().length);