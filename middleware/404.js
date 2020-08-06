module.exports = (req, res) => {
    return res.status(404).send(`<h2>${req.url} unknown request</h2>`);
}