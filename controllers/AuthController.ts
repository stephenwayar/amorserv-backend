import bcrypt from "bcryptjs";
import { Request, Response } from "express";
import User from "../models/User";
import jwt from "jsonwebtoken";
import { SECRET } from '../utils/config'

const login_user = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Email or password is incorrect",
      });
    }

    const passwordIsCorrect = await bcrypt.compare(password, user.password);

    if (!passwordIsCorrect) {
      return res.status(401).json({
        success: false,
        message: "Email or password is incorrect",
      });
    }

    const userForToken = {
      email: user.email,
      id: user._id,
    };

    if (!SECRET) {
      throw new Error('SECRET environment variable is not defined');
    }

    const token = jwt.sign(userForToken, SECRET, { expiresIn: '1d' });

    res.status(200).send({
      token,
      email: user.email,
      id: user._id,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

const register_user = async (req: Request, res: Response) => {
  const { fullName, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "There is a user with this email already",
      });
    }

    const newUser = new User({
      fullName,
      email,
      password,
    });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newUser.password, salt);

    newUser.password = hashedPassword;

    await newUser.save();

    res.status(201).end();
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export { login_user, register_user };