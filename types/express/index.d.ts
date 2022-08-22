import express from "express";

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      // NODE_ENV: 'development' | 'production';
      // PORT?: string;
      MONGO_URL: string;
      PASS_SEC: string;
      JWT_SEC: string;
    }
  }
  // Record<string, any>;
  namespace Express {
    interface Request {
      user: string | jwt.JwtPayload;
      // | undefined
      // | {
      //     id: string;
      //     isAdmin: boolean;
      //   };
    }
  }
}

// If this file has no import/export statements (i.e. is a script)
// convert it into a module by adding an empty export statement.
export {};
