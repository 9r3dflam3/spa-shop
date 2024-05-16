// /routes/goods.js

import express from "express";
import Goods from "../schemas/goods.js";

// Express.js의 라우터를 생성합니다.
const router = express.Router();

/** 상품 등록 **/
// localhost:3000/api/goods POST
router.post("/goods", async (req, res) => {
  const { goodsId, name, goodsExp, manager, goodsStat, password } = req.body;

  const goods = await Goods.find({ goodsId }).exec();
  if (goods.length) {
    return res
      .status(400)
      .json({ success: false, errorMessage: "이미 존재하는 데이터입니다." });
  }

  const createdGoods = await Goods.create({
    goodsId,
    name,
    goodsExp,
    manager,
    goodsStat,
    password,
    uploadTime: new Date(),
    updateTime: null,
  });
  await goods.save();

  const goodsData = JSON.parse(JSON.stringify(goods));
  delete goodsData.password;

  return res
    .status(201)
    .json({ status: 201, message: "상품 등록 완료", data: goodsData });
});

export default router;
