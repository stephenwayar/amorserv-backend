import { Response } from "express";
import User from "../models/User";
import { info, error } from "../utils/logger";
import { RequestType } from "../middlewares/tokenExtractor";

const get_user_profile = async (req: RequestType, res: Response) => {
  const { id } = req.params;

  try {
    if (!req.user) {
      info('Token is missing');
      return res.status(401).json({
        error: 'Token missing or invalid'
      });
    }

    const user = await User.findById(id);

    if (!user) {
      error('User not found');
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json(user);
  } catch (error) {
    error('Error while fetching user', error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export { get_user_profile };