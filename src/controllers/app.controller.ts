import { Request } from 'express'
import { AppService } from 'src/services/app.service'
import { Controller, Req } from '@nestjs/common'

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  getHello(@Req() req: Request): Promise<String> {
    return this.appService.getHello(req.user.userId)
  }
}
