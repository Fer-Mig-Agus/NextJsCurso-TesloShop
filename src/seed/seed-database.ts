import { initialData } from "./seed";
import prisma from '../lib/prisma';


async function main() {
    // Borrar registros previos


    await prisma.productImage.deleteMany();
    await prisma.product.deleteMany();
    await prisma.category.deleteMany();


    // categorias

    const { categories, products } = initialData;

    const categoriesData = categories.map((name) => ({ name }));

    await prisma.category.createMany({
        data: categoriesData
    });

    // const categoriesDB = await prisma.category.findMany();

    // const categoriesMap = categoriesDB.reduce((map, category) => {
    //     map[category.name.toLowerCase()] = category.id;
    //     return map;
    // }, {} as Record<string, string>);

    // Mapear categorías por nombre normalizado


    const categoriesDB = await prisma.category.findMany();
    const categoriesMap = new Map(
        categoriesDB.map((c) => [c.name.trim().toLowerCase(), c.id]),
    );


    

    // productos

    products.forEach(async (product) => {
        const { type, images, ...rest } = product;

        const categoryId = categoriesMap.get(String(type).trim().toLowerCase());
        if (!categoryId) {
            throw new Error(
                `El tipo de producto "${type}" no coincide con ninguna categoría. ` +
                `Asegúrate de que "type" exista en initialData.categories (normaliza mayúsculas/acentos).`
            );
        }

        const dbProduct = await prisma.product.create({
            data: {
                ...rest,
                categoryId
            }
        })

        // imagenes


        if (images?.length) {
            await prisma.productImage.createMany({
                data: images.map((url: string) => ({ url, productId: dbProduct.id })),
            });
        }

        // const imagesData = images.map(image => ({
        //     url: image,
        //     productId: dbProduct.id
        // }));

        // await prisma.productImage.createMany({
        //     data: imagesData
        // });
    });

    console.log('Seed ejecutado correctamente')
}



(() => {
    if (process.env.NODE_ENV === 'production') return;
    main();
})();