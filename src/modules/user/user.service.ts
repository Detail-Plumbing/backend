import { EditUserDto } from './dto/edit-user.dto'
import { PrismaService } from 'src/prisma/prisma.service'
import { Injectable, NotFoundException } from '@nestjs/common'

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async findUserById(id: number) {
    const user = await this.prisma.user.findUnique({ where: { id } })
    if (!user) throw new NotFoundException('User not found.')

    return user
  }

  async getHello(id: number): Promise<String> {
    const user = await this.findUserById(id)
    return `Hola ${user.name}`
  }

  async editUser(id: number, body: EditUserDto) {
    await this.findUserById(id)
    return await this.prisma.user.update({
      where: { id },
      data: body,
    })
  }

  async searchByName(name: string) {
    return await this.prisma.user.findMany({
      where: {
        OR: [
          {
            name: {
              contains: name.toLowerCase(),
            },
          },
          {
            lastName: {
              contains: name.toLowerCase(),
            },
          },
        ],
      },
      select: {
        id: true,
        name: true,
        email: true,
        avatar: true,
        lastName: true,
        createdAt: true,
      },
    })
  }
}
