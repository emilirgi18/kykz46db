const router = require('express').Router();
let Activity = require('../models/activity.model');
let Ranged = require('../models/ranged.model')
const bodyParser = require('body-parser');


router.route('/all').get((req, res) => {
    Activity.find()
        .then(activities => res.json(activities))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {

    const dateP = req.body.date;
    const typeP = req.body.type;
    const textP = req.body.text;
    const membersP = req.body.members;
    const newActivity = new Activity({
        date: dateP,
        type: typeP,
        text: textP,
        members: membersP
    });

    console.log('Adding document: ' + newActivity)

    newActivity.save()
        .then(() => res.json('Activity added!'))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/ranged').post((req, res) => {
    if(req.body['d1']!==''){var d1 = new Date(req.body['d1'])}
    if(req.body['d2']!==''){var d2 = new Date(req.body['d2'])}

    var dp = {
        date: {$gte: d1, $lte: d2}
    }

    var match = {}

    for(var key in req.body) {
        if (key === 'members') {
            match[key] = new RegExp(req.body[key], 'i')
        } else if (key === 'text') {
            match[key] = new RegExp(req.body[key], 'i')
        } else if (key === 'type' && req.body['type'] !=='') {
            match[key] = req.body[key]
        } else if (key === 'd1'){
            match['date'] = dp['date']
        }
    }

    console.log(JSON.stringify(match))
    console.log('Getting ranged document(s): ' + JSON.stringify(match))

    Activity.find(match)
        .sort({type: 1, date: 1})
        .then((response) => res.json(response))
})

router.route('/get').post((req, res) => {

    var placeholder = {};

    for(var key in req.body){ //could also be req.query and req.params
        //req.body[key] !== "" ? placeholder[key] = req.body[key] : null;
        if(key == 'members'){ placeholder[key] = new RegExp(req.body[key], 'i')}
        else if(key == 'text'){ placeholder[key] = new RegExp(req.body[key], 'i')}
        else if (req.body[key] !== ""){placeholder[key] = req.body[key]}
    }

    console.log('Getting one-day document(s): ' + JSON.stringify(placeholder));

    Activity.find(placeholder)
        .sort({date: -1,type: 1})
        .limit(100)
        .then((activities) => res.json(activities))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/hapus').post((req, res) => {
    console.log('Deleting document: ' + JSON.stringify(req.body))
    Activity.deleteOne(req.body)
        .then(res.status(200))
        .catch(err => res.status(400).json('Error: '+err))
})

module.exports = router;