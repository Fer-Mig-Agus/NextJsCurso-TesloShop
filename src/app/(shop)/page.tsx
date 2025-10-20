import { getPaginatedProductsWithImages } from '@/actions';
import { Title, ProductGrid } from '@/components';

interface Props {
  searchParams: {
    page?: string;
  }
}


export default async function Home({ searchParams }: Props) {

  const page = searchParams.page ? parseInt(searchParams.page) : 1;

  const { products } = await getPaginatedProductsWithImages({page});

  return (
    <div>

      <Title
        title='Store'
        subtitle="All products"
        className="mb-2"
      />


      <ProductGrid products={products} />

    </div>
  );
}

