import Joi from "joi";

export const CommentSchema = Joi.object({
  comment: Joi.string().trim().required(),
  postId: Joi.string(),
});
