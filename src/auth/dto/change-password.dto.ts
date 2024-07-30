import { MinLength } from 'class-validator';

export class ChangePasswordDto {
	@MinLength(6)
	password: string;
}
