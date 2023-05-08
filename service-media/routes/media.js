const express = require('express');
const router = express.Router();
const isBase64 = require('is-base64');
const base64Img = require('base64-img');
const { v4: uuidv4 } = require('uuid');
const { Media } = require('../models');

router.post('/', async (req, res) => {
  const image = req.body.image;

  if (!isBase64(image, { mimeRequired: true })) {
    return res.status(400).json({ status: 'error', message: 'invalid base64' });
  }
  base64Img.img(image, './public/images', uuidv4(), async (err, filepath) => {
    if (err) {
      return res.status(400).json({ status: 'error', message: err.message });
    }

    const filename = filepath.split('\\').pop().split('/').pop();
    const media = await Media.create({ image: `images/${filename}` });

    return res.json({
      status: 'success',
      data: {
        id: media.id,
        image: `${req.protocol}://${req.get('host')}/images/${filename}`,
      },
    });
  });
});

module.exports = router;
