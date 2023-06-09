const router = require('express').Router();
const portfolioController = require('../controllers/portfolioController');

router.post("/createPortfolio/:userId", portfolioController.createPortfolio);

router.get("/getPortfolio/:userId", portfolioController.getPortfolio);

router.put("/updatePortfolio/:id", portfolioController.updatePortfolio);

router.delete("/deletePortfolio/:id", portfolioController.deletePortfolio);

module.exports = router;