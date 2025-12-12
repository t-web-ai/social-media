import Joi from "joi";
export const PostSchema = Joi.object({
  content: Joi.string().required(),
  image: Joi.any()
    .allow(null)
    .custom((file, helpers) => {
      if (!file) return file;
      if (typeof file.type !== "string") {
        return helpers.error("file.invalid");
      }
      if (!file.type.startsWith("image/")) {
        return helpers.error("file.invalid");
      }
      return file;
    })
    .messages({
      "file.invalid": "The file must be an image",
    }),
});
