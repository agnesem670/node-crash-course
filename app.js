const express = require('express')
const morgan = require('morgan')
const mongoose = require('mongoose')
const userdata = require('./userData')
const blogRoutes = require('./routes/blogRoutes')

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
app.use(express.urlencoded({ extended: true }))
/* app.use(morgan('dev')) */
app.use(morgan('tiny'))

// routes
app.get('/', (req, res) => {
    res.redirect('/blogs')
})

app.get('/about', (req, res) => {
    res.render('about', { title: "About" })
})

// blog routes
app.use('/blogs', blogRoutes)

// 404 page 
app.use((req, res) => {
    res.status(404).render('404', { title: "404" })
})
