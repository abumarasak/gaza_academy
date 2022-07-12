
const validImage = (image) => {
  const isValidImage = image.mimetype.startsWith("image/");
  if (!isValidImage) {
    return false;
  }
  return true;
}
module.exports = validImage;