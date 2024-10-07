import { PrismaClient } from '@prisma/client'
import { Injectable, OnModuleInit } from '@nestjs/common'

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect()
      .then(() => {
        console.log('Conectado correctamente a MySQL')
      })
      .catch(() => {
        console.log('Error al conectar con MySQL')
      })
  }
}
