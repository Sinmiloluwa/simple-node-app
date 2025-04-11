import jwt from "jsonwebtoken";

export function verifyUser(req: any, res: any, next: any) {
  const token = req.headers["authorization"]?.split(" ")[1];
  const secret = process.env.JWT_CONSTANT as string;
  if (!token) {
    return res.status(401).json({status: false, message: "Unauthorized"});
  }
  
  return new Promise((resolve, reject) => {
    jwt.verify(token, secret, (err: any, decoded: unknown) => {
      if (err) {
        return res.status(401).json({status: false, message: "Unauthorized"});
      }
      req.user = decoded;
      next();
    });
  });
}