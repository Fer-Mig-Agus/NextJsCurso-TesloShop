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

const Checkout = () => {
  return (
    <div className="flex justify-center items-center mb-72 px-10 sm:px-0">
      <div className="flex flex-col w-[1000px]">
        <Title title={"Verify Order"} />

        <div className="grid grid-cols-1 sm:grid-cols-2">
          {/* cart  */}

          <div className="flex flex-col mt-5">
            <span className="text-xl">Modify items</span>
            <Link href={"/cart"} className="underline mb-5">
              Edit cart items
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
                      width: "100px",
                      height: "100px",
                    }}
                    alt={product.title}
                    className="mr-5 rounded"
                  />
                  <div>
                    <p>{product.title}</p>
                    <p>{product.price} x 3</p>
                    <p className="font-bold">Subtotal: {product.price * 3}</p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* checkout  */}

          <div className="bg-white rounded-xl shadow-xl p-7">
            <h2 className="text-2xl mb-2 font-bold">Delivery address</h2>
            <div className="mb-10">
              <p className="text-xl">Miguel Fernandez</p>
              <p>Damacio Palacio</p>
              <p>La Catolica</p>
              <p>Santiago del Estero</p>
              <p>Argentina</p>
              <p>CP 4200</p>
              <p>213123123</p>
            </div>

            {/* divider  */}
            <div className="w-full h-0.5 rounded bg-gray-200 mb-10" />

            <h2 className="text-2xl mb-2">Summary</h2>
            <div className="grid grid-cols-2">
              <span>No. Products</span>
              <span className="text-right">3 Items</span>
              <span>Subtotal</span>
              <span className="text-right">$ 100</span>
              <span>Taxes</span>
              <span className="text-right">$ 100</span>
              <span className="mt-5 text-2xl">Total:</span>
              <span className="mt-5 text-2xl text-right">3 Items</span>
            </div>

            <div className="mt-5 mb-2 w-full">
              <p className="mb-5">
                {/* Disclamer  */}
                <span className="text-xs">
                  By clicking "Place order", you agree to our{" "}
                  <a href="#" className="underline">
                    Terms and Conditions
                  </a>{" "}
                  and{" "}
                  <a href="#" className="underline">
                    Privacy Policy.
                  </a>
                </span>
              </p>
              <Link
                className="flex btn-primary justify-center"
                href={"/orders/123"}
              >
                Place order
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
