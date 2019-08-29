const HexArray = require("./HexArray");

const arr1 = new HexArray([0]);
test("get the raw Array", () => {
  expect(arr1.get()).toStrictEqual([0]);
});

const arr2 = new HexArray([0]);
test("insert 255 at byte 0 bit 0", () => {
  expect(arr2.insert(0, 0, 8, 255).get()).toStrictEqual([255]);
});
