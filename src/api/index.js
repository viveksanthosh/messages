import { Router } from 'express';
const router = Router();

let state = null;

router.get('/state', (req, res) => {
    res.json(state);
})

router.post('/state', (req, res) => {
    state = req.body;
    res.send()
})

const getState = () => state;
export { router, getState };