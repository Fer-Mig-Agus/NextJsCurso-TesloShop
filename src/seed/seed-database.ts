import { initialData } from "./seed";
import prisma from "../lib/prisma";

const norm = (s: unknown) => String(s ?? "").trim();
const lower = (s: unknown) => norm(s).toLowerCase();
const upper = (s: unknown) => norm(s).toUpperCase();

const SIZE_ENUM = new Set(["XS", "S", "M", "L", "XL", "XXL", "XXXL"]);
const GENDER_ENUM = new Set(["men", "women", "kid", "unisex"]);

function validateAndCoerceProduct(raw: any) {
    const {
        title, description, inStock, price, slug, gender, sizes, tags
    } = raw;

    // Campos requeridos
    if (!title) throw new Error(`title requerido`);
    if (!description) throw new Error(`description requerido`);
    if (inStock === undefined || inStock === null) throw new Error(`inStock requerido`);
    if (price === undefined || price === null) throw new Error(`price requerido`);
    if (!slug) throw new Error(`slug requerido`);
    if (!gender) throw new Error(`gender requerido`);

    // Tipos
    const _inStock = Number(inStock);
    if (!Number.isInteger(_inStock)) throw new Error(`inStock debe ser Int (recibí: ${inStock})`);

    const _price = Number(price);
    if (!Number.isFinite(_price)) throw new Error(`price debe ser número (recibí: ${price})`);

    // Enum gender
    const _gender = lower(gender);
    if (!GENDER_ENUM.has(_gender)) {
        throw new Error(`gender inválido: "${gender}". Permitidos: ${[...GENDER_ENUM].join(", ")}`);
    }

    // Enum[] size
    const _size: string[] = Array.isArray(sizes) ? sizes.map(upper) : [];
    for (const s of _size) {
        if (!SIZE_ENUM.has(s)) {
            throw new Error(`size inválido: "${s}". Permitidos: ${[...SIZE_ENUM].join(", ")}`);
        }
    }

    // tags -> string[]
    const _tags: string[] = Array.isArray(tags)
        ? tags.map((t) => norm(t))
        : (tags ? [norm(tags)] : []);

    return {
        title: norm(title),
        description: norm(description),
        inStock: _inStock,
        price: _price,
        slug: norm(slug),
        gender: _gender as "men" | "women" | "kid" | "unisex",
        sizes: _size as ("XS" | "S" | "M" | "L" | "XL" | "XXL" | "XXXL")[],
        tags: _tags,
    };
}

async function main() {
    // 1) Limpieza respetando FKs
    await prisma.productImage.deleteMany();
    await prisma.product.deleteMany();
    await prisma.category.deleteMany();

    const { categories, products } = initialData;

    // 2) Categorías
    await prisma.category.createMany({
        data: categories.map((name: string) => ({ name })),
        skipDuplicates: true,
    });

    const categoriesDB = await prisma.category.findMany();
    const categoriesMap = new Map<string, string>(
        categoriesDB.map((c) => [lower(c.name), c.id] as const)
    );

    // 3) Productos + imágenes
    for (const product of products) {
        const { type, images } = product;
        const key = lower(type);
        const categoryId = categoriesMap.get(key);

        if (!categoryId) {
            throw new Error(
                `El "type" "${type}" no coincide con ninguna categoría. ` +
                `Asegúrate de que initialData.categories incluya "${type}" (comparación lowercase/trim).`
            );
        }

        // Validar y transformar el payload al tipo exacto del schema
        const data = validateAndCoerceProduct(product);

        try {
            // Log útil para depurar si vuelve a fallar
            // console.log("Creando producto:", { slug: data.slug, categoryId, gender: data.gender, size: data.size });

            const dbProduct = await prisma.product.create({
                data: { ...data, categoryId },
            });

            if (images?.length) {
                await prisma.productImage.createMany({
                    data: images.map((url: string) => ({ url, productId: dbProduct.id })),
                });
            }
        } catch (err: any) {
            // Prisma envuelve, pero damos contexto del que rompió
            console.error(
                `Fallo creando producto (slug: ${data.slug}):`,
                { data, categoryId }
            );
            throw err; // re-lanzamos para ver el stack de Prisma
        }
    }

    console.log("Seed ejecutado correctamente");
}

(async () => {
    if (process.env.NODE_ENV === "production") return;
    try {
        await main();
    } catch (err) {
        console.error("Error ejecutando el seed:", err);
    } finally {
        await prisma.$disconnect();
    }
})();
