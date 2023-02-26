import jsonwebtoken, { Secret } from 'jsonwebtoken';
import { JwtPayload } from '../interfaces/types';

const JWT_SECRET: Secret = process.env.JWT_SECRET || 'helloWorld';
const tokenSign = (id: number) => {
  console.log(JWT_SECRET);
  const sign = jsonwebtoken.sign(
    {
      id,
    },
    JWT_SECRET,
    {
      expiresIn: '2h',
    }
  );

  return sign;
};
const verifyToken = (tokenJwt: string) => {
  try {
    const tokenVerify = jsonwebtoken.verify(tokenJwt, JWT_SECRET) as JwtPayload;
    return tokenVerify;
  } catch (error) {
    return { id: null };
  }
};

export { verifyToken, tokenSign };
