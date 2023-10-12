const express = require('express')
const morgan = require('morgan')
const mongoose = require('mongoose')

// express app
const app = express()

// connect to mongo db
const dbURI = 'mongodb+srv://agnes670test:1234670test@cluster0.kn9jvkp.mongodb.net/node-tuts?retryWrites=true&w=majority'
mongoose.connect(dbURI)
    .then((result) => app.listen(3000))
    .catch((err) => console.log(err))
// register view engine
app.set('view engine', 'ejs')
//app.set('views', 'folder_name') // only when folder name with views is different then "views"

// middleware and static files
app.use(express.static('public'))

/* app.use(morgan('dev')) */
app.use(morgan('tiny'))

app.get('/', (req, res) => {
    const blogs = [
        {title: 'Title number 1', snippet: 'Lorem ipsum dolor sit amet consectetur.' },
        {title: 'Title number 2', snippet: 'Lorem ipsum dolor sit amet consectetur.' },
        {title: 'Title number 3', snippet: 'Lorem ipsum dolor sit amet consectetur.' },
    ];
    res.render('index', { title: "Home", blogs: blogs})
})

app.get('/about', (req, res) => {
    res.render('about', { title: "About"})
})

app.get('/blogs/create', (req, res) => {
    res.render('create', { title: "Create a new blog"})
})

// 404 page 
app.use((req, res) => {
    res.status(404).render('404', { title: "404"})
})
