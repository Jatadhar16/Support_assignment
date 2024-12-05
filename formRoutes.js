const express = require('express');
const Form = require('./models/formModel');

const router = express.Router();

router.post('/forms', async (req, res) => {
  const { title, headerImage, questions } = req.body;
  const form = new Form({ title, headerImage, questions });
  await form.save();
  res.json({ formId: form._id });
});

router.get('/forms/:formId', async (req, res) => {
  const form = await Form.findById(req.params.formId);
  res.json(form);
});

router.post('/forms/:formId/responses', async (req, res) => {
  const form = await Form.findById(req.params.formId);
  form.responses.push(req.body);
  await form.save();
  res.sendStatus(200);
});

module.exports = router;
