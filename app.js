const express = require('express')
const morgan = require('morgan')
const mongoose = require('mongoose')
const userdata = require('./userData')
const Blog = require('./models/blog')

// express app
const app = express()

// connect to mongo db
const dbURI = "mongodb+srv://" + userdata + "@cluster0.kn9jvkp.mongodb.net/node-tuts?retryWrites=true&w=majority"
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

//mongoose and mongo sandbox routes

app.get('/add-blog', (req, res) => {
    const blog = new Blog({
        title: 'new blog 2',
        snippet: 'about my new blog',
        body: 'body of the blog'
    })
    blog.save()
        .then((result) => {
            res.send(result)
        })
        .catch((err) => {
            console.log(err)
        })

})

app.get('/all-blogs', (req, res) => {
    Blog.find()
        .then((result) => {
            res.send(result)
        })
        .catch((err) => {
            console.log(err)
        })
})

app.get('/single-blog', (req, res) => {
    Blog.findById('652d0d80916a386344d7d406')
        .then((result) => {
            res.send(result)
        })
        .catch((err) => {
            console.log(err)
        })
})

app.get('/', (req, res) => {
    const blogs = [
        { title: 'Title number 1', snippet: 'Lorem ipsum dolor sit amet consectetur.' },
        { title: 'Title number 2', snippet: 'Lorem ipsum dolor sit amet consectetur.' },
        { title: 'Title number 3', snippet: 'Lorem ipsum dolor sit amet consectetur.' },
    ];
    res.render('index', { title: "Home", blogs: blogs })
})

app.get('/about', (req, res) => {
    res.render('about', { title: "About" })
})

app.get('/blogs/create', (req, res) => {
    res.render('create', { title: "Create a new blog" })
})

// 404 page 
app.use((req, res) => {
    res.status(404).render('404', { title: "404" })
})
