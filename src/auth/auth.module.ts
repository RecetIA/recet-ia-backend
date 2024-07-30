import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { User, UserSchema } from 'src/data/schemas/user.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { EmailService } from 'src/email/email.service';

@Module({
	imports: [
		MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
	],
	controllers: [AuthController],
	providers: [AuthService, EmailService],
})
export class AuthModule {}
