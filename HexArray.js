const translator = require("./translator");

function HexArray(arr) {
  this.hexarray = arr;

  this.insertPhysical = (data, translation) => {
    // console.log(translation);
    const internalData = translator.toInternal(data, translation);
    // console.log(internalData);
    this.insert(
      translation.bytePosition,
      translation.bitPosition,
      translation.bitLength,
      internalData
    );
    return this;
  };

  this.insert = (bytePosition, bitPosition, length, data) => {
    const bytecount = Math.ceil((bitPosition + length) / 8);
    const mask = ((1 << length) - 1) << bitPosition;
    const shiftedData = data << bitPosition;
    let maskedShiftedData = shiftedData & mask;
    for (
      let index = bytePosition + bytecount - 1;
      index >= bytePosition;
      index--
    ) {
      this.hexarray[index] = this.hexarray[index] | (maskedShiftedData & 0xff);
      maskedShiftedData = maskedShiftedData >> 8;
    }
    return this;
  };
  this.getRaw = (bytePosition, bitPosition, length) => {
    const bytecount = Math.ceil((bitPosition + length) / 8);
    const mask = ((1 << length) - 1) << bitPosition;
    let raw = 0;
    for (let index = bytePosition; index < bytePosition + bytecount; index++) {
      raw = (raw << 8) | (this.hexarray[index] & 0xff);
    }
    raw &= mask;
    raw = raw >> bitPosition;
    return raw;
  };

  this.getPhysical = dictionary => {
    let res = {};
    dictionary.forEach(({ name, translation }) => {
      const internal = this.getRaw(
        translation.bytePosition,
        translation.bitPosition || 0,
        translation.bitLength
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
