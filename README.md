# Next-js Teslo Shop Ecommerce

Para correr localmente, se necesita la base de datos

```
docker-compose up -d
```

- El -d, significa **detached**

MongoDB URL Local:

```
mongodb://localhost:27017/teslodb
```

## Configurar variables de entorno

Renombrar el archivo **.env.template**

## Llenar base de datos con informacion de pruebas

Llamar:

```
http://localhost:3000/api/seed
```
