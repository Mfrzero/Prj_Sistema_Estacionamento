document.getElementById('formulario').addEventListener('submit', cadastraVeiculo);

function cadastraVeiculo(e) {
    var tipoVeiculo = document.getElementById('tipo_Veiculo').value;
    var modeloVeiculo = document.getElementById('modeloVeiculo').value;
    var placaVeiculo = document.getElementById('placaVeiculo').value;
    var time = new Date();

    //Verificar se todos os campos estão preenchidos..
    if ((!modeloVeiculo && !placaVeiculo) || !modeloVeiculo || !placaVeiculo) {

        alert("Entre com os dados...");
        return false;

    }

    cadastraVeiculo = {
        veiculo: tipoVeiculo,
        modelo: modeloVeiculo,
        placa: placaVeiculo,
        hora: time.getHours(),
        minutos: time.getMinutes()
    }


    console.log(cadastraVeiculo);

    if (localStorage.getItem('patio') === null) {
        var cadastraVeiculos = [];
        cadastraVeiculos.push(cadastraVeiculo);
        localStorage.setItem('patio', JSON.stringify(cadastraVeiculos));

    } else {
        var cadastraVeiculos = JSON.parse(localStorage.getItem('patio'));
        cadastraVeiculos.push(cadastraVeiculo);
        localStorage.setItem('patio', JSON.stringify(cadastraVeiculos));
    }

    //Para remover dados após cadastrar... 
    document.getElementById('formulario').reset();

    mostraPatio();

    e.preventDefault();
}



//Função deletar veículo
function deleteCar(placa) {

    var cadastraVeiculos = JSON.parse(localStorage.getItem('patio'));

    for (var i = 0; i < cadastraVeiculos.length; i++) {
        if (cadastraVeiculos[i].placa == placa) {
            cadastraVeiculos.splice(i, 1);

        }

        localStorage.setItem('patio', JSON.stringify(cadastraVeiculos));

    }

    mostraPatio();

}

//Função para mostrar o patio
function mostraPatio() {
    var cadastraVeiculos = JSON.parse(localStorage.getItem('patio'));
    var cadastraVeiculosResultado = document.getElementById('resultados');

    cadastraVeiculosResultado.innerHTML = '';

    for (var i = 0; i < cadastraVeiculos.length; i++) {
        var automovel = cadastraVeiculos[i].veiculo;
        var modelo = cadastraVeiculos[i].modelo;
        var placa = cadastraVeiculos[i].placa;
        var hora = cadastraVeiculos[i].hora;
        var minutos = cadastraVeiculos[i].minutos;

        cadastraVeiculosResultado.innerHTML += '<tr><td>' + automovel +'</td>' + '<td>' + modelo + '</td>' +
            '<td>' + placa + '</td>' +
            '<td>' + hora + ':' + minutos + '</td>' +
            '<td><button class="btn btn-danger" onclick="deleteCar(\'' + placa + '\')">Delete</button><td/>' +
            '</tr>';
    }
}