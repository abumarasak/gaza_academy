const validVideo = (video) => {
    const isValidVideo = video.mimetype.startsWith("video/");
    if (!isValidVideo) {
        return false;
    }
    return true;
}
module.exports = validVideo;