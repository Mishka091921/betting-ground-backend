// modules/user/users.swagger.ts
import { applyDecorators } from '@nestjs/common';
import {
  ApiOperation,
  ApiBody,
  ApiCreatedResponse,
  ApiBadRequestResponse,
  ApiOkResponse,
  ApiUnauthorizedResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';

import { CreateUserDto } from './dto/create-user.dto';
import { LoginDto } from './dto/login.dto';

export const SwaggerRegister = () =>
  applyDecorators(
    ApiOperation({ summary: 'Register a new user' }),
    ApiBody({ type: CreateUserDto }),
    ApiCreatedResponse({
      description: 'User successfully registered',
      schema: {
        example: {
          id: '123e4567-e89b-12d3-a456-426614174000',
          username: 'john_doe',
          email: 'john@example.com',
          fullName: 'John Doe',
        },
      },
    }),
    ApiBadRequestResponse({ description: 'Invalid input data' }),
  );

export const SwaggerLogin = () =>
  applyDecorators(
    ApiOperation({ summary: 'User login to get JWT token' }),
    ApiBody({ type: LoginDto }),
    ApiOkResponse({
      description: 'User successfully logged in',
      schema: {
        example: {
          access_token: 'jwt-token-string',
        },
      },
    }),
    ApiUnauthorizedResponse({ description: 'Invalid credentials' }),
  );

export const SwaggerProfile = () =>
  applyDecorators(
    ApiBearerAuth(),
    ApiOperation({ summary: 'Get profile of logged-in user' }),
    ApiOkResponse({
      description: 'User profile returned successfully',
      schema: {
        example: {
          username: 'john_doe',
          email: 'john@example.com',
          fullName: 'John Doe',
        },
      },
    }),
  );

export const SwaggerLogout = () =>
  applyDecorators(
    ApiOperation({ summary: 'Logout user and clear session/token' }),
    ApiOkResponse({ description: 'User logged out successfully' }),
  );

export const SwaggerRefresh = () =>
  applyDecorators(
    ApiOperation({ summary: 'Refresh JWT token' }),
    ApiOkResponse({
      description: 'Token refreshed successfully',
      schema: {
        example: {
          access_token: 'new-jwt-token-string',
        },
      },
    }),
  );

export const SwaggerTestRole = () =>
  applyDecorators(
    ApiBearerAuth(),
    ApiOperation({ summary: 'Test access with role-based authorization' }),
    ApiOkResponse({
      description: 'Role check passed and user data returned',
      schema: {
        example: {
          message: 'Role check passed!',
          user: {
            sub: 'a56a4ea3-ec99-4d39-9cef-xxxx',
            username: 'john_doe',
            roles: ['player'],
          },
        },
      },
    }),
    ApiUnauthorizedResponse({ description: 'Unauthorized or invalid role' }),
  );
