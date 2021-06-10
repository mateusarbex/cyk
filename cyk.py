import sys

def cyk(palavra, terminals, initialVariable, variables):
    ## palavra = 02011
    ## Z -> 0 
    ## U -> 1
    ## ...
    n = len(palavra)
    tabela = [[[] for i in range(n)] for j in range(n)]
    
    for i in range(n):
        for elem in terminals: ## [left, producao]
            if palavra[i] == elem[1]:
                tabela[i][i].append(elem[0])
    
    for i in range(n):
        for j in range(n):
            print(tabela[i][j], end=" ")
        print()
    print(tabela)
    for l in range(2, n+1):
        for i in range(0,n-l+1):
            j = i+l-1
            for k in range(i,j):
                # [i][k] e [k+1][j] -- split
                for elem in variables:
                    ## elem => [left, producao]
                    ## left => A
                    ## producao => BC
                    ## A->BC
                    B = elem[1][0]
                    C = elem[1][1]
                    if B in tabela[i][k] and C in tabela[k+1][j]:
                        tabela[i][j].append(elem[0])
                    
                
    # for i in range(n):
    
    #     for j in range(n):
    #         print(tabela[i][j], end=" ")
    #     print()
   
    if initialVariable in tabela[0][n-1]:
        print("SIM")
    else:
        print("NAO")

if __name__ == "__main__":
    palavra = "bbbb"
    initialVariable = ""
    terminals = [] ## A->a
    variables = [] ## A->BC
    gramatica = open("gramatica.txt")
    for line in gramatica:
        left, right = line.split("->")
        left = left.strip()
        right = right.strip()
        
        if initialVariable == "":
            initialVariable = left
            
        right = right.split("|")
        
        for elem in right:
            if elem.islower():
                terminals.append([left, elem])
            else:
                variables.append([left, elem])
                
    cyk(palavra, terminals, initialVariable, variables)