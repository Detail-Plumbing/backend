import { AppService } from 'src/services/app.service'
import { AuthModule } from './auth.module'
import { PrismaModule } from 'src/prisma/prisma.module'
import { AppController } from 'src/controllers/app.controller'
import { AuthMiddleware } from 'src/middlewares/auth.middleware'
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common'

@Module({
  imports: [PrismaModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes(AppController)
  }
}
