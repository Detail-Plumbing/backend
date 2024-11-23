import { Request } from 'express'
import { EditUserDto } from './dto/edit-user.dto'
import { UserService } from './user.service'
import { SearchUserDto } from './dto/search-user.dto'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'
import { Body, Controller, Get, Put, Query, Req } from '@nestjs/common'

@ApiTags('user')
@Controller('/user')
@ApiBearerAuth()
export class UserController {
  constructor(private readonly appService: UserService) { }

  @Get('/')
  getHello(@Req() req: Request): Promise<String> {
    return this.appService.getHello(req.user.userId)
  }

  @Put('/edit')
  editUser(@Req() req: Request, @Body() body: EditUserDto) {
    return this.appService.editUser(req.user.userId, body)
  }

  @Get('/search-user-by-name')
  searchByName(@Query() query: SearchUserDto) {
    return this.appService.searchByName(query.name)
  }
}
