
import { getPaginatedProductsWithImages } from "@/actions";
import { Pagination, ProductGrid, Title } from "@/components";
import { Gender } from "@/generated/prisma";
import { Category } from "@/interfaces/product.interface";
import { initialData } from "@/seed/seed";
import Image from "next/image";
import { notFound, redirect, usePathname } from "next/navigation";


interface Props {
  params: {
    gender: string;
  };
  searchParams: {
    page?: string;
  }
}

const CategoryPage = async ({ params, searchParams }: Props) => {

  // if (params.id) {
  //   notFound();
  // }

  // const pathName = usePathname();

  // const category=pathName.split('/').pop()

  const { gender } = params;

  const page = searchParams.page ? parseInt(searchParams.page) : 1;

  const { products, currentPage, totalPages } = await getPaginatedProductsWithImages({ page, gender: gender as Gender });

  if (products.length === 0) {
    redirect(`/gender/${gender}`);
  }



  const labels: Record<string, string> = {
    'men': 'Men',
    'women': 'Women',
    'kid': 'Kids',
    'unisex': 'All'
  }



  return (
    <div>

      <Title
        title={`${labels[gender]}'s section   `}
        subtitle="All products"
        className="mb-2"
      />
      <ProductGrid products={products} />

      <Pagination totalPages={totalPages} />
    </div>
  );
};

export default CategoryPage;
