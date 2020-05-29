# -*- coding: UTF-8 -*-

from flask import jsonify, request, Blueprint, redirect, session, request
import smtplib
from email.mime.text import MIMEText
from email.header import Header
from email.utils import formataddr
import random
import datetime
wish_blueprint = Blueprint('wish_blueprint', __name__)


def send_email(email, wish):

    sender = 'wish@luck.com'
    receivers = [email]

    message = MIMEText('玲玲许了一个愿望,内容是：{}'.format(
        wish), 'plain', 'utf-8')
    message['From'] = formataddr(
        (str(Header('玲玲', 'utf-8')), sender))
    message['To'] = formataddr((str(Header(email, 'utf-8')), email))
    message['Subject'] = Header('你收到了玲玲的愿望', 'utf-8')

    try:
        smtpObj = smtplib.SMTP('localhost')
        smtpObj.sendmail(sender, receivers, message.as_string())
    except smtplib.SMTPException as e:
        print(str(e))


@wish_blueprint.route('/wish', methods=['POST'])
def get_wish():
    info = request.get_json()
    send_email("lvjialer@gmail.com", info["wish"])
    return jsonify({'status': "success"})

