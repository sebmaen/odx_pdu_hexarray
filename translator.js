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
    res = data * (translation.numerator || 1);
    res = res += translation.offset || 0;
    if (translation.textTable)
      translation.textTable.forEach(text => {
        if (res >= text.lowerLimit && res <= text.lowerLimit) res = text.text;
      });
    return res;
  }
};
