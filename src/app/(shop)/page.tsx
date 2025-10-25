export const revalidate = 60; // 60 segundos
import { getPaginatedProductsWithImages } from '@/actions';
import { Title, ProductGrid, Pagination } from '@/components';
import { redirect } from 'next/navigation';


interface SearchParamsShape {
  page?: string;
}

interface Props {
 searchParams: Promise<SearchParamsShape>;
}


export default async function Home({ searchParams }: Props) {

  const searchParamsValue=await searchParams;

  const page = searchParamsValue.page ? parseInt(searchParamsValue.page) : 1;

  const { products, currentPage, totalPages } = await getPaginatedProductsWithImages({page});

  if (products.length === 0) {
    redirect('/')
  }

  return (
    <div>

      <Title
        title='Store'
        subtitle="All products"
        className="mb-2"
      />


      <ProductGrid products={products} />

      <Pagination totalPages={totalPages}/>

    </div>
  );
}

