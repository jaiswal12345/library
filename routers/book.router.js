var express = require("express");
var router = express.Router();
var bookCtrl = require('../controllers/book.ctrl');
router.get("/",bookCtrl.get);
// router.get("/:pageIndex/:pageSize",bookCtrl.get);
// router.get("/:id",bookCtrl.getByID);
router.post('/',bookCtrl.save);
router.delete("/:id",bookCtrl.delete);
router.put('/:id',bookCtrl.put);

module.exports = router;