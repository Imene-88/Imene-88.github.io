const AdsModel = require('../models/Ads');

exports.addAd = async (req, res) => {
    try {
        const ad = new AdsModel({
            admin_id: req.params.adminId,
            content: req.body.content,
            image: req.body.image,
            video: req.body.video,
            target_audience: req.body.audience,
        });
        await ad.save();
        res.status(200).json(ad);
    } 
    catch (error) {
        console.log(error);
    }
}

exports.getAdsCount = async (req, res) => {
    try {
        const adsCount = await AdsModel.countDocuments({});
        res.status(200).json(adsCount);
    } 
    catch (error) {
        console.log(error);
    }
};

exports.getAds = async (req, res) => {
    try {
        const ads = await AdsModel.find({});
        res.status(200).json(ads);     
    } 
    catch (error) {
        console.log(error);
    }
}