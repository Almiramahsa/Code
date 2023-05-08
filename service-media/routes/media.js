const express = require('express');
const router = express.Router();
const isBase64 = require('is-base64');
const base64Img = require('base64-img');
const { v4: uuidv4 } = require('uuid');
const fs = require('fs');
const { Media } = require('../models');

//GET Image List
router.get('/', async (req, res) => {
  const media = await Media.findAll({
    attributes: ['id', 'image'],
  });

  const mappedMedia = media.map((m) => {
    m.image = `${req.get('host')}/${m.image}`;
    return m;
  });
  return res.json({
    status: 'success',
    data: mappedMedia,
  });
});

//POST Image
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

//DELETE Image
router.delete('/:id', async (req, res) => {
  const id = req.params.id;

  const media = await Media.findByPk(id);

  if (fs.existsSync(`./public/${media.image}`)) {
    fs.unlink(`./public/${media.image}`, async (err) => {
      if (err) {
        return res.status(400).json({
          status: 'error',
          message: err.message,
        });
      }
      await media.destroy();

      return res.json({
        status: 'success',
        message: 'image deleted',
      });
    });
  } else {
    await media.destroy();

    return res.json({
      status: 'success',
      message: 'media not found in directory but deleted from database',
    });
  }
});

module.exports = router;
