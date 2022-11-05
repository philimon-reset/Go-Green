const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.post('/trees/', (req, res) => {
    res.send('posting tree data!')
})

app.get('/trees/:treeId', (req, res) => {
  res.send('getting tree data with id!')
})

app.get('/trees:', (req, res) => {
    res.send('getting all trees data!')
})

app.post('/users', (req, res) => {
    res.send('posting user data!')
})

app.get('/users', (req, res) => {
  res.send('getting user data!')
})

app.get('/users/:userId/', (req, res) => {
const str = 'user with id ' + String(req.params.userId) + ' is created';

  res.send(str)
})



app.post('users/:userId/bounties', (req, res) => {
    res.send('creating a bounty data!')
})


app.get('/bounties/', (req, res) => {
    res.send('getting bounties data!')
})

app.get('/bounties/', (req, res) => {
    res.send('getting bounties data!')
})

app.post('users/:userId/claim_bountyId', (req, res) => {
    res.send('adding to claims')
})

app.get('/bounties/:bountyId', (req, res) => {
  res.send('getting bounties data! by id')
})

// app.post('users/:userId/claim_bounty/:bountyId', (req, res) => {
//     res.send('posting bounties data!')
// })

app.post('users/:userId/approve_bounty/:approvedUserId', (req, res) => {
    res.send('posting bounties data!')
})



app.listen(port, () => {
  console.log('Example app listening on port ${port}')
})