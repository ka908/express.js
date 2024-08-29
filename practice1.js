import express from 'express'
import dotenv from 'dotenv'

import { getPostById,getnotes, posts, deleteNOTE, creating,patchusers,putusers } from './new.js'

const app = express()
app.use(express.json())

app.get('/posts', (req, res) => {
    res.send('Hello World');
});

app.listen(3000, () => {
    console.log('server runnning on .............................');

})


// GET///////////////////////////////////////////
app.get('/posts/:id', async (req, res) => {
    const x = await getPostById(+req.params.id)
    res.send(x)
})

//POST/////////////////////////////////////////////////////
app.post('/posts',async(req,res)=>{           
    const note = await creating(req.body.id,req.body.userid,req.body.title,req.body.content)
    res.status(201).send(note);
})

//PATCH................/////////////////////////////////////////
app.patch('/posts/:id', async (req, res) => {
    const patchnote = await patchusers(+req.params.id,req.body.title)
    res.status(201).send(patchnote);
})
//PUT         ,/////////////////////////////////////////

app.put('/posts/:id', async (req, res) => {
    const putnote= await putusers(+req.params.id,req.body.userid,req.body.title,req.body.content)
    res.status(201).json(putnote);
})

app.delete('/posts/:id', async (req, res) => {

        const id=+req.params.id
        const result=await deleteNOTE(id)
        if(!id)
            {
                res.send('not a valid id')
            }

        else

        {
            res.send(result)            
        }
})








// app.get('/blog', async (req, res) => {
//     const x = await getnotes()
//     res.send(x)
// })

// app.get('/posts/:id', async (req, res) => {
//     const x = await posts(req.body.posts)
//     res.send(x)
// })


// app.get('/', async (req, res) => {
//     try {
//         const users = await posts();
//         res.json(users);
//     }
//     catch (error) {
//         res.status(500).json({ error: 'Failed to fetch users' });
//     }

// })


// // app.delete('/posts/:id',async(req,res)=>{           
// //     const deletedRec= await deleteNOTE(req.params.id)
// //     res.status(200).send(deletedRec);
// // })

// app.patch('/posts/:id', async (req, res) => {
//     const patchnote = await patchusers(+req.params.id,req.body.title)
//     res.status(201).send(patchnote);
// })