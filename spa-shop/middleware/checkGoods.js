import Goods from "../schemas/goods.js";

export default async (req, res, next) => {
  const { goodsId } = req.params;

  try {
    const goods = await goods.findById(goodsId).exec();
    if (!goods) {
      return res
        .status(404)
        .json({ status: 404, message: "상품이 존재하지 않습니다." });
    }
    next();
  } catch (err) {
    next(err);
  }
};
