const translator = require("./translator");

function HexArray(arr) {
  this.hexarray = arr;

  this.insertPhysical = (data, translation) => {
    // console.log(translation);
    const internalData = translator.toInternal(data, translation);
    this.insert(
      translation.byteposition,
      translation.bitposition,
      translation.bitlength,
      internalData
    );
    return this;
  };

  this.insert = (byteposition, bitposition, length, data) => {
    const bytecount = Math.ceil((bitposition + length) / 8);
    const mask = ((1 << length) - 1) << bitposition;
    const shiftedData = data << bitposition;
    let maskedShiftedData = shiftedData & mask;
    for (
      let index = byteposition + bytecount - 1;
      index >= byteposition;
      index--
    ) {
      this.hexarray[index] = this.hexarray[index] | (maskedShiftedData & 0xff);
      maskedShiftedData = maskedShiftedData >> 8;
    }
    return this;
  };
  this.getRaw = (byteposition, bitposition, length) => {
    const bytecount = Math.ceil((bitposition + length) / 8);
    const mask = ((1 << length) - 1) << bitposition;
    let raw = 0;
    for (let index = byteposition; index < byteposition + bytecount; index++) {
      raw = (raw << 8) | (this.hexarray[index] & 0xff);
    }
    raw &= mask;
    raw = raw >> bitposition;
    return raw;
  };

  this.getPhysical = dictionary => {
    let res = {};
    dictionary.forEach(({ name, translation }) => {
      const internal = this.getRaw(
        translation.byteposition,
        translation.bitposition,
        translation.bitlength
      );
      res[name] = translator.toPhysical(internal, translation);
    });
    return res;
  };

  this.get = () => {
    return this.hexarray;
  };
}
module.exports = HexArray;
