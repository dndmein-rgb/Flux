import express from 'express';
import { followUnFollowUser, getSuggestedUsers, getUserProfile, loginUser, logoutUser, signUpUser, updateUser,freezeAccount } from '../controllers/userController.js';
import { protectRoute } from '../middleware/protectRoute.js';

const router=express.Router();

router.get('/profile/:query',getUserProfile)
router.get('/suggested', protectRoute, getSuggestedUsers)
router.post('/signup',signUpUser)
router.post('/login', loginUser)
router.post('/logout', logoutUser)
router.post('/follow/:id',protectRoute,followUnFollowUser);
router.put('/update/:id',protectRoute,updateUser);
router.put('/freeze',protectRoute,freezeAccount);


export default router;