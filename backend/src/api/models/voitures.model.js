module.exports = (mongoose) => {
    const Schema = mongoose.Schema;
    let Voitures = new Schema(
      {
        marque: { type: String, required: true },
        description: { type: String, required: true },
        caracteristiques: { type: Array, required: true },
        image : {type: String},
        prix: { type: Number , required:true },
      },
      {
        timestamps: true,
      }
    );
    Voitures.method("toJSON", function () {
      const { __v, _id, ...object } = this.toObject();
      object.id = _id;
      return object;
    });
    const Voiture = mongoose.model("Voiture", Voitures);
    return Voiture;
};