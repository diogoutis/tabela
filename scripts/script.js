document.addEventListener("DOMContentLoaded", function () {
    const tabela = document.querySelector("#tabela tbody");

    function atualizarPontos() {
        const linhas = Array.from(tabela.querySelectorAll("tr"));
        
        // Salva o elemento que está com foco
        const elementoFocado = document.activeElement;
        const valorFocado = elementoFocado ? elementoFocado.value : null;

        linhas.forEach(linha => {
            const inputsQuedas = linha.querySelectorAll(".quedas");
            const inputPontos = linha.querySelector(".pontos");

            let soma = 0;
            inputsQuedas.forEach(q => {
                soma += Number(q.value) || 0; // Evita NaN
            });

            inputPontos.value = soma;
        });

        atualizarClassificacao();

        // Restaura o foco após a reordenação
        if (elementoFocado && document.body.contains(elementoFocado)) {
            elementoFocado.focus();
            elementoFocado.value = ""; // Evita duplicação do número digitado
            elementoFocado.value = valorFocado; // Restaura o valor corretamente
        }
    }

    function atualizarClassificacao() {
        let linhas = Array.from(tabela.querySelectorAll("tr"));

        // Ordena os times com base nos pontos (maior para menor)
        linhas.sort((a, b) => {
            const pontosA = Number(a.querySelector(".pontos").value) || 0;
            const pontosB = Number(b.querySelector(".pontos").value) || 0;
            return pontosB - pontosA; // Ordem decrescente
        });

        // Reinsere as linhas na tabela na nova ordem
        linhas.forEach((linha, index) => {
            tabela.appendChild(linha);
            linha.querySelector(".rank").textContent = index + 1; // Atualiza posição
        });
    }

    // Adiciona evento de input nos campos de quedas
    tabela.addEventListener("input", function (event) {
        if (event.target.classList.contains("quedas")) {
            atualizarPontos();
        }
    });

    document.querySelectorAll('tr').forEach((linha) => {
        const timeCell = linha.querySelector('.times');
        if (timeCell && timeCell.id) {
            const timeName = timeCell.textContent.trim().replace(/\s+/g, '_');
            const inputsQuedas = linha.querySelectorAll('.quedas');
            inputsQuedas.forEach((input, i) => {
            input.name = `${timeName}_queda${i + 1}`;
        });

        const inputTotal = linha.querySelector('.pontos');
        if (inputTotal) {
            inputTotal.name = `${timeName}_total`;
        }
        }
    });

    atualizarPontos();
});
