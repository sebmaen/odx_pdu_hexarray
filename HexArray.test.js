const HexArray = require("./HexArray");

test("get the raw Array", () => {
  expect(new HexArray([0]).get()).toStrictEqual([0]);
});

test("insert 255 at byte 0 bit 0", () => {
  expect(new HexArray([0]).insert(0, 0, 8, 255).get()).toStrictEqual([255]);
});

test("get raw data at byte 0 bit 0 length 8 from [10] should be 10", () => {
  expect(new HexArray([10]).getRaw(0, 0, 8)).toBe(10);
});

const arr = new HexArray([0, 0]);
test("insert 0xFF at byte 0 bit 4 length 8", () => {
  expect(arr.insert(0, 4, 8, 0xff).get()).toStrictEqual([0x0f, 0xf0]);
});
test("get byte 0, bit 4 length 8 of [0x0F, 0xF0] should be 0xFF", () => {
  expect(arr.getRaw(0, 4, 8)).toBe(0xff);
});

test("getPhysical for dict {startbyte:0, startbis:0, bitlength:8} of [10] should be 10", () => {
  expect(
    new HexArray([10]).getPhysical([
      {
        name: "test",
        translation: {
          bytePosition: 0,
          bitPosition: 0,
          bitLength: 8,
          offset: 0,
          numerator: 2
        }
      }
    ])
  ).toStrictEqual({ test: 20 });
});
test("getPhysical for dict {startbyte:0, , bitlength:8} of [10] should be 10", () => {
  expect(
    new HexArray([10, 20]).getPhysical([
      {
        name: "test",
        translation: {
          bytePosition: 0,
          bitLength: 8,
          offset: 0,
          numerator: 2
        }
      },
      {
        name: "test2",
        translation: {
          bytePosition: 1,
          bitLength: 8
        }
      }
    ])
  ).toStrictEqual({ test: 20, test2: 20 });
});
test("insertPhysical for dict test", () => {
  expect(
    new HexArray([0, 0, 0])
      .insertPhysical("ja", {
        bytePosition: 3,
        bitPosition: 2,
        bitLength: 1,
        numerator: 1,
        textTable: [
          { text: "nein" },
          { lowerLimit: 1, upperLimit: 1, text: "ja" }
        ]
      })
      .get()
  ).toStrictEqual([0, 0, 0, 0b100]);
});
test("insertPhysical for dict test no bitposition", () => {
  expect(
    new HexArray([0, 0, 0])
      .insertPhysical("ja", {
        bytePosition: 3,
        bitLength: 1,
        numerator: 1,
        textTable: [
          { text: "nein" },
          { lowerLimit: 1, upperLimit: 1, text: "ja" }
        ]
      })
      .get()
  ).toStrictEqual([0, 0, 0, 0b1]);
});
