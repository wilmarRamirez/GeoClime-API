# 🌎 GeoClime API

API construida con **NestJS** para registrar temperaturas por zonas y detectar anomalías térmicas según condiciones específicas.

---

## 🚀 Cómo ejecutar el proyecto

### 1. Clonar el repositorio

```bash
git clone https://github.com/tu-usuario/geo-clime-api.git
cd geo-clime-api
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Crear el archivo `.env`

Crea un archivo `.env` en la raíz con el siguiente contenido:

```env
PORT="8000"
JWT_USER="admin"
JWT_PASSWORD="1234"
API_KEY="supersecreta123"
JWT_SECRET="lorem ipsum"
JWT_EXPIRES="1h"
```

> Puedes cambiar el puerto si lo deseas.

### 4. Ejecutar la aplicación en desarrollo

```bash
npm run start:dev
```

### 5. Endpoints disponibles

* `POST /auth/login`: creacion del token.
* `POST /records`: Registra un nuevo dato de temperatura.
* `GET /records`: Retorna todos los registros guardados.
* `GET /zones/:zone/summary`: calculo de termperatura (promedio, mayo, menor, y cantidad)
* `GET /zones/:zone/anomalies`: detecta las anomalias minimo 3 consecutivas

---

## 📆 Estructura del proyecto

```bash
src/
├── application/
│   ├── dto/               # DTOs para validación de datos
│   └── use-cases/         # Casos de uso
├── domain/
│   ├── entities/          # Entidades 
│   └── services/          # services
├── infrastructure/
│   ├── auth/              
│   │     └── strategy/    # validacion y autenticacion de usuarios
│   ├── guards/            # protección de rutas
│   └── repositories/      # Persistencia de datos
├── interface/              
│   └── controller/        # Controladores
├── main.ts                # Punto de entrada de la app
└── app.module.ts          # Módulo principal
```

---

## 🧠 Cómo se abordó la solución

Se construyó una API RESTful modular en NestJS aplicando principios de Clean Architecture:

* Los **Controladores** manejan las rutas y delegan la lógica a los **Casos de Uso**.
* La validación de datos se realiza con `class-validator` y DTOs.
* La lógica de anomalías detecta una secuencia de **al menos 3 registros consecutivos**, donde cada uno sube o baja **al menos 1.5 °C respecto al anterior**.

  * No se considera anomalía si la diferencia es exactamente 1.5 °C.
* Se organiza el código por capas: **aplicación**, **dominio**, **infraestructura**.

---

## 🛠️ Tecnologías utilizadas

* [NestJS](https://nestjs.com/)
* [DTO](https://docs-nestjs-com.translate.goog/techniques/validation?_x_tr_sl=en&_x_tr_tl=es&_x_tr_hl=es&_x_tr_pto=tc&_x_tr_hist=true)
* [class-validator](https://github.com/typestack/class-validator)
* [Node.js](https://nodejs.org/)


---

## 📄 Licencia

MIT © 2025 — \[Tu Nombre o Empresa]
