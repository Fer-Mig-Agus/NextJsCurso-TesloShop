"use client";
import { useState } from "react";
import { IoAddCircleOutline, IoRemoveCircleOutline } from "react-icons/io5";

interface Props {
  quantity: number;
  stock: number;
}

export const QuantitySelector = ({ quantity, stock }: Props) => {
  const [count, setCount] = useState(quantity);
  const onQuantityChange = (value: number) => {
    if (count + value < 1) return;
    if (count + value > stock) return;
    setCount(count + value);
  };

  return (
    <div className="flex flex-col">
      <h3 className="font-bold mb-4">Quantity</h3>

      <div className="flex">

      <button 
      className="cursor-pointer"
       onClick={() => onQuantityChange(-1)}>
        <IoRemoveCircleOutline size={30} />
      </button>
      <span className="w-20 mx-3 px-5 bg-gray-100 text-center rounded">
        {count}
      </span>
      <button 
      className="cursor-pointer"
       onClick={() => onQuantityChange(1)}>
        <IoAddCircleOutline size={30} />
      </button>
      </div>
    </div>
  );
};
