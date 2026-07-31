// operadores


// operador Aritmeticos

let a = 5
let b = 10

console.log(a+b)// suma
console.log(a-b)// resta
console.log(a*b)// multiplicacion
console.log(a/b)// division

console.log(a % b)//modulo
console.log(a ** b)// Exponente

a++ // Incremento
console.log(a)

b-- // Decremento
console.log(b)

let Myvariable = 2
console.log(Myvariable)

Myvariable = Myvariable+2

Myvariable +=2 //suma con asignacion
console.log(Myvariable)

Myvariable -=2// resta con asignacion
Myvariable *=2// Multiplicacion con Asignacion
Myvariable /=2// Division Con asignacion
Myvariable %=2// modulo con asignacion
Myvariable **2// Exponente con asignacion

//operadores de comparacion

console.log(a > b)//mayor que
console.log(a < b)// menor que
console.log(10 >= 10)//mayor o igual que
console.log(a <= b)// Menor o igual que

console.log(a == "6")
console.log (a == a)

console.log(a === a)// igualdad por identidad (por tipo y valor)o igualdad estricta
console.log(a === 6)
console.log(a === "6")//false

// cosas raras

console.log(0 == false)
console.log(1 == false)
console.log(0 == "")
console.log(0 == "hola")


//Operadores logicos

// and (&&)
// so por lo menos hay un false dentro de la comparacion TODO ES FALSE
console.log(5 > 10 && 15 > 20)// TODAS SON FALSA
console.log(5 < 10 && 15 < 20)// TODAS SON VERDADERAS
console.log(5 > 10 && 15 < 20 && 30 > 40)

//QR (||)

// Si por lo menos una condicion se cumple el resultado es verdadero
console.log(5 > 10 || 15 > 20)// False
console.log(5 < 10 || 15 < 20)// true
console.log(5 > 10 || 15 < 20)// true
console.log(5 > 10 || 15 < 20 || 30 > 40) // true

//net (!)

console.log(!true)
console.log(!false)
console.log(!(5 > 10 || 15 > 20))// false
console.log(!(5 < 10 || 15 < 20))// true

// operador ternario

const isRaining = true

isRaining ? console.log("Esta lloviendo"): console.log("No esta lloviendo")

let age = 10 
