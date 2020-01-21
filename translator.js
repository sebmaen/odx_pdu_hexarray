module.exports = {
  toInternal: (data, translation) => {
    let res = 0;
    if (translation.textTable)
      translation.textTable.forEach(text => {
        if (data === text.text) res = text.lowerLimit;
      });
    else {
      res = data;
    }
    // console.log("tt", res);
    res -= translation.offset || 0;
    res /= translation.numerator || 1;
    // Limits ?
    return res;
  },
  toPhysical: (data, translation) => {
    let res = 0;
    // use numerator and offset only if the bigInt data is small enougth...
    const smallInt = parseInt(data);
    if (smallInt !== Infinity) {
      res = smallInt * (translation.numerator || 1);
      res = res += translation.offset || 0;
    } else {
      res = data;
    }
    if (translation.textTable)
      translation.textTable.forEach(text => {
        // const lowerLimit = typeof(text.lowerLimit) === "number": text.lowerLimit : parseInt( text.lowerLimit )
        if (text.hexDump && BigInt(res) === BigInt("0x" + text.hexDump)) {
          res = text.text;
        }
        if (
          text.lowerLimit &&
          text.upperLimit &&
          res >= text.lowerLimit &&
          res <= text.upperLimit
        )
          res = text.text;
      });
    return res;
  }
};
