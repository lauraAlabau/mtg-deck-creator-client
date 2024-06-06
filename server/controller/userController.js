import express from 'express'
import { UserModel } from '../models/User.js'
import { validationResult } from 'express-validator'
import bcrypt from 'bcrypt'

const Register = async (req, res) => {
  const errors = validationResult(req)

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }

  const { name, email, password } = req.body

  try {
    const userExist = await UserModel.findOne({ email })

    if (userExist) {
      return res.status(400).json({
        errors: [{ msg: "User already exists" }],
      })
    }

    const hashPassword = await bcrypt.hash(password, 10)
    const newUser = new UserModel({ name, email, password: hashPassword })
    const result = await newUser.save()

    result._doc.password = undefined

    return res.status(201).json({ success: true, ...result._doc })
  } catch (err) {
    console.log(err)
    return res.status(500).json({ error: err.message })
  }

}

export { Register }