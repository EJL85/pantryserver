const express = require('express');

const router = express.Router();

const queries = require('../db/queries');

function isValidId(req, res, next) {
    if(!isNaN(req.params.id)) return next();
    next(new Error('Invalid ID'));
}

function validResolution(resolution) {
    const hasResolution = typeof resolution.resolution == 'string' && resolution.resolution.trim() != '';
    return hasResolution;
}

router.get('/', (req, res) => {
    queries.getAll().then(resolutions => {
        res.json(resolutions);
    })
});

router.get('/:id', isValidId, (req, res, next) => {
    queries.getOne(req.params.id).then(resolution => {
        if(resolution) {
            res.json(resolution);
        } else {
            next();
        }
    })
});

router.post('/', (req, res, next) => {
    if(validResolution(req.body)) {
        queries.create(req.body).then(resolution => {
            res.json(resolution[0]);
        })
    } else {
        next(new Error('Invalid resolution'));
    }
});

router.put('/:id', isValidId, (req, res, next) => {
    if(validResolution(req.body)) {
        queries.update(req.params.id, req.body).then(resolutions => {
            res.json(resolutions[0]);
        })
    } else {
        next(new Error('Invalid resolution'));
    }
});

router.delete('/:id', isValidId, (req, res) => {
    queries.delete(req.params.id).then(() => {
        res.json({
            deleted: true
        });
    });
});

module.exports = router;