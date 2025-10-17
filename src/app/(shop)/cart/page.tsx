import React from "react";
import { QuantitySelector, Title } from "@/components";
import Link from "next/link";
import { initialData } from "@/seed/seed";
import Image from "next/image";

const productsInCart = [
  initialData.products[0],
  initialData.products[1],
  initialData.products[2],
];

const Cart = () => {
  return (
    <div className="flex justify-center items-center mb-72 px-10 sm:px-0">
      <div className="flex flex-col w-[1000px]">
        <Title title={"Cart"} />

        <div className="grid grid-cols-1 sm:grid-cols-2">
          {/* cart  */}

          <div className="flex flex-col mt-5">
            <span className="text-xl">Add items</span>
            <Link href={"/"} className="underline mb-5">
              Continue shopping
            </Link>

            {/* items cart  */}

            {productsInCart.map((product) => {
              return (
                <div key={product.slug} className="flex mb-5">
                  <Image
                    src={`/products/${product.images[0]}`}
                    width={100}
                    height={100}
                    style={{
                        width:'100px',
                        height:'100px'
                    }}
                    alt={product.title}
                    className="mr-5 rounded"
                  />
                  <div>
                    <p>{product.title}</p>
                    <p>{product.price}</p>
                    <QuantitySelector quantity={3} stock={product.inStock} />
                    <button className="underline mt-3">Remove</button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* checkout  */}

          <div className="bg-white rounded-xl shadow-xl p-7">
            <h2 className="text-2xl mb-2">Summary</h2>
            <div className="grid grid-cols-2">

              <span>No. Products</span>
              <span className="text-right">3 Items</span>
              <span>Subtotal</span>
              <span className="text-right">$ 100</span>
              <span>Impuestos</span>
              <span className="text-right">$ 100</span>
              <span className="mt-5 text-2xl">Total:</span>
              <span className="mt-5 text-2xl text-right">3 Items</span>

            </div>

            <div className="mt-5 mb-2 w-full">
              <Link
              className="flex btn-primary justify-center"
              href={'/checkout/address'}
              >
                Checkout
              </Link>
            </div>

          </div>








        </div>
      </div>
    </div>
  );
};

export default Cart;
