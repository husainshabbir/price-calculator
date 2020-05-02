export type Unit = "kg" | "g" | "oz" | "lb";

export type ConvertInput = {
  item1price: number;
  item1weight: number;
  item1unit: Unit;

  item2price: number;
  item2weight: number;
  item2unit: Unit;
};

export type ConvertResult = {
  cheaperItem: string;
  cheaperPercent: number;
  areSame: boolean;
};

function roundValue(value: number, digits = 4) {
  let numberValue = value;
  let negative = false;

  if (numberValue < 0) {
    negative = true;
    numberValue *= -1;
  }
  const multiplier = 10 ** digits;
  numberValue = parseFloat((numberValue * multiplier).toFixed(11));
  numberValue = Math.round(numberValue) / multiplier;

  if (negative) {
    numberValue *= -1;
  }

  return numberValue;
}

function getWeightInGrams(weight: number, unit: Unit) {
  switch (unit) {
    case "kg":
      return roundValue(weight * 1000);

    case "lb":
      return roundValue(weight / 0.0022046);

    case "oz":
      return roundValue(weight / 0.035274);

    default:
      return roundValue(weight);
  }
}

export function convert(input: ConvertInput): ConvertResult {
  const data = { ...input };
  let cheaperItem = "";
  let cheaperPercent = 0;
  let areSame = false;

  // Calculator to Verify Calculations: https://www.vcalc.com/equation/?uuid=0b299ed2-7b32-11e5-a3bb-bc764e2038f2
  // Conversion Formula: https://www.w3schools.com/howto/howto_js_weight_converter.asp

  // Let's set the base weight to GRAMS. Therefore convert all inputs to the base weight.

  if (data.item1unit !== "g") {
    data.item1weight = getWeightInGrams(data.item1weight, data.item1unit);
    data.item1unit = "g";
  }

  if (data.item2unit !== "g") {
    data.item2weight = getWeightInGrams(data.item2weight, data.item2unit);
    data.item2unit = "g";
  }

  console.group("Convert to GRAMS");
  console.log("Item 1", `Price: ${data.item1price}`, `Weight: ${data.item1weight}${data.item1unit}`);
  console.log("Item 2", `Price: ${data.item2price}`, `Weight: ${data.item2weight}${data.item2unit}`);
  console.groupEnd();

  // Calculate the price of each item per 1 GRAM.
  data.item1price = roundValue(data.item1price / data.item1weight);
  data.item1weight = 1;

  data.item2price = roundValue(data.item2price / data.item2weight);
  data.item2weight = 1;

  console.group("Price Per GRAM");
  console.log("Item 1", `Price: ${data.item1price}`, `Weight: ${data.item1weight}${data.item1unit}`);
  console.log("Item 2", `Price: ${data.item2price}`, `Weight: ${data.item2weight}${data.item2unit}`);
  console.groupEnd();

  // Compare prices and find which one is cheaper.
  if (data.item1price === data.item2price) {
    areSame = true;
  } else if (data.item1price < data.item2price) {
    cheaperItem = "Item A";
  } else {
    cheaperItem = "Item B";
  }

  // Calculate the percentage difference.
  const difference = Math.abs(data.item1price - data.item2price);
  const percent = (difference / (data.item1price > data.item2price ? data.item1price : data.item2price)) * 100;
  cheaperPercent = roundValue(percent, 2);

  console.log(`Difference: ${difference}`);

  return {
    cheaperItem,
    cheaperPercent,
    areSame,
  };
}
