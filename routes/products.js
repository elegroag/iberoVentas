var express = require('express');
var router = express.Router();

router.get('/list', function(req, res, next){
    res.json({
        status: 200,
        data: {
            message: 'API Rest MEARN'
        }
    })
});

module.exports = router;