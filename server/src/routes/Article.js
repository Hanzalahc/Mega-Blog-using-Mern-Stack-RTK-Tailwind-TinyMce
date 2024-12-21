import express from 'express';
const router = express.Router();
import { getAllArticles, getSingularArticle, createArticle, updateArticle, deleteArticle } from '../controllers/Article.js';
import { isAuthenticated } from '../middlewares/isAuth.js';

router.get('/all', getAllArticles);
router.get('/single/:slug', getSingularArticle);
router.post('/create', isAuthenticated, createArticle);
router.put('/update/:slug', isAuthenticated, updateArticle);
router.delete('/delete/:slug', isAuthenticated, deleteArticle);

export default router;