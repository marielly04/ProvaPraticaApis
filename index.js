const { request, response } = require('express')
const express = require('express')
const exphbs = require('express-handlebars')
const PORT = 3333
//Importar o módulo conn para as operações com o banco

const app = express()

app.use(express.urlencoded({extended: true}))
app.use(express.json())

app.engine('handlebars', exphbs.engine())
app.set('view engine', 'handlebars')

//Middleware para arquivos estáticos


app.get('/', (request, response)=>{
  return response.render('home')
})

app.get('./cadastrar', (request, response)=>{
  const sql = `SELECT * FROM tb_livros`;
  conn.query(sql, (err, result)=> {
    if(err){
      console.log(err)
    };
    const livros = result
    response.render('cadastro', {livros})
  })
})

app.get('./cadastrar', (request, response)=>{
  const {titulo, categoria, descricao, preco, quantidade} = request.body

  const sql = `INSERT INTO tb_livros (titulo, categoria, descricao, preco, quantidade), ('${titulo}', '${categoria}', '${descricao}', '${preco}', '${quantidade}')`;

  conn.query(sql, (err, result)=>{
    if(err){
      console.log(err)
    }
  })

  return response.redirect('/cadastrar')
})

// ligação
const conn = mysql.createConnection({
  host: 'localhost',
  port: '3306',
  user: 'root',
  password: 'Sen@iDev77!.',
})

conn.connect(function(err){
  if(err){
  console.log(err)
  return
  }
  console.log('MYSQL Conectado')
  app.listen(PORT, ()=>{
  console.log(`Servidor rodando na porta ${PORT}`)
  })
})


