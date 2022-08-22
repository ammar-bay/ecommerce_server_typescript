import jwt from "jsonwebtoken";

import express, { Request, Response, NextFunction } from "express";

// interface req extends Request {
//   user:
//     | string
//     | jwt.JwtPayload
//     | user
// }

// interface user {
//   id: string;
//   isAdmin: boolean;
// }

const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  const authHeader: string | string[] | undefined = req.headers.token;
  if (authHeader && typeof authHeader === "string") {
    const token = authHeader.split(" ")[1];
    jwt.verify(token, process.env.JWT_SEC || "", (err, user) => {
      if (err) res.status(403).json("Token is not valid!");
      req.user = user;
      next();
    });
  } else {
    return res.status(401).json("You are not authenticated!");
  }
};


const verifyTokenAndAuthorization = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  verifyToken(req, res, () => {
    if (req.user.id === req.params.id || req.user.isAdmin) {
      next();
    } else {
      res.status(403).json("You are not alowed to do that!");
    }
  });
};

const verifyTokenAndAdmin = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  verifyToken(req, res, () => {
    if (req.user.isAdmin) {
      next();
    } else {
      res.status(403).json("You are not alowed to do that!");
    }
  });
};

export { verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin };
