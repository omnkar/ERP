const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
  res.send('Production route')
})

module.exports = router
