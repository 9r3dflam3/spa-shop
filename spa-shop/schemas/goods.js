// /schemas/goods.js

import mongoose from "mongoose";

// 상품(goods)에 대한 정보를 나타내는 스키마를 정의합니다.
const goodsSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  goodsExp: {
    type: String, // 상품 설명
    required: true,
  },
  manager: {
    type: String, // 상품 관리자
    required: true,
  },
  goodsStat: {
    type: String, // 상품의 판매 상황
    required: true,
  },
  passward: {
    type: Number,
    required: true,
  },
  uploadTime: {
    type: Date,
    required: false,
  },
  modifyTime: {
    type: Date,
    required: false,
  },
});

// 위에서 정의한 스키마를 이용하여 'Goods'라는 이름의 모델을 생성합니다.
export default mongoose.model("Goods", goodsSchema);
