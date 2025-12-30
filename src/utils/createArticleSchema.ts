import { text } from "stream/consumers";
import z from "zod";

export  const createArticleSchema= z.object({
    title: z.string().min(3).max(200).trim(),
    description: z.string().min(3).trim()
  })
export const registerUserSchema = z.object({
    username: z.string().min(3).max(100).trim(),
    email: z.string().email().max(100).trim(),
    password: z.string().min(6).max(100).trim()
  })
export const loginUserSchema = z.object({
    email: z.string().email().max(100).trim(),
    password: z.string().min(6).max(100).trim()
  })

export const createCommentSchema = z.object({
  text: z.string().min(1).max(500).trim(),
  articleId: z.number().int().positive()
})
export const createPasswordSchema =  z.string().min(6).max(100).trim()
export const updateUserSchema = z.object({
    username: z.string().min(3).max(100).trim().optional(),
    email: z.string().email().max(100).trim().optional(),
    password: z.string().min(6).max(100).trim().optional()
  })