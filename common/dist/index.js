"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateBlog = exports.CreateBlog = exports.SignInInput = exports.SignUpInput = void 0;
const zod_1 = require("zod");
//define SignUpInput ___________________________________________________________
exports.SignUpInput = zod_1.z.object({
    name: zod_1.z.string(),
    username: zod_1.z.string().email(),
    password: zod_1.z.string().min(6),
});
exports.SignInInput = zod_1.z.object({
    username: zod_1.z.string().email(),
    password: zod_1.z.string().min(6),
});
// define create blog  ___________________________________________________________
exports.CreateBlog = zod_1.z.object({
    title: zod_1.z.string(),
    content: zod_1.z.string(),
});
// define Update blog  ___________________________________________________________
exports.UpdateBlog = zod_1.z.object({
    title: zod_1.z.string(),
    content: zod_1.z.string(),
});
