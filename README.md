# chaos-example

Proyecto backend serverless en AWS utilizando Lambda, API Gateway y Terraform. Este proyecto define dos endpoints (`GET /users` y `POST /users/save`) implementados en TypeScript usando arquitectura modular, RxJS para control de flujo y InversifyJS para inyección de dependencias.

---

## 📦 Tecnologías y Librerías Usadas

### Backend (TypeScript)

- [TypeScript](https://www.typescriptlang.org/)
- [AWS Lambda](https://docs.aws.amazon.com/lambda/latest/dg/welcome.html)
- [RxJS](https://rxjs.dev/) – Control de flujo reactivo
- [InversifyJS](https://inversify.io/) – Inyección de dependencias
- [reflect-metadata](https://www.npmjs.com/package/reflect-metadata) – Requisito de Inversify
- [Middy](https://middy.js.org/) – Framework middleware para Lambda:
    - [@middy/core](https://www.npmjs.com/package/@middy/core)
    - [@middy/http-json-body-parser](https://www.npmjs.com/package/@middy/http-json-body-parser)
    - [@middy/http-error-handler](https://www.npmjs.com/package/@middy/http-error-handler)
    - [@middy/http-response-serializer](https://www.npmjs.com/package/@middy/http-response-serializer)

### Infraestructura (Terraform)

- [Terraform AWS Provider](https://registry.terraform.io/providers/hashicorp/aws/latest/docs)
- Recursos usados:
    - `aws_lambda_function`
    - `aws_api_gateway_rest_api`
    - `aws_api_gateway_resource`
    - `aws_api_gateway_method`
    - `aws_api_gateway_integration`
    - `aws_lambda_permission`
    - `aws_iam_role`

---

## 🔧 Endpoints REST

### 🟦 `GET /users`

- **Descripción:** Busca usuarios mediante parámetros query.
- **Ruta:** `/test/users`
- **Query params opcionales:**
    - `name`
    - `address`
    - `city`


---

### 🟨 `POST /users/save`

- **Descripción:** Guarda un usuario nuevo.
- **Ruta:** `/test/users/save`
- **Headers requeridos:**
- **Body ejemplo:**
```json
{
  "name": "Jean",
  "email": "jean@example.com",
  "..": "..."
}
```
###  `TERRAFORM`

- **Crear Archivo Entorno:** 

`/resources/dist/..environment.json`
```json
{
  "PLACE_HOLDER_API": "https://jsonplaceholder.typicode.com/users"
}
```
- **Ejecutar terraform (revisar documentacion para installacion)**

```
terraform init
npm run compile
terraform apply
```

###  `BUENAS PRACTICAS`
```
npm run test:coverage (100)
```

