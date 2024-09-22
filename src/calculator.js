// calculator.js
class Calculator {
  
  // Inicializa uma nova instância da classe Calculator.
  constructor({ number1 = 0, number2 = 0, operator = "" } = {}) {
    this.number1 = Number(number1);
    this.number2 = Number(number2);
    this.operator = operator;
    this.result = null;
  }

  // Realiza uma operação matemática com base no operador e números fornecidos.
  calculate() {
    if (
      this.number1 !== null &&
      this.number1 !== undefined &&
      this.number2 !== null &&
      this.number2 !== undefined
    ) {
      switch (this.operator) {
        case "+":
          this.result = this.number1 + this.number2;
          break;
        case "-":
          this.result = this.number1 - this.number2;
          break;
        case "*":
          this.result = this.number1 * this.number2;
          break;
        case "/":
          this.result =
            this.number2 == 0
              ? "Divisão por zero!"
              : this.number1 / this.number2;
          break;
        default:
          this.result = "Operador inválido!";
      }
    } else {
      this.result = "Preencha todos os campos!";
    }
  }

  // Retorna as operações disponíveis.
  static operations() {
    return [
      { value: "+", label: "+ (adição)" },
      { value: "-", label: "- (subtração)" },
      { value: "*", label: "x (multiplicação)" },
      { value: "/", label: "/ (divisão)" }
    ];
  }
}

export { Calculator };
