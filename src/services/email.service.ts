import { Inject, Injectable } from '@nestjs/common';
import { createTransport, Transporter } from 'nodemailer';

export interface EmailServiceOptions {
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

  constructor(@Inject('EmailServiceOptions') options: EmailServiceOptions) {
    this.postToProvider = options.postToProvider;

    this.transporter = createTransport({
      host: options.mailerHost,
      port: options.mailerPort,
      secure: false,
      auth: {
        user: options.mailerUser,
        pass: options.senderEmailPassword,
      },
      debug: true,
      logger: true,
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
      await this.transporter.sendMail(mailOptions);
      return true;
    } catch (error) {
      return false;
    }
  }
}
