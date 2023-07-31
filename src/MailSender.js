import nodemailer from 'nodemailer';
import config from './utils/config.js';
import fs from 'fs';
import util from 'util';

const readFile = util.promisify(fs.readFile);

class MailSender {
  constructor() {
    this._transporter = nodemailer.createTransport({
      host: config.mail.host,
      port: config.mail.port,
      auth: {
        user: config.mail.user,
        pass: config.mail.password,
      },
    });
  }

  async sendEmail(targetEmail, owner, content) {
    const emailTemplate = await readFile(
      'src/templates/email-template.html',
      'utf8',
    );

    const emailContent = emailTemplate.replace(
      /{{name}}|{{attachmentURL}}/gi,
      (matched) => {
        switch (matched) {
          case '{{name}}':
            return owner.fullname;
          case '{{attachmentURL}}':
            return (
              'data:application/json;base64,' +
              Buffer.from(JSON.stringify(content, null, 2)).toString('base64')
            );
          default:
            return matched;
        }
      },
    );

    const message = {
      from: config.mail.fromAddress,
      to: targetEmail,
      subject: 'Export Playlist',
      html: emailContent,
      attachments: [
        {
          filename: 'playlist.json',
          content,
        },
      ],
    };

    return this._transporter.sendMail(message);
  }
}

export default MailSender;
