// lib/decorators/roles.decorator.ts
import { SetMetadata } from '@nestjs/common';
import { AccountType } from 'src/constants/account-type.enum';

export const ROLES_KEY = 'roles';
export const Roles = (...roles: AccountType[]) => SetMetadata(ROLES_KEY, roles);
