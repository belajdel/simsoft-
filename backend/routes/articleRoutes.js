const express = require('express');
const router = express.Router();
const articleController = require('../controllers/articleController');
const authMiddleware = require('../middleware/authMiddleware');

// Public routes
router.get('/', articleController.getArticles);
router.get('/:slug', articleController.getArticleBySlug);

// Protected routes
router.post('/', authMiddleware, articleController.createArticle);
router.put('/:id', authMiddleware, articleController.updateArticle);
router.delete('/:id', authMiddleware, articleController.deleteArticle);
router.patch('/:id/publish', authMiddleware, articleController.togglePublish);

module.exports = router;

