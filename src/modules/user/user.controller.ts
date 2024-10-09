import { Request } from 'express'
import { UserService } from './user.service'
import { ApiBearerAuth } from '@nestjs/swagger'
import { Controller, Get, Req } from '@nestjs/common'

@Controller('/user')
@ApiBearerAuth()
export class UserController {
  constructor(private readonly appService: UserService) {}

  @Get('/')
  getHello(@Req() req: Request): Promise<String> {
    return this.appService.getHello(req.user.userId)
  }
}
