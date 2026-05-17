import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/user.js';
import userConversation from '../models/userConversation.js';
import chat from '../models/chat.js';
import disposableDomains from 'disposable-email-domains/index.json' with { type: 'json' };
const registerNewUser = async (req, res) => {
  //step 1: check if user with the same phone number already exists
  const userExists  = await User.exists({ phoneNumber: req.body.phoneNumber });
  // Extract domain from email
  const domain = req.body?.email?.split('@')[1];
  
  // Check if domain is in the disposable list
  if (disposableDomains.includes(domain)) {
    return res.status(400).json({ 
      message: "Registration failed. Please use a permanent email address." 
    });
  }
  if(userExists){
    return res.status(400).send('Phone number already registered');
  }
  //step 2: hash the password
  req.body.password = await bcrypt.hash(req.body.password, 10);
  req.body.avatar = req.file.filename
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




const addNewChatByUserId = async (req, res) => {
  const user = await  userConversation.create({
    user: req.query.userid,
  })
  res.send('Conversation created for the user')
}



const getAllChatsByUserId = async  (req, res) => {
  const data = await  userConversation.find({
    user: req.query.userId,
  }).select('title')
  res.send(data)
}

const deleteChatsByUserId = async  (req, res) => {
  const data = await  userConversation.findByIdAndDelete(req.params.id)
  res.send(data)
}

const getChatsByConversationId = async  (req, res) => {
  const data = await  chat.find({userConversation: req.params.id}).select('messages')
  console.log(data)
  res.send(data)
}



export  { registerNewUser, loginUser ,getAllUsers, getUserDetailsById, addNewChatByUserId, getAllChatsByUserId,deleteChatsByUserId,getChatsByConversationId}


