const router = require('express').Router();
let Activity = require('../models/activity.model');
const bodyParser = require('body-parser');


router.route('/all').get((req, res) => {
    Activity.find()
        .then(activities => res.json(activities))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {

    const newActivity = new Activity({
        date: req.body.date,
        type: req.body.type,
        text: req.body.text,
        members: req.body.members
    });

    console.log('Adding document: ' + newActivity)

    newActivity.save()
        .then(() => res.json('Activity added!'))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/get').post((req, res) => {
    if(req.body['d1']!==''){var d1 = new Date(req.body['d1'])}
    if(req.body['d2']!==''){var d2 = new Date(req.body['d2'])}

    if(req.body['d2'] !== ''){
        var dp = {
            date: {$gte: d1, $lte: d2}
        }
    } else if (req.body['d1'] !== '') {
        var dp = {
            date: d1
        }
    }

    var match = {}

    for(var key in req.body) {
        if (key === 'members') {
            match[key] = new RegExp(req.body[key], 'i')
        } else if (key === 'text') {
            match[key] = new RegExp(req.body[key], 'i')
        } else if (key === 'type' && req.body['type'] !=='') {
            match[key] = req.body[key]
        } else if (key === 'd1' && req.body['d1']!==''){
            match['date'] = dp['date']
        }
    }

    if(req.body['sort']==='date'){
        var p = parseInt(req.body['by'], 10)
        var sort = {
            date: p,
            type: 1
        }
    } else if (req.body['by']==='type'){
        var p = parseInt(req.body['by'], 10)
        var sort = {
            type: p,
            date: 1
        }
    }

    console.log('Getting document(s): ' + JSON.stringify(match))

    Activity.find(match)
        .sort(sort)
        .limit(100)
        .then((response) => res.json(response))
        .catch(err => res.status(400).json('Error: '+err))
});

router.route('/hapus').post((req, res) => {
    console.log('Deleting document: ' + JSON.stringify(req.body))
    Activity.deleteOne(req.body)
        .then(res.status(200))
        .catch(err => res.status(400).json('Error: '+err))
})

module.exports = router;