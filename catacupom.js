const prompt = require("prompt-sync")()
const fs = require("fs")

const cupons = []
const lojas = []
const categorias = []
const links = []
const imagens = []

function titulo(texto) {
    console.log()
    console.log(texto.toUpperCase())
    console.log("=".repeat(40))
    console.log()
}

function inclusao() {
    titulo("Inclusão de Cupom")

    const cupom = prompt("Nome do Cupom......: ")
    const loja = prompt("Nome da Loja.......: ")
    const categoria = prompt("Categoria...........: ")
    const link = prompt("Link da Loja........: ")
    const imagem = prompt("URL da Imagem.......: ")

    cupons.push(cupom)
    lojas.push(loja)
    categorias.push(categoria)
    links.push(link)
    imagens.push(imagem)

    console.log("Cupom cadastrado com sucesso!")
}

function listagem() {
    titulo("Lista de Cupons")

    console.log("Nº Nome do Cupom........ Loja............ Categoria....... Link")
    console.log("----------------------------------------------------------------------------")

    for (let i = 0; i < cupons.length; i++) {
        console.log(`${String(i + 1).padStart(2)} ${cupons[i].padEnd(22)} ${lojas[i].padEnd(18)} ${categorias[i].padEnd(15)} ${links[i]}`)
    }

    console.log("----------------------------------------------------------------------------")
}

function pesquisaCategoria() {
    titulo("Pesquisa de Cupons por Categoria")

    const categoria = prompt("Categoria: ").toUpperCase()

    console.log("Nome do Cupom........... Loja................. Link")
    console.log("-----------------------------------------------------------")

    let existe = 0

    for (let i = 0; i < cupons.length; i++) {
        if (categorias[i].toUpperCase() === categoria) {
            console.log(`${cupons[i].padEnd(25)} ${lojas[i].padEnd(20)} ${links[i]}`)
            existe++
        }
    }

    if (existe === 0) {
        console.log("* Obs.: Não há cupons nesta categoria")
    }

    console.log("-----------------------------------------------------------")
}

function exclusao() {
    listagem()

    console.log()
    const num = Number(prompt("Qual Nº do Cupom para excluir (0 para cancelar)? "))

    if (num == 0 || num > cupons.length) {
        console.log("Nenhum cupom excluído...")
        return
    }

    cupons.splice(num - 1, 1)
    lojas.splice(num - 1, 1)
    categorias.splice(num - 1, 1)
    links.splice(num - 1, 1)
    imagens.splice(num - 1, 1)

    console.log("Ok. Cupom removido com sucesso!")
}

function gravaCupons() {
    const dados = []

    for (let i = 0; i < cupons.length; i++) {
        dados.push(cupons[i] + ";" + lojas[i] + ";" + categorias[i] + ";" + links[i] + ";" + imagens[i])
    }

    fs.writeFileSync("cupons.txt", dados.join("\n"))

    console.log("Ok! Lista de cupons salva com sucesso.")
}

function carregaCupons() {
    if (fs.existsSync("cupons.txt")) {
        const dados = fs.readFileSync("cupons.txt", "utf-8").split("\n")

        for (let i = 0; i < dados.length; i++) {
            const partes = dados[i].split(";")

            cupons.push(partes[0])
            lojas.push(partes[1])
            categorias.push(partes[2])
            links.push(partes[3])
            imagens.push(partes[4])
        }
    }
}

function catalogoWeb() {
    let conteudo = `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Cata Cupom</title>
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    body {
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      background-color: #fffdfa;
      color: #333;
    }
    header {
      background-color: #ff7b00;
      padding: 20px;
      box-shadow: 0 4px 8px rgba(0,0,0,0.1);
    }
    .logo-container {
      display: flex;
      align-items: center;
      gap: 15px;
    }
    .logo {
      height: 50px;
    }
    .logo-container h1 {
      font-size: 1.8em;
      color: #fff;
    }
    main {
      padding: 30px;
    }
    .cupons-container h2 {
      font-size: 1.5em;
      margin-bottom: 20px;
      color: #ff7b00;
    }
    .cupons-grid {
      display: grid;
      gap: 20px;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    }
    .cupom-card {
      background-color: #fff3e6;
      border-left: 5px solid #ff7b00;
      padding: 20px;
      border-radius: 10px;
      box-shadow: 0 3px 6px rgba(0,0,0,0.1);
      transition: transform 0.2s;
    }
    .cupom-card img{
    height: 100px;
    }
    .cupom-card:hover {
      transform: scale(1.02);
    }
    .cupom-card h3 {
      margin-bottom: 10px;
      color: #ff7b00;
    }
  </style>
</head>
<body>
  <header>
    <div class="logo-container">
      <img src="Logo.png" alt="Logo Cata Cupom" class="logo">
      <h1>Cata Cupom</h1>
    </div>
  </header>
  <main>
    <section class="cupons-container">
      <h2>Cupons Disponíveis</h2>
      <div class="cupons-grid">`

    for (let i = 0; i < cupons.length; i++) {
        conteudo += `
        <div class="cupom-card">
          <h3>${cupons[i]}</h3>
          <p><strong>Loja:</strong> ${lojas[i]}</p>
          <p><strong>Categoria:</strong> ${categorias[i]}</p>
          <p><a href="${links[i]}" target="_blank">Acessar Loja</a></p>
          <img src="${imagens[i]}" alt="Imagem da Loja" style="width: 100%; margin-top: 10px; border-radius: 8px;">
        </div>`
    }

    conteudo += `
      </div>
    </section>
  </main>
</body>
</html>`

    fs.writeFileSync("catalogo.html", conteudo)
    console.log("Catálogo gerado com sucesso!")
}

carregaCupons()

menuPrincipal:
do {
    titulo("Cupons 404")
    console.log("1. Incluir Cupom")
    console.log("2. Listar Cupons")
    console.log("3. Pesquisar por Categoria")
    console.log("4. Gerar Catálogo HTML")
    console.log("5. Excluir Cupom")
    console.log("6. Sair")
    const opcao = Number(prompt("Opção: "))

    switch (opcao) {
        case 1: inclusao(); break
        case 2: listagem(); break
        case 3: pesquisaCategoria(); break
        case 4: catalogoWeb(); break
        case 5: exclusao(); break
        case 6: break menuPrincipal
        default: console.log("Opção inválida.")
    }
} while (true)

gravaCupons()
console.log("-".repeat(40))
console.log("Fim do Programa...")
