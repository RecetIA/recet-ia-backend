import { Module, Global } from '@nestjs/common';
import { EmailService } from './email.service';
import { envs } from 'src/config/envs';

@Global()
@Module({
	providers: [
		{
			provide: EmailService,
			useFactory: () => {
				const emailServiceOptions = {
					mailerHost: envs.MAILER_HOST,
					mailerPort: envs.MAILER_PORT,
					mailerUser: envs.MAILER_EMAIL,
					senderEmailPassword: envs.MAILER_SECRET_KEY,
					postToProvider: envs.SEND_EMAIL,
				};

				return new EmailService(emailServiceOptions);
			},
		},
	],
	exports: [EmailService],
})
export class EmailModule {}
