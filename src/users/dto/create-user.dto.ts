import {
  IsString,
  IsNotEmpty,
  MinLength,
  isNotEmpty,
  isString,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  password: string;
}

export class UserDto {
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  id: number;
}
