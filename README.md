# Descripcion


```=```

# Ejecutar en Dev

1. Clonar el repositorio
2. Crear una copia de ```.env.template```' y renombrarlo a ```.env``` y cambiar las variables de entorno
2. Instalar dependencias ``` npm install ```
3. Levantar la BDD ``` docker compose up -d ```
4. Ejecutar migraciones de Prisma ``` npx prisma migrate dev```
4. Correr el proyecto  ``` npm run dev ```



## Instalar prisma

```npx prisma init --datasource-provider PostgreSQL```


## Ejecutar en produccion
