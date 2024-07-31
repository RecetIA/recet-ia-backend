import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';

import { EmailService, EmailServiceOptions } from 'src/services/email.service';
import { User, UserSchema } from 'src/data/schemas/user.schema';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { envs } from 'src/config/envs';
import { AuthGuard } from './guards/auth.guard';

const emailServiceOptions: EmailServiceOptions = {
	mailerHost: envs.MAILER_HOST,
	mailerPort: envs.MAILER_PORT,
	mailerUser: envs.MAILER_EMAIL,
	senderEmailPassword: envs.MAILER_SECRET_KEY,
	postToProvider: envs.SEND_EMAIL,
};
@Module({
	imports: [
		MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
	],
	controllers: [AuthController],
	providers: [
		AuthService,
		{
			provide: 'EmailServiceOptions',
			useValue: emailServiceOptions,
		},
		EmailService,
		AuthGuard,
	],
})
export class AuthModule {}
