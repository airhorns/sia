const { sia, desia } = require("..");
const fetch = require("node-fetch");
const deepEqual = require("deep-equal");

test("Serialize dates", () => {
  const date = new Date();
  const serialized = sia(date);
  const deserialized = desia(serialized);
  expect(deserialized).toBeInstanceOf(Date);
  expect(deserialized).toEqual(date);
});

test("Serialize integers", () => {
  const integer = 42;
  const serialized = sia(integer);
  const deserialized = desia(serialized);
  expect(typeof deserialized).toEqual("number");
  expect(deserialized).toEqual(integer);
});

test("Serialize floats", () => {
  const float = 3.14;
  const serialized = sia(float);
  const deserialized = desia(serialized);
  expect(typeof deserialized).toEqual("number");
  expect(deserialized).toEqual(float);
});

test("Serialize boolean", () => {
  const t = true;
  const serialized = sia(t);
  const deserialized = desia(serialized);
  expect(typeof deserialized).toEqual("boolean");
  expect(deserialized).toEqual(t);
});

test("Serialize regex", () => {
  const regex = /SIA+/i;
  const serialized = sia(regex);
  const deserialized = desia(serialized);
  expect(deserialized).toBeInstanceOf(RegExp);
  expect(deserialized).toEqual(regex);
});

test("Serialize strings", () => {
  const string = "Hello world!";
  const serialized = sia(string);
  const deserialized = desia(serialized);
  expect(typeof deserialized).toBe("string");
  expect(deserialized).toEqual(string);
});

test("Serialize arrays", () => {
  const array = [1, 2, 3];
  const serialized = sia(array);
  const deserialized = desia(serialized);
  expect(deserialized).toEqual(array);
});

test("Serialize objects", () => {
  const object = { abc: { xyz: 100 } };
  const serialized = sia(object);
  const deserialized = desia(serialized);
  expect(deserialized).toEqual(object);
});

test(
  "Serialize huge sample data",
  async () => {
    const data = await fetch(
      "https://github.com/json-iterator/test-data/raw/master/large-file.json"
    ).then((resp) => resp.json());
    const serialized = sia(data);
    const deserialized = desia(serialized);
    expect(deepEqual(deserialized, data)).toBe(true);
  },
  60 * 1000
);
