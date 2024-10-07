import { User } from '@prisma/client'
import { AuthService } from 'src/services/auth.service'
import { Controller, Post, Body, Get, Param } from '@nestjs/common'

@Controller('/auth')
export class AuthController {
  constructor(private readonly appService: AuthService) {}

  @Post('/register')
  register(@Body() data: User) {
    return this.appService.userRegister(data)
  }

  @Post('/login')
  login(@Body() data: User) {
    return this.appService.userLogin(data)
  }

  @Get('/load/profile/:token')
  loadProfile(@Param('token') token: string) {
    return this.appService.loadUserByToken(token)
  }
}
