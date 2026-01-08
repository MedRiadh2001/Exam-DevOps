const multer = require("multer")
const upload = multer({ dest: 'uploads/' });

module.exports = app => {
    const router = require('express').Router();
    const voitureController= require('../controllers/voiture.controller');
    router.post('/voitures', voitureController.create)
    router.get('/voitures', voitureController.findAll)
    router.delete('/voitures/:id', voitureController.delete)
    router.get('/voitures/:id', voitureController.findOne)
    router.put('/voitures/:id', voitureController.update)
    router.post('/upload', upload.single('image'), (req, res) => {
        if (!req.file) return res.status(400).json({ error: 'Aucun fichier envoyé' });
      
        const imageUrl = `http://localhost:3000/uploads/${req.file.filename}`;
        res.json({ imageUrl });
      });
    app.use('/api', router)
}

