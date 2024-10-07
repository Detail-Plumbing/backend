import { config } from 'dotenv'
import { AppModule } from './modules/app.module'
import { ServerMode } from './types/server.mode'
import { NestFactory } from '@nestjs/core'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'

config()
async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true })

  if (process.env.SERVER_MODE === ServerMode.DEV) {
    const config = new DocumentBuilder()
      .setTitle('Swagger')
      .setDescription('The example API description')
      .setVersion('1.0')
      .addTag('cats')
      .build()

    const document = SwaggerModule.createDocument(app, config)
    SwaggerModule.setup('api', app, document)
  }

  await app.listen(process.env.PORT).then(() => {
    console.log('¡Hola mundo! ' + process.env.PORT)
  })
}
bootstrap()
