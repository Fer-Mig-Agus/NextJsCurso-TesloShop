"use client";
import { ProductGrid, Title } from "@/components";
import { initialData } from "@/seed/seed";
import Image from "next/image";
import { notFound, usePathname } from "next/navigation";

// interface Props {
//   params: {
//     id: string;
//   };
// }


interface Props {
  params: {
    id: 'men' | 'women' | 'kid';
  };
}


const Category = ({ params }: Props) => {

  // if (params.id) {
  //   notFound();
  // }

  // const pathName = usePathname();

  // const category=pathName.split('/').pop()

  const {id}=params

  const data = initialData.products.filter((item) => item.gender === id);

  const labels = {
    'men':'Men',
    'women':'Women',
    'kid':'Kids'
  }

  

  return (
    <div>
      
            <Title
            title={`${labels[id]}'s section   `}
            subtitle="All products"
            className="mb-2"
            />
      <ProductGrid products={data} />
    </div>
  );
};

export default Category;
