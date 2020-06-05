const express = require("express")
const server = express()

//habilitar o uso do req.body

//configurar pasta public
server.use(express.static("public"))

//pegar banco de dados
const db = require("./database/db.js")

//habilitar o uso do req.body
server.use(express.urlencoded({ extended: true }))

//utilizando template 
const nunjucks = require("nunjucks")
nunjucks.configure("src/views", {
    express: server,
    noCache: true
})

//configurar caminhos 
server.get("/", (req, res) => {
  
   
        //pegar os dados do bd
        db.all(`SELECT * FROM places`, function (err, rows) {
           
            if (err) {
                return console.log(err)
            }
           
            const total = rows.length
            // console.log("Aqui estão seus registros: ")
            console.log(rows)
            //mostrar a pagina html com os dados do bd
            return res.render("index.html", { places: rows, total:total }) //ou somente { places: rows, total }, pois o nome é igual
    
        })
    
   
})

/*server.get("/create-point", (req, res) => {
    //para get, a reposta do formulado seria req.query
    return res.render("create-point.html")
})*/

server.post("/savepoint", (req, res) => {
    //inserir dados

    const query = `
INSERT INTO places(
    name,
    nick
   
) VALUES (?,?);

`
    const values = [
        req.body.name,
        req.body.nick
        
    ]

    function afterInsertData(err) {
        if (err) {
            console.log(err)
            return res.send("Erro no Cadastro!")
        } else {
            console.log("Cadastrado com sucesso")
        }
    }
    db.run(query, values, afterInsertData)
    console.log(values)

    return console.log("cadstrado com sucesso") //ou somente { places: rows, total }, pois o nome é igual
    //para o psoto, que é mais seguro e n exibe os dados no link da apgina, temos o req.body




})
/*
function getData(){
    server.get("/search", (req, res) => {
   
        //pegar os dados do bd
        db.all(`SELECT * FROM places`, function (err, rows) {
           
            if (err) {
                return console.log(err)
            }
           
            const total = rows.length
            // console.log("Aqui estão seus registros: ")
            console.log(rows)
            //mostrar a pagina html com os dados do bd
            return res.render("index.html", { places: rows, total:total }) //ou somente { places: rows, total }, pois o nome é igual
    
        })
    
    })
} getData()

server.get("/search", (req, res) => {
   
    //pegar os dados do bd
    db.all(`SELECT * FROM places`, function (err, rows) {
       
        if (err) {
            return console.log(err)
        }
       
        const total = rows.length
        // console.log("Aqui estão seus registros: ")
        console.log(rows)
        //mostrar a pagina html com os dados do bd
        return res.render("index.html", { places: rows, total:total }) //ou somente { places: rows, total }, pois o nome é igual

    })

})*/

//ligar servidor
server.listen(3000)

