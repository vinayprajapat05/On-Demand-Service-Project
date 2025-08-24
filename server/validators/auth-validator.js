const { z } = require("zod");

const loginSchema = z.object({
  email: z
    .string({ required_error: "Email is Required" })
    .trim()
    .email({ message: "Invalid Email" })
    .min(3, { message: "Email must be atleast of three characters" })
    .max(255, { message: "Email must not be more then 255 characters" }),

  password: z
    .string({ required_error: "Password is Required" })
    .min(7, { message: "Password must be atleast of 7 characters" })
    .max(1024, { message: "Password must not be more then 1024 characters" }),
});
//creating an object schema
const signupSchema = loginSchema.extend({
  username: z
    .string({ required_error: "Name is Required" })
    .trim()
    .min(3, { message: "Name must be atleast of three characters" })
    .max(255, { message: "Name must not be more then 255 characters" }),

  phone: z
    .string({ required_error: "Phone is Required" })
    .trim()
    .min(10, { message: "phone must be atleast of 10 characters" })
    .max(20, { message: "phone must not be more then 20 characters" }),
});

module.exports = {signupSchema,loginSchema};
