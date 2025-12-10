import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class EmailService {
  private transporter: nodemailer.Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_APP_PASSWORD,
      },
    });
  }

  enviarCorreo(to: string, subject: string, html: string) {
    return this.transporter.sendMail({
      from: process.env.MAIL_USER,
      to,
      subject,
      html,
    });
  }
}
