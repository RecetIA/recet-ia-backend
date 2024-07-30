import { Injectable, Logger } from '@nestjs/common';
import nodemailer, { Transporter } from 'nodemailer';

interface EmailServiceOptions {
	mailerHost: string;
	mailerPort: number;
	mailerUser: string;
	senderEmailPassword: string;
	readonly postToProvider: boolean;
}

interface SendMailOptions {
	from: string;
	to: string | string[];
	subject: string;
	htmlBody: string;
	attachments?: Attachment[];
}

interface Attachment {
	filename: string;
	path: string;
}

@Injectable()
export class EmailService {
	private transporter: Transporter;
	private postToProvider: boolean;
	private readonly logger = new Logger(EmailService.name);

	constructor(options: EmailServiceOptions) {
		this.postToProvider = options.postToProvider;

		this.transporter = nodemailer.createTransport({
			host: options.mailerHost,
			port: options.mailerPort,
			secure: true,
			auth: {
				user: options.mailerUser,
				pass: options.senderEmailPassword,
			},
		});
	}

	async sendEmail({
		from,
		to,
		subject,
		htmlBody,
		attachments = [],
	}: SendMailOptions): Promise<boolean> {
		if (!this.postToProvider) return true;

		const mailOptions = {
			from,
			to,
			subject,
			html: htmlBody,
			attachments,
		};

		try {
			const sentInformation = await this.transporter.sendMail(mailOptions);
			this.logger.log(`Email sent successfully: ${sentInformation.response}`);
			return true;
		} catch (error) {
			this.logger.error('Error sending email', error.stack);
			return false;
		}
	}
}
