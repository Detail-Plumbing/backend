import * as jwt from 'jsonwebtoken'
import * as bcrypt from 'bcrypt'
import { User } from '@prisma/client'
import validator from 'validator'
import { PrismaService } from 'src/prisma/prisma.service'
import { Injectable, HttpException, HttpStatus } from '@nestjs/common'

interface LoginData {
  email: string
  password: string
}

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}

  async findUserByEmail(email: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        email,
      },
    })

    return user
  }

  async userRegister(data: User) {
    const isEmail = validator.isEmail(data.email)
    if (!isEmail) throw new HttpException('Debes colocar un correo válido', HttpStatus.BAD_REQUEST)

    const user = await this.findUserByEmail(data.email)
    if (user) throw new HttpException('Ese correo ya está registrado', HttpStatus.CONFLICT)

    const hashedPassword = await bcrypt.hash(data.password, 10)
    data.password = hashedPassword

    return this.prisma.user.create({
      data,
    })
  }

  async userLogin(data: LoginData) {
    const user = await this.findUserByEmail(data.email)
    if (!user) throw new HttpException('Usuario no encontrado', HttpStatus.NOT_FOUND)

    const isPasswordValid = await bcrypt.compare(data.password, user.password)
    if (!isPasswordValid) throw new HttpException('Contraseña incorrecta', HttpStatus.UNAUTHORIZED)

    const token = jwt.sign({ userId: user.id }, process.env.SECRET_KEY)

    return token
  }

  async loadUserByToken(token: string) {
    let id = -1
    let err = false

    jwt.verify(token, process.env.SECRET_KEY, (error, data: { userId: number }) => {
      if (error) {
        err = true
      } else {
        id = data.userId
      }
    })

    if (id != -1 && !err) {
      return this.prisma.user.findUnique({
        where: {
          id,
        },
      })
    } else {
      throw new HttpException('Token inválido', HttpStatus.UNAUTHORIZED)
    }
  }
}
