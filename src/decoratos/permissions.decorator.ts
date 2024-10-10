export const perm = Object.freeze({
  roles: {
    edit: 'EDIT_ROLE',
    create: 'CREATE_ROLE',
    delete: 'DELETE_ROLE',
    addPerm: 'ADD_ROLE_PERMISSION',
    assingUser: 'ASSING_ROLE_USER',
    removeUser: 'REMOVE_ROLE_USER',
    removePerm: 'REMOVE_ROLE_PERMISSION',
  },
  projects: {
    edit: 'EDIT_PROJECT',
    create: 'CREATE_PROJECT',
    delete: 'DELETE_PROJECT',
    addMember: 'ADD_MEMBERS_PROJECT',
    kickMember: 'KICK_MEMBERS_PROJECT',
  },
  advanced: {
    administrator: '*' as const,
  },
} as const)

// Tipo para extraer los valores de cada categoría de permisos
type PermissionCategory = typeof perm
type PermissionValues<T> = T extends Record<string, infer U> ? U : never

// Genera automáticamente el tipo `PermissionType` combinando todas las categorías
export type PermissionType = {
  [K in keyof PermissionCategory]: PermissionValues<PermissionCategory[K]>
}[keyof PermissionCategory]

import { SetMetadata } from '@nestjs/common'
import { ApiOperation } from '@nestjs/swagger'

export const Permissions = (...permissions: PermissionType[]) => {
  // Añade metadata para Swagger
  const permissionDescription = `Required permissions: ${permissions.join(', ')}`
  return (target: any, key: string | symbol, descriptor: PropertyDescriptor) => {
    SetMetadata('permissions', permissions)(target, key, descriptor)
    ApiOperation({ summary: permissionDescription })(target, key, descriptor)
  }
}
