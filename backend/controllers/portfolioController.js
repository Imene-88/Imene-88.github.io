const PortfolioModel = require('../models/Portfolio');

exports.createPortfolio = async (req, res) => {
    try {
        const portfolio = new PortfolioModel({
            user_id: req.params.userId,
            full_name: req.body.full_name,
            description: req.body.description,
            list_of_works: req.body.works,
        });
        await portfolio.save();
        res.status(200).json(portfolio);    
    } 
    catch (error) {
        console.log(error);
    }
};

exports.updatePortfolio = async (req, res) => {
    try {
        const portfolio = await PortfolioModel.findByIdAndUpdate(req.params.id, {full_name: req.body.full_name, description: req.body.description, list_of_works: req.body.works}, {new: true});
        res.status(200).json(portfolio);    
    } 
    catch (error) {
        console.log(error);
    }
};

exports.getPortfolio = async (req, res) => {
    try {
        const portfolio = await PortfolioModel.findOne({user_id: req.params.userId});
        if (portfolio) {
            res.status(200).json(portfolio);    
        } else {
            return;
        }
    } 
    catch (error) {
        console.log(error);
    }
};

exports.deletePortfolio = async (req, res) => {
    try {
        await PortfolioModel.findByIdAndDelete(req.params.id);
        res.status(200).json("Portfolio deleted successfully");    
    } 
    catch (error) {
        console.log(error);
    }
};