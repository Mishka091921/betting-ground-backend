import { CreateUserUseCase } from '../use-cases/create-user.use-case';
import { UserRepository } from '../../domain/user.repository';
import { CreateUserDto } from '../dto/create-user.dto';
import * as bcrypt from 'bcryptjs';

describe('CreateUserUseCase', () => {
  let useCase: CreateUserUseCase;
  let mockUserRepo: jest.Mocked<UserRepository>;

  beforeEach(() => {
    mockUserRepo = {
      create: jest.fn(),
    } as any;

    useCase = new CreateUserUseCase(mockUserRepo);
  });

  it('should hash password and call userRepo.create with player type', async () => {
    const dto: CreateUserDto = {
      username: 'john',
      password: '123456',
      nickname: 'Johnny',
    };

    // Mock return value of create
    mockUserRepo.create.mockResolvedValue({
      id: 1,
      username: dto.username,
      nickname: dto.nickname ?? '',
      password: 'hashedPassword', // expected final password
      type: 'player',
      status: 'active',
      points: 0,
      playerLevel: 1,
      isActive: () => true, // <== ADD THIS
    });

    const result = await useCase.execute(dto);

    // Check that hashed password was generated
    expect(mockUserRepo.create).toHaveBeenCalledWith(
      expect.objectContaining({
        username: dto.username,
        password: expect.any(String),
        type: 'player',
      }),
    );

    // Optional: Verify the password is hashed
    const calledWith = mockUserRepo.create.mock.calls[0][0];
    expect(typeof calledWith.password).toBe('string');

    const isHashed = await bcrypt.compare(dto.password, calledWith.password!);
    expect(isHashed).toBe(true);

    // Check returned result
    expect(result).toHaveProperty('id', 1);
    expect(result.type).toBe('player');
  });
});
