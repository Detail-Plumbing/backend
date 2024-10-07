import { Module } from '@nestjs/common'
import { AuthService } from 'src/services/auth.service'
import { PrismaModule } from 'src/prisma/prisma.module'
import { AuthController } from 'src/controllers/auth.controller'

@Module({
  imports: [PrismaModule],
  providers: [AuthService],
  controllers: [AuthController],
})
export class AuthModule { }
