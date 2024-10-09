import { UserModule } from './modules/user/user.module'
import { AuthModule } from './modules/auth/auth.module'
import { PrismaModule } from 'src/prisma/prisma.module'
import { AppController } from 'src/app.controller'
import { AuthMiddleware } from 'src/middlewares/auth.middleware'
import { UserController } from './modules/user/user.controller'
import { RequestLoggerMiddleware } from './middlewares/request.logger.middleware'
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common'

@Module({
  imports: [PrismaModule, AuthModule, UserModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes(UserController)
    consumer.apply(RequestLoggerMiddleware).forRoutes('*')
  }
}
