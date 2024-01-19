// express, mysql2, sequelize, sequelize-auto, nodemon, cors
// npm i express mysql2 sequelize sequelize-auto nodemon cors
import express from "express";
import rootRoutes from "./src/routes/rootRoutes.js";
import cors from "cors";

const app = express();
const port = 8081;

app.use(express.json()); // middleware parse body string => body json
app.use(express.static(".")); // middleware để xác định nơi lưu file
app.use(cors()); // cho tất cả các request (FE) từ bên ngoài vào để tương tác vs BE
app.use(rootRoutes);

app.get("/", (req, res) => {
  res.send("Hello node38 youtube");
});

app.listen(port, () => {
  console.log(`BE starting with port ${port}`);
});
// npm install cloudinary multer multer-storage-cloudinary
// cloudinary -> lib giúp mình tương tác vs cloudinary server
// multer -> lib giúp mình lấy dc file từ local
// multer-storage-cloudinary -> lib trung gian giúp mình upload file từ local lên cloudinary server
// npm i prisma @prisma/client
// prisma -> ORM
// prisma/client -> lib giúp mình tương tác vs DB thông qua prisma
