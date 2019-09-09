const translator = require("./translator");

test("translate 0 to internal 0 using {offset:0,numerator:2}", () => {
  expect(
    translator.toInternal(0, {
      offset: 0,
      numerator: 1
    })
  ).toBe(0);
});

test("translate 2 to internal 1 using {offset:0,numerator:2} ", () => {
  expect(
    translator.toInternal(2, {
      offset: 0,
      numerator: 2
    })
  ).toBe(1);
});

test("translate 2 to internal 1 using {offset:1,numerator:1} ", () => {
  expect(
    translator.toInternal(2, {
      offset: 1,
      numerator: 1
    })
  ).toBe(1);
});

test("translate 'two' to internal 1 using {offset:1,numerator:1,texttable:[{lowerLimit:2, upperLimit:2, text:'zwei'}]} ", () => {
  expect(
    translator.toInternal("two", {
      offset: 1,
      numerator: 1,
      textTable: [{ lowerLimit: 2, upperLimit: 2, text: "two" }]
    })
  ).toBe(1);
});

test("translate 0 to physical 0 using {offset:0,numerator:2} ", () => {
  expect(
    translator.toPhysical(0, {
      offset: 0,
      numerator: 1
    })
  ).toBe(0);
});

test("translate 1 to physical 2 using {offset:0,numerator:2} ", () => {
  expect(
    translator.toPhysical(1, {
      offset: 0,
      numerator: 2
    })
  ).toBe(2);
});

test("translate 1 to physical 2 using {offset:1,numerator:1} ", () => {
  expect(
    translator.toPhysical(1, {
      offset: 1,
      numerator: 1
    })
  ).toBe(2);
});

test("translate 1 to physical 'two' using {offset:1,numerator:1,texttable:[{lowerLimit:2, upperLimit:2, text:'zwei'}]} ", () => {
  expect(
    translator.toPhysical(1, {
      offset: 1,
      numerator: 1,
      textTable: [{ lowerLimit: 2, upperLimit: 2, text: "two" }]
    })
  ).toBe("two");
});
