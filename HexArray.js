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
    // console.log(bytepos, bytecount, maskedShiftedData);
    for (let index = byteposition + bytecount; index--; index > byteposition) {
      // console.log(index);
      this.hexarray[index] = this.hexarray[index] | (maskedShiftedData & 0xff);
      maskedShiftedData = maskedShiftedData >> 8;
    }
    return this;
  };

  this.getPhysical = dictionary => {};
  this.get = () => {
    return this.hexarray;
  };
}
module.exports = HexArray;
