import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { Express } from "express";
import session from "express-session";
import { scrypt, randomBytes, timingSafeEqual } from "crypto";
import { promisify } from "util";
import { storage } from "./storage";
import { User as SelectUser } from "@shared/schema";
import { sessionStore } from "./db";


declare global {
  namespace Express {
    interface User extends SelectUser {}
  }
}


const scryptAsync = promisify(scrypt);

async function hashPassword(password: string) {
  const salt = randomBytes(16).toString("hex");
  const buf = (await scryptAsync(password, salt, 64)) as Buffer;
  return `${buf.toString("hex")}.${salt}`;
}

async function comparePasswords(supplied: string, stored: string) {
  const [hashed, salt] = stored.split(".");
  const hashedBuf = Buffer.from(hashed, "hex");
  const suppliedBuf = (await scryptAsync(supplied, salt, 64)) as Buffer;
  return timingSafeEqual(hashedBuf, suppliedBuf);
}

export function setupAuth(app: Express) {
  const sessionSecret = process.env.SESSION_SECRET || "local-commerce-secret";
  
  const sessionSettings: session.SessionOptions = {
    secret: sessionSecret,
    resave: false,
    saveUninitialized: false,
    store: sessionStore, // Use the correctly typed session store
    cookie: {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 24 * 60 * 60 * 1000, // 24 hours
    },
  };

  app.set("trust proxy", 1);
  app.use(session(sessionSettings));
  app.use(passport.initialize());
  app.use(passport.session());

  passport.use(
    new LocalStrategy(async (username, password, done) => {
      try {
        const user = await storage.getUserByUsername(username);
        if (!user || !(await comparePasswords(password, user.password))) {
          return done(null, false, { message: "Invalid username or password" });
        }
        return done(null, user);
      } catch (error) {
        return done(error);
      }
    }),
  );

  passport.serializeUser((user, done) => done(null, user.id));
  passport.deserializeUser(async (id: number, done) => {
    try {
      const user = await storage.getUser(id);
      done(null, user);
    } catch (error) {
      done(error);
    }
  });

  app.post("/api/register", async (req, res, next) => {
    try {
      const { 
        username, 
        password, 
        fullName, 
        email, 
        isSeller = false,
        businessName,
        businessDescription,
        businessAddress,
        phoneNumber
      } = req.body;
      
      // Validate required fields
      if (!username || !password || !fullName || !email) {
        return res.status(400).json({ message: "Missing required fields" });
      }
      
      // Additional validation for seller accounts
      if (isSeller && (!businessName || !businessDescription)) {
        return res.status(400).json({ message: "Seller accounts require business name and description" });
      }
      
      // Check if username exists
      const existingUser = await storage.getUserByUsername(username);
      if (existingUser) {
        return res.status(400).json({ message: "Username already exists" });
      }

      const hashedPassword = await hashPassword(password);
      
      // Create user in database
      const user = await storage.createUser({
        username,
        password: hashedPassword,
        fullName,
        email,
        isSeller
      });

      // If user is registering as a seller, create a new shop
      if (isSeller && user) {
        try {
          await storage.createShop({
            name: businessName,
            ownerId: user.id,
            description: businessDescription || '',
            category: 'General',
            address: businessAddress || '',
        
            imageUrl: null,
            lat: null,
            lng: null,
            isOpen: true,
            rating: null,
            distance: null
          });
        } catch (shopError) {
          console.error("Failed to create shop for seller:", shopError);
          // We'll continue with registration even if shop creation fails
        }
      }

      // Remove password from response
      const { password: _, ...userWithoutPassword } = user;
      
      // Log the user in
      req.login(user, (err) => {
        if (err) return next(err);
        res.status(201).json(userWithoutPassword);
      });
    } catch (error) {
      console.error("Registration error:", error);
      next(error);
    }
  });

  app.post("/api/login", (req, res, next) => {
    passport.authenticate("local", (err: Error, user: SelectUser, info: any) => {
      if (err) return next(err);
      if (!user) return res.status(401).json({ message: info.message || "Invalid username or password" });
      
      req.login(user, (err) => {
        if (err) return next(err);
        
        const { password, ...userWithoutPassword } = user;
        res.json(userWithoutPassword);
      });
    })(req, res, next);
  });

  app.post("/api/logout", (req, res, next) => {
    req.logout((err) => {
      if (err) return next(err);
      res.sendStatus(200);
    });
  });

  app.get("/api/user", (req, res) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);
    const { password, ...userWithoutPassword } = req.user;
    res.json(userWithoutPassword);
  });
}
