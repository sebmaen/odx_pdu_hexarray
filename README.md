# How to Use:

## create an object:

```javascript
const pdu = new HexArray([0, 0, 0, 0]);
```

## insert some raw data

```javascript
pdu.insert(byteposition, bitposition, length, data);
```

- byteposition and bitposition: the start within the pdu
- length: number of bits to insert
- data: int value to insert

bytes count from left to right and bits count from right to left
[byte0, byte1[...,bit2, bit1, bit0],byte2,...]

## get Raw data

reads a specific part within the pdu

- byteposition and bitposition: the start within the pdu
- length: number of bits to read

returns an integer

```javascript
pdu.getRaw(byteposition, bitposition, length);
```

## insert some physical data

well, this needs a translation object which looks like:

```javascript
const translation = {
  byteposition: 0,
  bitposition: 0,
  bitlength: 8,
  offset: 0,
  numerator: 1,
  texttable: [{ lowerLimit: 0, upperLimit: 1, text: "null" }]
};
```

(where the texttable is optional)

now you can insert

```javascript
pdu.insertPhysical(physicalData, translation);
```

## get Physical Data with Dictionary

you have to create a dictionary array containing translations:

```javascript
const dictionary = [
  {
    name: "Value1",
    translation: translationObj1
  },
  {
    name: "Value2",
    translation: translationObj2
  }
];
```

now you can get physical data

```javascript
pdu.getPhysical(dictionary);
```

this will return for example:

```javascript
  {
    Value1: 1,
    Value2: "null"
  }
```
