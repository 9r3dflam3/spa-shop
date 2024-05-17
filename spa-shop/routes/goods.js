// /routes/goods.js

import express from "express";
import Goods from "../schemas/goods.js";
import { createGoods, modifyGoods, deleteGoods } from "../schemas/joi.goods.js";
import checkGoods from "../middleware/checkGoods.js";

// Express.js의 라우터를 생성합니다.
const router = express.Router();

/** 상품 등록 **/
// localhost:3000/api/goods POST
router.post("/goods", checkGoods, async (req, res, next) => {
  try {
    const validation = await createGoods.validateAsync(req.body);

    const { name, goodsExp, manager, goodsStat, password } = validation;

    const goodsFind = await Goods.find({ goodsId }).exec();
    if (goodsFind.length !== 0) {
      return res
        .status(400)
        .json({ success: false, errorMessage: "이미 존재하는 데이터입니다." });
    }

    const goods = await Goods.create({
      name,
      goodsExp,
      manager,
      goodsStat,
      password,
      uploadTime: new Date(),
      modifyTime: null,
    });
    await goods.save();

    const goodsData = JSON.parse(JSON.stringify(goods));
    delete goodsData.password;

    return res
      .status(201)
      .json({ status: 201, message: "상품 등록 완료", data: goodsData });
  } catch (err) {
    next(err);
  }
});

router.get("/goods", async (req, res) => {
  const goodsList = await Goods.find({}, { password: 0 })
    .sort("-uploadTime")
    .exec();

  return res
    .status(200)
    .json({ status: 200, message: "상품 목록 조회 완료", data: goodsList });
});

router.get("/goods/:goodsId", checkGoods, async (req, res) => {
  const { goodsId } = req.params;

  const goods = await goods.findById(goodsId, { password: 0 }).exec();

  return res
    .status(200)
    .json({ status: 200, message: "상품 상세 조회 완료", data: goods });
});

router.patch("/goods/:goodsId", checkGoods, async (req, res, next) => {
  try {
    const { goodsId } = req.params;

    const validation = await modifyGoods.validateAsync(req.body);

    const { name, goodsExp, manager, goodsStat, password } = validation;

    const goods = await Goods.findById(goodsId).exec();

    if (password !== Goods.password) {
      return res.status(401).json({
        status: 401,
        message: `비밀번호가 일치하지 않습니다.
        비밀번호를 확인해주세요.`,
      });
    }

    const goodsFind = await goods.find({ name }).exec();
    if (goodsFind.length !== 0) {
      return res
        .status(400)
        .json({ status: 400, message: "이미 등록된 상품입니다." });
    }

    goods.name = name ? name : goods.name;
    goods.goodsExp = goodsExp ? goodsExp : goods.goodsExp;
    goods.manager = manager ? manager : goods.manager;
    goods.goodsStat = goodsStat ? goodsStat : goods.goodsStat;
    goods.uploadTime = new Date();
    await goods.save();

    const goodsData = JSON.parse(JSON.stringify(goods));
    delete goodsData.password;

    return res
      .status(200)
      .json({ status: 200, message: "상품 수정 완료", data: goodsData });
  } catch (err) {
    next(err);
  }

  router.patch("/goods/:goodsId", checkGoods, async (req, res, next) => {
    try {
      const { goodsId } = req.params;

      const validation = await deleteGoods.validateAsync(req.body);

      const { password } = validation;

      const goods = await Goods.findById(goodsId).exec();

      if (password !== Goods.password) {
        return res.status(401).json({
          status: 401,
          message: `비밀번호가 일치하지 않습니다.
          비밀번호를 확인해주세요.`,
        });
      }
      await goods.deleteOne({ _id: goodsId });

      return res
        .status(200)
        .json({ status: 200, message: "상품 삭제 완료", data: goodsData });
    } catch (err) {
      next(err);
    }
  });
});

export default router;
