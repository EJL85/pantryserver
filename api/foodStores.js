const express = require('express');

const router = express.Router();

const queries = require('../db/queries');

function isValidId(req, res, next) {
    if(!isNaN(req.params.id)) return next();
    next(new Error('Invalid ID'));
}

function validfoodStore(foodStore) {
    const hasfoodStore = typeof foodStore.name == 'string' && foodStore.name.trim() != '';
    return hasfoodStore;
}

router.get('/', (req, res) => {
    queries.getAll().then(foodStores => {
        res.json(foodStores);
    })
});

router.get('/:id', isValidId, (req, res, next) => {
    queries.getOne(req.params.id).then(foodStore => {
        if(foodStore) {
            res.json(foodStore);
        } else {
            next();
        }
    })
});

router.post('/', (req, res, next) => {
    if(validfoodStore(req.body)) {
        queries.create(req.body).then(foodStore => {
            res.json(foodStore[0]);
        })
    } else {
        next(new Error('Invalid foodStore'));
    }
});

router.put('/:id', isValidId, (req, res, next) => {
    if(validfoodStore(req.body)) {
        queries.update(req.params.id, req.body).then(foodStores => {
            res.json(foodStores[0]);
        })
    } else {
        next(new Error('Invalid foodStore'));
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