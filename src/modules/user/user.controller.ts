import { Request } from 'express'
import { UserService } from './user.service'
import { EditUserDto } from './dto/edit-user.dto'
import { ApiBearerAuth } from '@nestjs/swagger'
import { Body, Controller, Get, Put, Req } from '@nestjs/common'

@Controller('/user')
@ApiBearerAuth()
export class UserController {
  constructor(private readonly appService: UserService) {}

  @Get('/')
  getHello(@Req() req: Request): Promise<String> {
    return this.appService.getHello(req.user.userId)
  }

  @Put('/edit')
  editUser(@Req() req: Request, @Body() body: EditUserDto) {
    return this.appService.editUser(req.user.userId, body)
  }
}
