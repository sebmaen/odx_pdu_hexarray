class HexArray {
  constructor(arr) {
    this.hexarray = arr;
  }

  translateToInternal = (data, translation) => {
    let res = 0;
    if (translation.texttable)
      translation.texttable.forEach(text => {
        if (data === text.text) res = text.lowerLimit;
      });
    res -= translation.offset;
    res /= translation.numerator;
    // Limits ?
    return res;
  };

  insertPhysical = (data, translation) => {
    // console.log(translation);
    const internalData = this.translateToInternal(data, translation);
    this.insert(
      translation.byteposition,
      translation.bitposition,
      translation.bitlength,
      internalData
    );
  };

  insert = (byteposition, bitposition, length, data) => {
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
  };
  get = () => {
    return this.hexarray;
  };
}
module.exports = HexArray;
