# Stride & Co. — Backend

Backend de Stride & Co. construido con Node.js y Express (Express Generator).
En esta etapa los endpoints responden con datos mock.

Flujo: `Request → Route → Controller → Response`

## Requisitos

- Node.js 22 o superior
- npm

## Instalación

```bash
git clone <url-del-repositorio>
cd stride-co
npm install
```

## Ejecución

```bash
npm start      # inicia el servidor en http://localhost:3000
npm run dev    # inicia el servidor con recarga automática (supervisor)
```

El puerto se puede cambiar con la variable de entorno `PORT`.

## Calidad de código y pruebas

```bash
npm run lint   # ESLint
npm test       # pruebas automatizadas (Jest + Supertest)
```

## Docker

```bash
docker build -t stride-co .
docker run -p 3000:3000 stride-co
```

## Estructura

```
stride-co/
|-- bin/www
|-- controllers/
|-- routes/
|-- test/
|-- public/
|-- views/
|-- app.js
|-- package.json
|-- eslint.config.js
|-- Dockerfile
|-- .gitignore
`-- README.md
```

## Endpoints

| Método | Ruta          | Descripción  |
| ------ | ------------- | ------------ |
| GET    | `/health`     | Health check |

Cada recurso cuenta con las siguientes operaciones:

| Método | Ruta                 |
| ------ | -------------------- |
| GET    | `/api/<recurso>`     |
| GET    | `/api/<recurso>/:id` |
| POST   | `/api/<recurso>`     |
| PUT    | `/api/<recurso>/:id` |
| DELETE | `/api/<recurso>/:id` |

Recursos: `users`, `roles`, `permissions`, `products`, `variants`, `inventory`, `customers`, `orders`.

Formato de respuesta:

```json
{
  "message": "GET products",
  "data": []
}
```

Errores:

- `404` si la ruta no existe.
- `400` si el cuerpo de la solicitud no es JSON válido.
