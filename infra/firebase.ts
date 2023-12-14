const admin = require("firebase-admin");

const serviceAccount = require(process.env.NODE_ENV === "dev"
  ? "../infra/firebaseKey.json"
  : "../../infra/firebaseKey.json");
const BUCKET = "cafesantana-2c54c.appspot.com";

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: BUCKET,
});

const bucket = admin.storage().bucket();

const uploadImage = (req, res, next) => {
  if (!req.file) return next();

  const image = req.file;
  const nomeArquivo = Date.now() + "." + image.originalname.split(".").pop();

  const file = bucket.file(nomeArquivo);

  const stream = file.createWriteStream({
    metadata: {
      contentType: image.mimetype,
    },
  });

  stream.on("error", (err) => {
    console.error(err);
  });

  stream.on("finish", async () => {
    await file.makePublic();

    req.file.firebaseUrl = `https://storage.googleapis.com/${BUCKET}/${nomeArquivo}`;
    next();
  });

  stream.end(image.buffer);
};

module.exports = uploadImage;
