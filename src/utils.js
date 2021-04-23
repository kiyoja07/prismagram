require("dotenv").config();

import { adjectives, nouns } from "./words";
import nodemailer from "nodemailer";
import mgTransport from "nodemailer-mailgun-transport";
import jwt from "jsonwebtoken";

export const generateSecret = () => {
  const randomNumber = Math.floor(Math.random() * adjectives.length);
  return `${adjectives[randomNumber]} ${nouns[randomNumber]}`;
};

const sendMail = (email) => {
  console.log(process.env.MAILGUN_API);
  const options = {
    auth: {
      domain: process.env.MAILGUN_DOMAIN,
      api_key: process.env.MAILGUN_API,
    },
  };
  const clinet = nodemailer.createTransport(mgTransport(options));
  return clinet.sendMail(email);
};

export const sendSecretMail = (address, secret) => {
  const email = {
    from: process.env.MAILGUN_VERIFIED_EMAIL,
    to: address,
    subject: "🔒Login Secret for Prismagram🔒",
    html: `Hello! Your login secret is <strong>${secret}</strong>.<br/>Copy paste on the app/website to log in`,
  };
  return sendMail(email);
};

export const generateToken = (id) => jwt.sign({ id }, process.env.JWT_SECRET);
