// /schemas/goods.js

import Joi from "joi";
import mongoose from "mongoose";

// 상품(goods)에 대한 정보를 나타내는 스키마를 정의합니다.
const goodsSchema = new mongoose.Schema({
  goodsId: {
    type: Number,
    required: true,
    unique: true,
  },
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
    type: String,
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

export const modifySchema = Joi.object({
  name: Joi.string().min(2).messages({
    "string.base": "상품 이름은 숫자로만 이뤄질 수 없습니다.",
    "string.min": "상품 이름은 2글자보다 작을 수 없습니다.",
  }),
  goodsExp: Joi.string().min(15).max(300).messages({
    "string.base": "상품 설명은 숫자로만 이뤄질 수 없습니다.",
    "string.min": "상품 설명은 최소 15글자 이상 작성해주세요.",
    "string.max": "상품 설명은 최대 300글자까지 작성할 수 있습니다.",
  }),
  manager: string().min(1).max(10).messages({
    "string.base": "판매자 이름은 숫자로만 이뤄질 수 없습니다.",
    "string.min": "판매자 이름은 1글자보다 작을 수 없습니다.",
    "string.max": "판매자 이름은 10글자를 초과할 수 없습니다.",
  }),
  password: Joi.number().required().min(8).max(16).messages({
    "number.base": "비밀번호는 숫자로만 구성할 수 있습니다.",
    "number.empty": "비밀번호를 입력해주세요.",
    "any.required": "비밀번호를 입력해주세요.",
    "number.min": "비밀번호는 최소 8글자로 구성해주세요.",
    "number.max": "비밀번호는 최대 16글자로 구성해주세요.",
  }),
  goodsStat: string().valid("FOR_SALE", "SOLD_OUT").messages({
    "string.base":
      "상품의 판매 상태는 [FOR_SALE, SOLD_OUT] 중 하나로만 입력해주세요.",
    "any.only":
      "상품의 판매 상태는 [FOR_SALE, SOLD_OUT] 중 하나로만 입력해주세요.",
  }),
});

export const deleteSchema = Joi.object({
  password: Joi.number().required().messages({
    "number.base": "비밀번호는 숫자로만 구성할 수 있습니다.",
    "number.empty": "비밀번호를 입력해주세요.",
    "any.required": "비밀번호를 입력해주세요.",
    "number.min": "비밀번호는 최소 8글자로 구성해주세요.",
    "number.max": "비밀번호는 최대 16글자로 구성해주세요.",
  }),
});

// 위에서 정의한 스키마를 이용하여 'Goods'라는 이름의 모델을 생성합니다.
export default mongoose.model("Goods", goodsSchema);
