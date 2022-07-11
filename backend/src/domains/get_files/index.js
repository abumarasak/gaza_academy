const express = require("express");
const router = express.Router();
const asuncHandler = require("express-async-handler");
const {getFile} = require("../../util/s3");
router.get("/:key", asuncHandler(async (req, res) => {
    const key = req.params.key;
    if(!key){
        res.status(401);
        throw new Error("الرجاء ادخال الكود");
    }
    const file =await getFile(key);
    file.pipe(res);
}))

module.exports = router;