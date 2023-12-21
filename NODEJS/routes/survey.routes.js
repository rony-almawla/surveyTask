const express = require("express");
const router = express.Router();
const authMiddleware = require('../middlewares/auth.middleware');
const surveyController = require('../controllers/survey.controllers');

router.post('/', authMiddleware, surveyController.createSurvey);
router.get('/', surveyController.getAllSurveys);
router.get('/:id', surveyController.getSurveyById);
router.put('/:id', authMiddleware, surveyController.updateSurvey);
router.delete('/:id', authMiddleware, surveyController.deleteSurvey);

module.exports = router;
