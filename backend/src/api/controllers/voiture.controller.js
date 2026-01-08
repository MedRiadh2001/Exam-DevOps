const db = require('../../databsae/db.config');
const Voiture = db.voitures;

// Créer une voiture
exports.create = (req, res) => {
  const { marque, description, caracteristiques, image, prix } = req.body;

  if (!marque || !description || !caracteristiques || !prix) {
    return res.status(400).send({ message: 'Champs requis manquants.' });
  }

  const newVoiture = new Voiture({
    marque,
    description,
    caracteristiques,
    image,
    prix
  });

  newVoiture.save()
    .then(() => {
      res.status(201).send({ message: 'Voiture créée avec succès.' });
    })
    .catch(err => {
      console.error(err);
      res.status(500).send({ message: 'Erreur lors de la création.' });
    });
};

// Récupérer toutes les voitures
exports.findAll = (req, res) => {
  Voiture.find()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      console.error(err);
      res.status(500).send({ message: 'Erreur lors de la récupération.' });
    });
};

// Récupérer une voiture par ID
exports.findOne = (req, res) => {
  const id = req.params.id;

  if (!id) {
    return res.status(400).send({ message: 'ID requis.' });
  }

  Voiture.findById(id)
    .then(data => {
      if (!data) {
        return res.status(404).send({ message: 'Voiture non trouvée.' });
      }
      res.send(data);
    })
    .catch(err => {
      console.error(err);
      res.status(500).send({ message: 'Erreur serveur.' });
    });
};

// Supprimer une voiture
exports.delete = (req, res) => {
  const id = req.params.id;

  if (!id) {
    return res.status(400).send({ message: 'ID requis.' });
  }

  Voiture.findByIdAndDelete(id)
    .then(data => {
      if (!data) {
        return res.status(404).send({ message: 'Voiture non trouvée.' });
      }
      res.status(200).send({ message: 'Voiture supprimée avec succès.' });
    })
    .catch(err => {
      console.error(err);
      res.status(500).send({ message: 'Erreur lors de la suppression.' });
    });
};

// Mettre à jour une voiture
exports.update = (req, res) => {
  const id = req.params.id;
  const { marque, description, caracteristiques, image, prix } = req.body;

  if (!id) {
    return res.status(400).send({ message: 'ID requis.' });
  }

  Voiture.findByIdAndUpdate(
    id,
    { marque, description, caracteristiques, image, prix },
    { useFindAndModify: false, new: true }
  )
    .then(data => {
      if (!data) {
        return res.status(404).send({ message: `Voiture avec id=${id} non trouvée.` });
      }
      res.status(200).send({ message: 'Voiture mise à jour avec succès.' });
    })
    .catch(err => {
      console.error(err);
      res.status(500).send({ message: 'Erreur lors de la mise à jour.' });
    });
};
