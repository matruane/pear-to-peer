const express = require('express')
const router = express.Router()

const db = require('../db/items')
const { checkJwt } = require('../utils')

// GET all items
// router.get('/', (req, res) => {
//   db.getAllItems()
//     .then((items) => {
//       res.json(items)
//     })
//     .catch((err) => {
//       res.status(500).send({ message: 'Something went wrong' })
//     })
// })

// GET single item with user info
// router.get('/', (req, res) => {
//   db.getItemByIdWithUserInfo()
//     .then((item) => {
//       res.json(item)
//     })
//     .catch((err) => {
//       res.status(500).send({ message: 'Something went wrong' })
//     })
// })

// GET all items with user info
router.get('/', (req, res) => {
  db.getAllItemsWithUserInfo()
    .then((items) => {
      res.json(items)
    })
    .catch((err) => {
      console.error(err)
      res.status(500).send({ message: 'Something went wrong' })
    })
})

// GET items by the user ID
router.get('/byUser/:id', (req, res) => {
  const userId = req.params.id
  db.getItemsByUserId(userId)
    .then((userItems) => {
      res.json(userItems)
    })
    .catch((err) => {
      res.status(500).send({ message: 'Something went wrong' })
    })
})

// Get an item by it's id
router.get('/:id', (req, res) => {
  const id = Number(req.params.id)
  db.getItemByIdWithUserInfo(id)
    .then((item) => {
      res.json(item)
    })
    .catch((err) => {
      console.error(err)
      // res.status(500).send({ message: 'Something went wrong' })
      res.status(500).send(err.message)
    })
})

// POST items (by the user)
//checkJwt
router.post('/', checkJwt, async (req, res) => {
  const newItem = {
    itemName: req.body.itemName,
    allergens: req.body.allergens,
    description: req.body.description,
    imageUrl: req.body.image,
    expiry: req.body.expiry,
    availability: req.body.availability,
    userId: req.body.userId,
  }
  return db
    .insertItem(newItem)
    .then(() => {
      res.sendStatus(201)
    })
    .catch((err) => {
      console.error(err)
      res.status(500).send({ message: 'Something went wrong' })
    })
})

// PATCH item
//checkJwt
router.patch('/:id', (req, res) => {
  const updatedItem = req.body
  return db
    .updateItem(updatedItem)
    .then((patchItem) => {
      return res.json(patchItem)
    })
    .catch((err) => {
      console.error(err)
      res.status(500).send({ message: 'Something went wrong' })
    })
})

// DELETE item
// checkJwt
router.delete('/', (req, res) => {
  const { id } = req.body
  return db
    .deleteItem(id)
    .then(() => {
      res.status(200).send('Deleted')
    })
    .catch((err) => {
      res.status(500).send('err' + err.message)
    })
})

module.exports = router
