const express = require('express')

// express app
const app = express()

// register view engine
app.set('view engine', 'ejs')
//app.set('views', 'folder_name') // only when folder name with views is different then "views"

// listen for request
app.listen(3000)

app.use((req, res, next) => {
    console.log('new request made:')
    console.log('host: ', req.hostname)
    console.log('path: ', req.path)
    console.log('method: ', req.method)
    next()
})



app.get('/', (req, res) => {
    const blogs = [
        {title: 'Title number 1', snippet: 'Lorem ipsum dolor sit amet consectetur.' },
        {title: 'Title number 2', snippet: 'Lorem ipsum dolor sit amet consectetur.' },
        {title: 'Title number 3', snippet: 'Lorem ipsum dolor sit amet consectetur.' },
    ];
    res.render('index', { title: "Home", blogs: blogs})
})

app.use((req, res, next) => {
    console.log('next middleware')
    next()
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
