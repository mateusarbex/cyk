const fs = require("fs");

function cyk(palavra, terminals, initialVariable, variables) {
  n = palavra.length;
  const tabela = new Array(n);
  for (i = 0; i < n; i++) {
    tabela[i] = new Array(n);
    for (j = 0; j < n; j++) {
      tabela[i][j] = [];
    }
  }

  for (i = 0; i < n; i++) {
    for (let elem of terminals) {
      if (palavra[i] == elem[1]) {
        tabela[i][i].push(elem[0]);
      }
    }
  }

  for (l = 2; l <= n; l++) {
    for (i = 0; i < n - l + 1; i++) {
      let j = i + l - 1;
      for (k = i; k < j; k++) {
        for (let elem of variables) {
          let B = elem[1][0];
          let C = elem[1][1];
          if (
            tabela[i][k].some((value) => value === B) &&
            tabela[k + 1][j].some((value) => value === C)
          ) {
            tabela[i][j].push(elem[0]);
          }
        }
      }
    }
  }
  if (tabela[0][n - 1][0] === initialVariable) {
    console.log("SIM");
  } else {
    console.log("NAO");
  }
}

function main(file) {
  const regex = /[a-z0-9]/;

  const palavra = "abbb";
  let initialVariable = "";

  const terminals = [];
  const variables = [];
  const lines = file.split("\r\n");

  for (line of lines) {
    let [esquerda, direita] = line.split("->");
    if (!initialVariable) {
      initialVariable = esquerda;
    }

    direita = direita.split("|");

    for (digit of direita) {
      if (regex.test(digit)) {
        terminals.push([esquerda, digit]);
      } else {
        variables.push([esquerda, digit]);
      }
    }
  }
  cyk(palavra, terminals, initialVariable, variables);
}
const file = fs.readFileSync("./gramatica.txt", { encoding: "utf-8" });

main(file);
