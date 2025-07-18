// modules/user/domain/user.entity.ts
export class UserEntity {
  constructor(
    public readonly id: number,
    public readonly username: string,
    public readonly nickname: string,
    public readonly password: string,
    public readonly type: 'admin' | 'player' | 'developer'| 'general_admin' | 'super_admin',
    public readonly status: 'active' | 'pending' | 'suspended',
    public readonly points: number,
    public readonly playerLevel: number,
  ) {}

  isActive(): boolean {
    return this.status === 'active';
  }
}
