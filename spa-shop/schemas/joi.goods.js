import Joi from "joi";

export const createGoods = Joi.object({
  name: Joi.string().min(2).messages({
    "string.base": "상품 이름은 숫자로만 이뤄질 수 없습니다.",
    "string.min": "상품 이름은 2글자보다 작을 수 없습니다.",
  }),
  goodsExp: Joi.string().min(15).max(300).messages({
    "string.base": "상품 설명은 숫자로만 이뤄질 수 없습니다.",
    "string.min": "상품 설명은 최소 15글자 이상 작성해주세요.",
    "string.max": "상품 설명은 최대 300글자까지 작성할 수 있습니다.",
  }),
  manager: Joi.string().min(1).max(10).messages({
    "string.base": "판매자 이름은 숫자로만 이뤄질 수 없습니다.",
    "string.min": "판매자 이름은 1글자보다 작을 수 없습니다.",
    "string.max": "판매자 이름은 10글자를 초과할 수 없습니다.",
  }),
  password: Joi.number().required().min(8).messages({
    "number.base": "비밀번호는 숫자로만 구성할 수 있습니다.",
    "number.empty": "비밀번호를 입력해주세요.",
    "any.required": "비밀번호를 입력해주세요.",
    "number.min": "비밀번호는 최소 8글자로 구성해주세요.",
  }),
  goodsStat: Joi.string().valid("FOR_SALE", "SOLD_OUT").messages({
    "string.base":
      "상품의 판매 상태는 [FOR_SALE, SOLD_OUT] 중 하나로만 입력해주세요.",
    "any.only":
      "상품의 판매 상태는 [FOR_SALE, SOLD_OUT] 중 하나로만 입력해주세요.",
  }),
});

export const modifyGoods = Joi.object({
  name: Joi.string().min(2).messages({
    "string.base": "상품 이름은 숫자로만 이뤄질 수 없습니다.",
    "string.min": "상품 이름은 2글자보다 작을 수 없습니다.",
  }),
  goodsExp: Joi.string().min(15).max(300).messages({
    "string.base": "상품 설명은 숫자로만 이뤄질 수 없습니다.",
    "string.min": "상품 설명은 최소 15글자 이상 작성해주세요.",
    "string.max": "상품 설명은 최대 300글자까지 작성할 수 있습니다.",
  }),
  manager: Joi.string().min(1).max(10).messages({
    "string.base": "판매자 이름은 숫자로만 이뤄질 수 없습니다.",
    "string.min": "판매자 이름은 1글자보다 작을 수 없습니다.",
    "string.max": "판매자 이름은 10글자를 초과할 수 없습니다.",
  }),
  password: Joi.number().required().min(8).messages({
    "number.base": "비밀번호는 숫자로만 구성할 수 있습니다.",
    "number.empty": "비밀번호를 입력해주세요.",
    "any.required": "비밀번호를 입력해주세요.",
    "number.min": "비밀번호는 최소 8글자로 구성해주세요.",
  }),
  goodsStat: Joi.string().valid("FOR_SALE", "SOLD_OUT").messages({
    "string.base":
      "상품의 판매 상태는 [FOR_SALE, SOLD_OUT] 중 하나로만 입력해주세요.",
    "any.only":
      "상품의 판매 상태는 [FOR_SALE, SOLD_OUT] 중 하나로만 입력해주세요.",
  }),
});

export const deleteGoods = Joi.object({
  password: Joi.number().required().messages({
    "number.base": "비밀번호는 숫자로만 구성할 수 있습니다.",
    "number.empty": "비밀번호를 입력해주세요.",
    "any.required": "비밀번호를 입력해주세요.",
  }),
});
