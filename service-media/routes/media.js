const express = require('express');
const router = express.Router();
const isBase64 = require('is-base64');
const base64Img = require('base64-img');

const { Media } = require('../models');

router.post('/', async (req, res) => {
  const image = req.body.image;

  if (!isBase64(image, { mimeRequired: true })) {
    return res.status(400).json({ status: 'error', message: 'Invalid base64 format' });
  }
  base64Img.img(image, './public/images', Date.now(), async (err, filepath) => {
    if (err) {
      return res.status(400).json({ status: 'error', message: err.message });
    }
    // 'public.images/123.png'
    const filename = filepath.split('/').pop();
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
