import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/user.js';

const registerNewUser = async (req, res) => {
  //step 1: check if user with the same phone number already exists
  const userExists  = await User.exists({ phoneNumber: req.body.phoneNumber });
  if(userExists){
    return res.status(400).send('Phone number already registered');
  }
  //step 2: hash the password
  req.body.password = await bcrypt.hash(req.body.password, 10);
  //step 3: create the user
  await User.create(req.body)
  res.send('users created')
}

const loginUser=  async (req, res) => {
  //step 1: check if user with the same phone number already exists
  const user  = await User.findOne({ phoneNumber: req.body.phoneNumber });

  if(!user){
    return res.status(400).send('Phone number does not exist');
  }
  //step 2: check if password matches
  const isMatched =  await bcrypt.compare(req.body.password, user.password);
  if(!isMatched){
    return res.status(400).send('Password is invalid');
  }
  const token = jwt.sign({ foo: 'bar' }, 'bgieopsfofoghbu3qniewvcijsdbifbjfkdasbvgjawklsbdijdsnfoisadbnfidsbaifjnkbueie221opw');

  //step 3: send success response
  res.send({msg: 'Login successful',token, user})
}


const getAllUsers = async (req, res) => {
  const users = await User.find();
  res.send(users);
}



const getUserDetailsById = async (req, res) => {
  const user = await User.findById(req.params.id)
  res.send(user);
}




export  { registerNewUser, loginUser ,getAllUsers, getUserDetailsById}


