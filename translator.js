module.exports = {
  toInternal: (data, translation) => {
    let res = 0;
    if (translation.texttable)
      translation.texttable.forEach(text => {
        if (data === text.text) res = text.lowerLimit;
      });
    else {
      res = data;
    }
    res -= translation.offset;
    res /= translation.numerator;
    // Limits ?
    return res;
  },
  toPhysical: (data, translation) => {
    let res = 0;
    res = data * translation.numerator;
    res = res += translation.offset;
    if (translation.texttable)
      translation.texttable.forEach(text => {
        if (res >= text.lowerLimit && res <= text.lowerLimit) res = text.text;
      });
    return res;
  }
};
