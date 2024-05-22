import express from 'express';
import { Tiers } from '../model/tiersModel';

export const tiers = express.Router();

tiers.get('/', async (req, res) => {
    const result = await Tiers.getManyTiers();
    res.json(result);
});

/*
router.get('/:id', m.mustBeInteger, async (req, res) => {
    const id = req.params.id
    await tiers.getTiers(id)
        .then(tiers => res.json(tiers))
        .catch(err => {
            if (err.status) {
                res.status(err.status).json({ message: err.message })
            } else {
                res.status(500).json({ message: err.message })
            }
        })
})
router.post('/', m.checkFieldsTiers, async (req, res) => {
    await tiers.insertTiers(req.body)
        .then(tiers => res.status(201).json({
            message: `The tiers #${tiers.id} has been created`,
            content: tiers
        }))
        .catch(err => res.status(500).json({ message: err.message }))
})
router.put('/:id', m.mustBeInteger, m.checkFieldsTiers, async (req, res) => {
    const id = req.params.id
    await tiers.updatePost(id, req.body)
        .then(tiers => res.json({
            message: `The tiers #${id} has been updated`,
            content: tiers
        }))
        .catch(err => {
            if (err.status) {
                res.status(err.status).json({ message: err.message })
            }
            res.status(500).json({ message: err.message })
        })
})

router.delete('/:id', m.mustBeInteger, async (req, res) => {
    const id = req.params.id
    await tiers.deletePost(id)
        .then(tiers => res.json({
            message: `The tiers #${id} has been deleted`
        }))
        .catch(err => {
            if (err.status) {
                res.status(err.status).json({ message: err.message })
            }
            res.status(500).json({ message: err.message })
        })
})*/

// router.get("/", (req, res) =>{
//     res.status(200).json({message: "all tiers"})
// })

// router.get("/:id", (req, res) => {
//     res.status(200).json({id: req.params.id})
// })
