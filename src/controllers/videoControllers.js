import sequelize from "../models/connect.js";
import initModels from "../models/init-models.js";
import { Sequelize } from "sequelize";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const Op = Sequelize.Op;
const conn = initModels(sequelize);

const getVideo = async (req, res) => {
  let { page, size } = req.params;
  let { videoName } = req.query;
  let num_page = Number(page);
  let num_size = Number(size);
  let index = (num_page - 1) * num_size;
  try {
    // let data = await conn.video.findAll({
    //     include: [{
    //         model: conn.video_like,
    //         required: true, // inner join
    //         include: [{
    //             model: conn.users,
    //             required: true
    //         }]
    //     }]
    // });
    // let data = await conn.video_like.findAll({
    //     include: ["video"]
    // })
    if (!videoName) {
      videoName = "";
    }
    // let data = await conn.video.findAll({
    //   where: {
    //     video_name: {
    //       [Op.like]: `%${videoName}%`,
    //     },
    //   },
    //   limit: num_size, //giới hạn số lượng data cần lấy
    //   offset: index, // lấy data từ vị trí thứ index
    // });
    // prisma
    // skip <==> offset
    // take <===> limit
    // findMany (prisma) <===> findAll (sequelize)
    let data = await prisma.video.findMany({
      // where: {
      //   video_name: {
      //     contains: videoName,
      //   },
      // },
      skip: index,
      take: num_size,
    });

    res.send(data);
  } catch (error) {
    res.send(`BE error: ${error}`);
  }
};
const createVideo = async (req, res) => {
  try {
    let { video_name, thumbnail, description, user_id, type_id } = req.body;
    let newData = {
      video_name,
      thumbnail,
      description,
      user_id,
      type_id,
    };

    // await conn.video.create(newData);
    await prisma.video.create({
      data: newData,
    });
    res.send("Create video successful");
  } catch (error) {
    res.send(`BE error: ${error}`);
  }
};

const deleteVideo = async (req, res) => {
  try {
    let { videoId } = req.params;
    // await conn.video.destroy({
    //   where: {
    //     video_id: videoId,
    //   },
    // });
    // res.send("Delete video successfull!");
    // prisma
    await prisma.video.update({
      where: {
        video_id: +videoId, // ép kiểu string => number
      },
      data: updateData,
    });
    res.send("Update video successfull!");
  } catch (error) {
    res.send(`BE error: ${error}`);
  }
};
export { getVideo, createVideo, deleteVideo };
