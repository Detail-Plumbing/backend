import { ToolModule } from './modules/tool/tool.module'
import { RoleModule } from './modules/role/role.module'
import { UserModule } from './modules/user/user.module'
import { AuthModule } from './modules/auth/auth.module'
import { PrismaModule } from 'src/prisma/prisma.module'
import { ProjectModule } from './modules/project/project.module'
import { AppController } from 'src/app.controller'
import { AuthMiddleware } from 'src/middlewares/auth.middleware'
import { UserController } from './modules/user/user.controller'
import { RoleController } from './modules/role/role.controller'
import { ToolController } from './modules/tool/tool.controller'
import { InventoryModule } from './modules/inventory/inventory.module'
import { ProjectController } from './modules/project/project.controller'
import { TrackingTimeModule } from './modules/trackingtime/trackingtime.module'
import { InventoryController } from './modules/inventory/inventory.controller'
import { TrackingTimeController } from './modules/trackingtime/trackingtime.controller'
import { RequestLoggerMiddleware } from './middlewares/request.logger.middleware'
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common'

@Module({
  imports: [
    AuthModule,
    UserModule,
    RoleModule,
    ToolModule,
    PrismaModule,
    ProjectModule,
    InventoryModule,
    TrackingTimeModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes(
        UserController,
        ToolController,
        RoleController,
        ProjectController,
        InventoryController,
        TrackingTimeController,
      )
    consumer.apply(RequestLoggerMiddleware).forRoutes('*')
  }
}
