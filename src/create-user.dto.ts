import { IsEmail } from 'class-validator';

export class CreateUserDto {
  @IsEmail({}, { message: 'فرمت ایمیل معتبر نیست' })
  email: string;
}
