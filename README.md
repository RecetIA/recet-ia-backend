# RecetIA - API REST

Backend de proyecto **_RecetIA_** que permite generar recetas con inteligencia artificial en base a los ingredientes especificados.

La base de esta esta _API REST_ está construido con el _SDK_ de _AI_ de _Vercel_ con el modelos de _OpenAI_.

___

## Tecnologías y Bibliotecas:

Para el desarrollo _Frontend_ de esta _App Web_ se usaron principalmente las siguientes tecnologías, bibliotecas y servicios:

### Tecnologías:

- **_NestJS_**
- **_NodeJS_**
- **_ExpressJS_**
- **_TypeScript_**
- **_Docker_**
- **_MongoDB_**

  ![Tecnologias](https://skillicons.dev/icons?i=nestjs,nodejs,express,typescript,docker,mongo)

### Servicios:
- **_[Vercel AI SDK](https://sdk.vercel.ai/)_:** SDK que facilita la creación de apps con IA.
- **_[OpenAI API](https://platform.openai.com/docs/overview)_**: API que ofrece modelos de IA.
- **_[Cloudinary](https://cloudinary.com/)_:** Servicio en la nube para alojar multimedia.
- **_[Railway](https://railway.app/)_:** Servicio en donde se aloja el backend de _NestJS_ y la BD de _MongoDB_

### Bibliotecas:
- **_[Zod](https://zod.dev/)_:** Biblioteca para validar y declarar esquemas
- **_[Nodemailer](https://nodemailer.com/m)_** Biblioteca para enviar emails
- **_[Moongose](https://mongoosejs.com/)_** _ODM_ para manipular base de datos de _MongoDB_

---

### Pasos para levantar backend localmente:

1. Instalar dependencias:
   ```
   npm install
   ```

2. Crear archivo `.env` y configurar las siguientes variables de entorno:
   ```bash
    # Api Key de OpenIA
    OPENAI_API_KEY=
    # Url de conexión de MongoDB
    MONGO_URL=

    # Usuario de BD local de mongo
    MONGO_USER=dev
    # Password de BD local de mongo
    MONGO_PASS=123456

    # Keys de cloudinary
    CLOUDINARY_CLOUD_NAME=
    CLOUDINARY_API_KEY=
    CLOUDINARY_API_SECRET=

    # SEED de JWT para autenticación
    JWT_SEED=

    # Booleano que habilita/deshabilita envío de correo
    SEND_EMAIL=true
    # Host de para envío de emails
    MAILER_HOST=smtp.gmail.com
    # Correo que envía los emails
    MAILER_EMAIL=
    # Puerto para envío de emails
    MAILER_PORT=465
    # Secret Key de email que envía los correos
    MAILER_SECRET_KEY=

    # Dominio o host de frontend que usa este backend
    FRONTEND_URL=
   ```

3. Montar BD de mongo con docker:
    ```
    docker-compose up -d
    ```

4. Ejecutar SEED para poblar la BD con usuarios y recetas de prueba:
    ```
    npm run seed
    ```

5. Correr servidor local de nestJS:
    ```
    npm run start:dev
    ```