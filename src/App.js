import logo from "./logo.svg";
import "./App.css";
import { Calculator } from "./calculator.js"; // Importa o componente Calculator.

// Cria o componente principal.
function App() {
  // Define as variáveis globais.
  const appName = "Calculadora";
  const appVersion = "v2.0";
  let history = [];
  let showAllHistory = false;

  // Cria o componente de cabeçalho.
  const AppHeader = () => {
    return (
      <header className="App-header">
        <h1>{appName}</h1>
        <p>{appVersion}</p>
      </header>
    );
  };

  // Cria o componente de rodapé.
  const AppFooter = () => {
    return (
      <footer className="App-footer">
        <p>
          App developed with
          <img src={logo} className="App-logo" alt="React" title="React" />
          <b>React</b> by Tadeu Jerônimo
        </p>
      </footer>
    );
  };

  // Cria o componente de opções de operadores.
  const OperatorOptions = () => {
    return Calculator.operations().map((operation, index) => (
      <option key={index} value={operation.value}>
        {operation.label}
      </option>
    ));
  };

  // Trata o evento de cálculo e realiza as operações necessárias.
  const calculateHandle = (event) => {
    event.preventDefault();

    let number1 = document.querySelector("#number1").value;
    let number2 = document.querySelector("#number2").value;
    let operator = document.querySelector("#operator").value;
    let result = document.querySelector("#result");

    if (number1 === "" || number2 === "" || operator === "") {
      alert("Por favor, preencha todos os campos.");
      return;
    }

    const operation = {
      number1,
      number2,
      operator,
    };

    const calculator = new Calculator(operation);
    calculator.calculate();
    let resultIsNumber = typeof calculator.result === "number";

    if (resultIsNumber) {
      let calculated = `${number1} ${operator} ${number2} = ${calculator.result}`;
      result.value = calculated;

      if (history.length === 0 || history[0] !== calculated) {
        history = [calculated, ...history];
      }

      updateHistoryDisplay();
    } else {
      result.value = calculator.result;
    }
  };

  // Função para mostrar mais ou menos histórico.
  const updateHistoryDisplay = () => {
    const historyElement = document.querySelector("#history");
    const showMoreButton = document.querySelector("#showMoreButton");
    const resetButton = document.querySelector("#resetButton");
    const recentHistory = showAllHistory ? history : history.slice(0, 5);

    historyElement.innerHTML = recentHistory
      .map((item) => `<li>${item}</li>`)
      .join("");

    if (history.length > 5) {
      showMoreButton.disabled = false;
      showMoreButton.textContent = showAllHistory
        ? "Mostrar menos (-)"
        : "Mostrar mais (+)";
    } else {
      showMoreButton.disabled = true;
    }

    resetButton.disabled = history.length === 0;
  };

  // Função para limpar os campos do formulário.
  const clearFields = () => {
    document.querySelector("#number1").value = "";
    document.querySelector("#number2").value = "";
    document.querySelector("#operator").value = "";
    document.querySelector("#result").value = "";
  };

  // Função para mostrar ou ocultar o histórico.
  const toggleHistoryDisplay = () => {
    showAllHistory = !showAllHistory;
    updateHistoryDisplay();
  };

  // Função para limpar o histórico.
  const resetHistory = () => {
    history = [];
    updateHistoryDisplay();
  };

  // Quando a janela carregar, configure os ouvintes de eventos.
  window.addEventListener("load", () => {
    document
      .querySelector("#calculateButton")
      .addEventListener("click", calculateHandle);

    document
      .querySelector("#clearButton")
      .addEventListener("click", clearFields);

    document
      .querySelector("#resetButton")
      .addEventListener("click", resetHistory);

    document
      .querySelector("#showMoreButton")
      .addEventListener("click", toggleHistoryDisplay);
  });

  return (
    <div className="App">
      <AppHeader />

      <main className="App-main">
        <form>
          <div>
            <label htmlFor="number1">Número 1</label>
            <input type="number" id="number1" />
          </div>
          <div>
            <label htmlFor="number2">Número 2</label>
            <input type="number" id="number2" />
          </div>
          <div>
            <label htmlFor="operator">Operação</label>
            <select id="operator">
              <option>– Selecione –</option>
              <OperatorOptions />
            </select>
          </div>
          <div>
            <label htmlFor="result">Resultado</label>
            <input type="text" id="result" disabled />
          </div>
          <div className="button-group">
            <button type="button" id="calculateButton">
              Calcular
            </button>
            <button type="button" id="clearButton">
              Limpar
            </button>
          </div>
        </form>

        <hr />
        <h3>Histórico</h3>
        <ul id="history"></ul>

        <div className="button-group">
          <button type="button" id="showMoreButton" disabled>
            Mostrar mais (+)
          </button>
          <button type="button" id="resetButton" disabled>
            Limpar Histórico
          </button>
        </div>
      </main>

      <AppFooter />
    </div>
  );
}

export default App;
