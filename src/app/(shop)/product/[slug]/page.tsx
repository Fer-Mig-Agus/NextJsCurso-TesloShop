import {
  ProductMobileSlideshow,
  ProductSlideshow,
  QuantitySelector,
  SizeSelector,
} from "@/components";
import { titleFont } from "@/config/fonts";
import { initialData } from "@/seed/seed";
import { notFound } from "next/navigation";


interface RouteParams {
  slug: string;
}



interface Props {
  params: Promise<RouteParams>;
}

const Product = async ({ params }: Props) => {
  const { slug } = await params;

  const product = initialData.products.find((product) => product.slug === slug);

  if (!product) {
    notFound();
  }

  return (
    <div className="mt-5 mb-20 grid md:grid-cols-3 gap-3">
      {/* Slideshow  */}

      <div className="col-span-1 md:col-span-2">
        {/* Mobile Slideshow  */}
        <ProductMobileSlideshow
          className="block md:hidden"
          images={product.images}
          title={product.title}
        />

        {/* Desktop Slideshow  */}
        <ProductSlideshow
          className="hidden md:block"
          images={product.images}
          title={product.title}
        />
      </div>

      {/* Details  */}

      <div className="col-span-1 px-5 ">
        <h1 className={`${titleFont.className} antialiased font-bold text-xl`}>
          {product.title}
        </h1>
        <p className="text-lg mb-5">${product.price}</p>

        {/* Size selector  */}
        <SizeSelector
          selectedSize={product.sizes[0]}
          availableSizes={product.sizes}
        />

        {/* Amount selector  */}
        <QuantitySelector quantity={0} stock={product.inStock} />

        {/* Button  */}

        <button className="btn-primary my-5 cursor-pointer">Add to cart</button>

        {/* Description  */}
        <h3 className="font-bold text-sm">Description</h3>
        <p className="font-light mt-2">{product.description}</p>
      </div>
    </div>
  );
};

export default Product;
