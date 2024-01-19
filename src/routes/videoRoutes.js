import express from "express";
import {
  createVideo,
  deleteVideo,
  getVideo,
} from "../controllers/videoControllers.js";
import jwt from "jsonwebtoken";

import initModels from "../models/init-models.js";
import sequelize from "../models/connect.js";

const conn = initModels(sequelize);

const videoRoutes = express.Router();

const checkToken = (token) => {
  return jwt.verify(token, "NODE38", (err, decodedToken) => {
    if (err) {
      return {
        statusCode: 401,
        message: "Invalid token",
      };
    } else {
      return {
        statusCode: 200,
        data: decodedToken,
      };
    }
  });
};

const verifyToken = async (req, res, next) => {
  // B1: check token có trong request => lấy từ header
  let { token } = req.headers;
  if (!token) {
    res.status(401).send("Token is invalid");
    return;
  }
  // verify token có đúng format
  let isValidToken = checkToken(token);
  if (isValidToken.statusCode == 401) {
    res.staus(401).send(isValidToken.message);
    return;
  }
  // check user có trong db hay không
  let { user_id } = isValidToken.data.data;

  let data = await conn.users.findOne({
    where: {
      user_id,
    },
  });
  if (!data) {
    res.status(401).send("Invalid token");
    return;
  }

  next(); //bypass => phải có để req vào dc controller, nếu ko thì ko pass dc
};

videoRoutes.get("/get-video/:page/:size", verifyToken, getVideo); // define API get-video có method là GET
videoRoutes.post("/create-video", verifyToken, createVideo);
videoRoutes.delete("/delete-video/:videoId", verifyToken, deleteVideo);

export default videoRoutes;
