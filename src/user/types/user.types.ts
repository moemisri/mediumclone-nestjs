import { UserEntity } from 'src/user/entities/user.entity';

export type UserType = Omit<UserEntity, 'hashPassword'>;
