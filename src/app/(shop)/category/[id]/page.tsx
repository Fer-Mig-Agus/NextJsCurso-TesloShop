import { notFound } from "next/navigation";



interface Props{
  params:{
    id:string;
  }
}

const Category = ({params}:Props) => {

  if (params.id === 'kids') {
    notFound();
  }

  return (
    <div>
      <h1>Category page</h1>
    </div>
  )
}

export default Category
