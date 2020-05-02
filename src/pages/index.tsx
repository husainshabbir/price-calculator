import React, { useState } from "react";
import { Helmet } from "react-helmet";
import { useForm } from "react-hook-form";

import { convert, ConvertInput, Unit } from "src/assets/converter";
import SelectField from "src/components/SelectField";
import SubmitButton from "src/components/SubmitButton";
import TextField from "src/components/TextField";

type DropDownItem = {
  unit: Unit;
  name: string;
};

const units: DropDownItem[] = [
  { unit: "kg", name: "KG" },
  { unit: "g", name: "G" },
  { unit: "oz", name: "OZ" },
  { unit: "lb", name: "LB" },
];

export default () => {
  const [cheaperItem, setCheaperItem] = useState("");
  const [cheaperPercent, setCheaperPercent] = useState(0);
  const [areBothSame, setAreBothSame] = useState(false);

  const { register, handleSubmit } = useForm<ConvertInput>({
    defaultValues: {
      item1price: 0,
      item1weight: 0,
      item1unit: "kg",
      item2price: 0,
      item2weight: 0,
      item2unit: "kg",
    },
  });

  function calculate(data: ConvertInput) {
    const input: ConvertInput = {
      item1price: parseFloat(String(data.item1price)) || 0,
      item1weight: parseFloat(String(data.item1weight)) || 0,
      item1unit: data.item1unit,
      item2price: parseFloat(String(data.item2price)) || 0,
      item2weight: parseFloat(String(data.item2weight)) || 0,
      item2unit: data.item2unit,
    };

    if (!(input.item1price && input.item1weight > 0 && input.item2price && input.item2weight > 0)) {
      setCheaperItem("");
      setCheaperPercent(0);
      return;
    }

    const result = convert(input);

    setCheaperItem(result.cheaperItem);
    setCheaperPercent(result.cheaperPercent);
    setAreBothSame(result.areSame);
  }

  return (
    <>
      <Helmet>
        <title>What is Cheaper?</title>
      </Helmet>
      <h1 className="p-3 pb-0 font-medium text-center uppercase">What is Cheaper?</h1>

      <form onSubmit={handleSubmit(calculate)}>
        <div className="inline-block px-3 mt-4 ml-3 font-medium uppercase bg-blue-100 rounded-lg rounded-b-none">
          Item 1
        </div>
        <div className="flex p-3 -mx-1 bg-blue-100">
          <div className="w-1/2 px-1">
            <TextField
              type="number"
              name="item1price"
              placeholder="0.00"
              step="0.01"
              prefix="$"
              label="Price"
              ref={register}
              required
            />
          </div>
          <div className="w-1/2 px-1">
            <TextField
              type="number"
              name="item1weight"
              step="0.01"
              label="Weight"
              ref={register}
              required
              suffix={
                <SelectField name="item1unit" ref={register} required>
                  {units.map((unit) => (
                    <option key={unit.unit} value={unit.unit}>
                      {unit.name}
                    </option>
                  ))}
                </SelectField>
              }
            />
          </div>
        </div>

        <div className="inline-block px-3 mt-4 ml-3 font-medium uppercase bg-blue-100 rounded-lg rounded-b-none">
          Item 2
        </div>
        <div className="flex p-3 -mx-1 bg-blue-100">
          <div className="w-1/2 px-1">
            <TextField
              type="number"
              name="item2price"
              placeholder="0.00"
              step="0.01"
              prefix="$"
              label="Price"
              ref={register}
              required
            />
          </div>
          <div className="w-1/2 px-1">
            <TextField
              type="number"
              name="item2weight"
              step="0.01"
              label="Weight"
              ref={register}
              required
              suffix={
                <SelectField name="item2unit" ref={register} required>
                  {units.map((unit) => (
                    <option key={unit.unit} value={unit.unit}>
                      {unit.name}
                    </option>
                  ))}
                </SelectField>
              }
            />
          </div>
        </div>

        <div className="p-3">
          <SubmitButton>Calculate</SubmitButton>
        </div>

        {areBothSame && (
          <div className="p-3 m-3 text-green-700 bg-green-100 border-t border-b border-green-500">
            Both items are the same in terms of price-per-weight.
          </div>
        )}

        {!areBothSame && cheaperItem && (
          <div className="p-3 m-3 text-green-700 bg-green-100 border-t border-b border-green-500">
            <b>{cheaperItem}</b> is cheaper by <b>{cheaperPercent}%</b>.
          </div>
        )}
      </form>
    </>
  );
};
