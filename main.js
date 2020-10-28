//load libraries
const express = require('express')
const handlebars = require('express-handlebars')

//configure the environment
const PORT = parseInt(process.argv[2] || process.env.APP_PORT) || 3000

//create an instance of express
const app = express()

//configure handlebars
app.engine('hbs', 
    handlebars({defaultLayout: 'default.hbs'})
)
app.set('view engine', 'hbs')

//function for roll
const roll_dice = () => {
    return Math.floor(Math.random() * 6) + 1
}
const alt_roll_dice = function() {
    return Math.floor(Math.random() * 6) + 1
}

const DICE_IMGS = [
    "",
    "1.png", "2.png", "3.png", "4.png", "5.png", "6.png"
]

const landingPage = (req,resp) => {
    console.info(">>>info")
    resp.status(200)
    resp.type('text/html')
    resp.render('index')
}

//logging calls
app.use(
    (req,resp,next) => {
        console.info(`${new Date()}: ${req.method} ${req.originalUrl}`)
        next()
    }
)

//load landing page
app.get('/', '/index.html',
    (req,resp) => {
        landingPage
    }
)

//roll dices
app.get('/roll',
    (req,resp) => {
        const d1 = DICE_IMGS[roll_dice()]
        const d2 = DICE_IMGS[roll_dice()]
        resp.status(200)
        resp.type('text/html')
        //if hbs key and const variable names are the same, just use one
        //resp.render('roll', {d1: d1, d2: d2})
        resp.render('roll', {d1, d2})
    }
)

//error page go back to main
app.use((req,resp) => {
    resp.redirect('/')
})

//load/mount static directories
app.use(express.static(__dirname+'/dice_images'))
app.use(express.static(__dirname+'/static'))
app.use(landingPage)

//start the server
app.listen(PORT, ()=> 
    {
        console.info(`Application started on port ${PORT} at ${new Date()}`)
    }
)
