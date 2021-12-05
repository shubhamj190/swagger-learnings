const express = require('express')
const app = express()
const port = process.env.PORT || 5000

const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const swaggerDocument = YAML.load('./swagger.yaml');
const fileUpload = require('express-fileupload');

let courses=[
    {
        id:"11",
        name:"reactjs",
        price:299
    },
    {
        id:"12",
        name:"angluarjs",
        price:2991
    },
    {
        id:"13",
        name:"django",
        price:2992
    },
]


app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(express.json())  // it is kind of body parser
app.use(fileUpload());


app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/api/v1/lco', (req, res) => {
  res.send('welcome to the lco docs')
})
app.get('/api/v1/lcoobject', (req, res) => {
    res.json(courses[0])
})
app.get('/api/v1/courses', (req, res) => {
    res.json(courses)
})
app.get('/api/v1/mycourses/:cid', (req, res) => {
    const mycourse=courses.find((course)=>course.id===req.params.cid)
    res.send(mycourse)
})


app.post('/api/v1/addcourse', (req, res) => {
    console.log(req.body)
    courses.push(req.body)
    console.log(true)
    res.send(true)
})

app.get('/api/v1/coursequery', (req, res) => {
    let location = req.query.location
    let device= req.query.device
    res.send({location, device})
})

app.post('/api/v1/courseupload', (req, res) => {
    console.log(req.header)
    const file = req.files.file
    let path= __dirname + "/images/" + Date.now()  + ".jpg"

    file.mv(path, (err)=>{
    res.send(true)
    })
})
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})