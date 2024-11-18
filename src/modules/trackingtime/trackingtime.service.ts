import { PrismaService } from 'src/prisma/prisma.service'
import { GetWorkTimeDto } from './dto/get-work-time.dto'
import { Injectable, NotFoundException } from '@nestjs/common'

type Interval = GetWorkTimeDto['interval']

@Injectable()
export class TrackingTimeService {
  constructor(private prisma: PrismaService) {}

  async startWorkDay(userId: number): Promise<void> {
    /* Buscamos el dia de trabajo mas reciente de un usuario que no tenga fecha de finalizacion*/
    const existingWorkingDay = await this.prisma.workingDay.findFirst({
      where: {
        userId,
        endTime: null,
      },
      orderBy: {
        startTime: 'desc',
      },
    })

    if (existingWorkingDay) {
      /* Si existe actualizamos su fecha de finalizacion  */
      await this.prisma.workingDay.update({
        where: {
          id: existingWorkingDay.id,
        },
        data: {
          endTime: new Date(),
        },
      })
    } else {
      /* Caso contrario creamos el dia de trabajo */
      await this.prisma.workingDay.create({
        data: {
          userId,
          startTime: new Date(),
        },
      })
    }
  }

  private async getUserWithWorkingDays(userId: number, interval: Interval) {
    const { startDate, endDate } = this.getIntervalDates(interval)

    const userWithWorkingDays = await this.prisma.user.findUnique({
      where: { id: userId },
      include: {
        workingDay: {
          where: {
            startTime: {
              gte: startDate,
              lte: endDate,
            },
          },
        },
      },
    })

    if (!userWithWorkingDays) throw new NotFoundException('User does not have work time')
    return userWithWorkingDays
  }

  async getMyWorkTime(userId: number, interval: Interval): Promise<any | null> {
    const userWithWorkingDays = await this.getUserWithWorkingDays(userId, interval)
    return this.calculateTotalTime(userWithWorkingDays)
  }

  async getUsersWorkTime(interval: Interval): Promise<any[]> {
    const { startDate, endDate } = this.getIntervalDates(interval)

    const usersWithWorkingDays = await this.prisma.user.findMany({
      include: {
        workingDay: {
          where: {
            startTime: {
              gte: startDate,
              lte: endDate,
            },
          },
        },
      },
    })

    if (usersWithWorkingDays.length === 0)
      throw new NotFoundException('Users does not have work time')

    return usersWithWorkingDays.map((user) => this.calculateTotalTime(user))
  }

  async getWorkTimePerWeekByUserId(userId: number): Promise<any | null> {
    const userWithWorkingDays = await this.getUserWithWorkingDays(userId, 'week')
    return this.calculateMonthlyTime(userWithWorkingDays.workingDay)
  }

  private calculateMonthlyTime(workingDays: Array<{ startTime: Date; endTime: Date | null }>): {
    [key: string]: { hours: number; minutes: number; seconds: number }
  } {
    const weeklyTime = {
      week_1: { hours: 0, minutes: 0, seconds: 0 },
      week_2: { hours: 0, minutes: 0, seconds: 0 },
      week_3: { hours: 0, minutes: 0, seconds: 0 },
      week_4: { hours: 0, minutes: 0, seconds: 0 },
    }

    if (workingDays.length === 0) return weeklyTime

    workingDays.forEach((workingDay) => {
      const startTime = new Date(workingDay.startTime)
      const endTime = workingDay.endTime ? new Date(workingDay.endTime) : new Date()
      const totalSeconds = Math.floor((endTime.getTime() - startTime.getTime()) / 1000)

      const weekNumber = this.getWeekNumber(startTime)
      const currentWeek = `week_${weekNumber}`

      if (weeklyTime[currentWeek]) {
        weeklyTime[currentWeek].seconds += totalSeconds
      } else {
        console.warn(`Invalid week number: ${currentWeek}`)
      }
    })

    Object.keys(weeklyTime).forEach((week) => {
      const totalSeconds = weeklyTime[week].seconds
      weeklyTime[week].hours = Math.floor(totalSeconds / 3600)
      weeklyTime[week].minutes = Math.floor((totalSeconds % 3600) / 60)
      weeklyTime[week].seconds = totalSeconds % 60
    })

    return weeklyTime
  }

  private getWeekNumber(date: Date): number {
    const firstDayOfMonth = new Date(date.getFullYear(), date.getMonth(), 1)
    const dayOfMonth = date.getDate()
    const firstWeekDay = firstDayOfMonth.getDay()

    const weekNumber = Math.ceil((dayOfMonth + firstWeekDay) / 7)
    return weekNumber > 4 ? 4 : weekNumber
  }

  private calculateTotalTime(user: {
    id: number
    name: string
    workingDay: Array<{ startTime: Date; endTime: Date | null }>
  }) {
    const totalTimeInMs = user.workingDay.reduce((acc, workingDay) => {
      const endTime = workingDay.endTime ? new Date(workingDay.endTime) : new Date()
      const startTime = new Date(workingDay.startTime)
      return acc + (endTime.getTime() - startTime.getTime())
    }, 0)

    return this.convertMsToTime(totalTimeInMs, user.id, user.name)
  }

  private convertMsToTime(totalTimeInMs: number, userId: number, username: string) {
    const totalSeconds = Math.floor(totalTimeInMs / 1000)
    const hours = Math.floor(totalSeconds / 3600)
    const minutes = Math.floor((totalSeconds % 3600) / 60)
    const seconds = totalSeconds % 60

    return {
      userId,
      username,
      totalTimeWorked: {
        hours,
        minutes,
        seconds,
      },
    }
  }

  private getIntervalDates(interval: Interval) {
    const now = new Date()
    let startDate: Date

    switch (interval) {
      case 'today':
        startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate())
        break
      case 'week':
        startDate = new Date(now)
        startDate.setDate(now.getDate() - now.getDay())
        break
      case 'month':
        startDate = new Date(now.getFullYear(), now.getMonth(), 1)
        break
      case 'year':
        startDate = new Date(now.getFullYear(), 0, 1)
        break
      default:
        throw new Error('Intervalo no válido')
    }

    return { startDate, endDate: now }
  }
}
