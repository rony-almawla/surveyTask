const express = require('express');
const router = express.Router();
const Survey = require('../models/survey.model');


exports.createSurvey = async (req, res) => {
  try {
    const { title, questions } = req.body;
    const createdBy = req.user.id;

    const newSurvey = new Survey({
      title,
      questions,
      createdBy,
    });

    const savedSurvey = await newSurvey.save();
    res.json(savedSurvey);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

exports.getAllSurveys = async (req, res) => {
  try {
    const surveys = await Survey.find();
    res.json(surveys);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

exports.getSurveyById = async (req, res) => {
  try {
    const survey = await Survey.findById(req.params.id);
    if (!survey) {
      return res.status(404).json({ message: 'Survey not found' });
    }
    res.json(survey);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

exports.updateSurvey = async (req, res) => {
  try {
    const { title, questions } = req.body;
    const survey = await Survey.findById(req.params.id);

    if (!survey) {
      return res.status(404).json({ message: 'Survey not found' });
    }

    if (survey.createdBy.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Permission denied' });
    }

    survey.title = title;
    survey.questions = questions;

    const updatedSurvey = await survey.save();
    res.json(updatedSurvey);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

exports.deleteSurvey = async (req, res) => {
  try {
    const survey = await Survey.findById(req.params.id);

    if (!survey) {
      return res.status(404).json({ message: 'Survey not found' });
    }

    if (survey.createdBy.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Permission denied' });
    }

    await survey.remove();
    res.json({ message: 'Survey deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};