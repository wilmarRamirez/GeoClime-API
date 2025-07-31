import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function server() {
  try {
    // Usa una variable de entorno para el puerto, con un valor por defecto en caso de que no esté definida
    const PORT = process.env.PORT || 4000;

    // Crea la aplicación
    const app = await NestFactory.create(AppModule);

    // Inicia el servidor y escucha en el puerto especificado
    await app.listen(PORT);

    // Mensaje de confirmación en la consola
    console.log(`server listening on port: ${PORT}`);
  } catch (error) {
    // Muestra el error si algo falla en el arranque del servidor
    console.error('Error starting server', error);
    process.exit(1); // Termina el proceso en caso de error grave
  }
}
server();
