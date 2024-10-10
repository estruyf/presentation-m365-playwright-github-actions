import * as OTPAuth from "otpauth";

const args = process.argv;

const totp = new OTPAuth.TOTP({
  issuer: "Microsoft",
  algorithm: "SHA1",
  digits: 6,
  period: 30,
  secret: args[2],
});

console.log(`OTP Code: ${totp.generate()}`);
