import jwt from 'jsonwebtoken';
const defaultSecret = process.env.JWT_SECRET;

export const sign = (payload, secret = defaultSecret)=>{
  return jwt.sign(payload, secret);
}

export const verify = (token, secret = defaultSecret)=>{
  return jwt.verify(token, secret);
}
