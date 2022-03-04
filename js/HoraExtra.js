window.onload = function() {
    
};

$(document).on('change', "#matricula",
    function autoname() {
        var matricula = $('#matricula').val()[0];
        var c1 = DatasetFactory.createConstraint("matricula", matricula, matricula, ConstraintType.MUST);
        var constraints = new Array(c1);
        var dataset = DatasetFactory.getDataset("DSFormulariodeCadastrodeFuncionario", null, constraints, null);
        var nome = dataset.values[0].name_func;
        $("#nameFunc").val(nome);
    }
);


function DiasDoMes(mes, ano) {
    var dias = new Date(ano, mes, 0);
    return dias.getDate();
};

function registro() {

    var dataValid = $('#dateRegist').val();
    if (dataValid != "") {

        var diaSemana = ['Domingo', 'Segunda-Feira', 'Terça-Feira', 'Quarta-Feira',  'Quinta-Feira', 'Sexta-Feira','Sabado'];
        var data = $('#dateRegist').val();
        var ano = data.substring(0, 4);
        var mes = data.substring(5, 7);
        var dia = data.substring(8, 10);

        var dateInfo = new Date(ano, mes, dia);
        var nDay = dateInfo.getDay();

        var matricula = $('#matricula').val()[0];

        var c1 = DatasetFactory.createConstraint("matricula", matricula, matricula, ConstraintType.MUST);
        var constraints = new Array(c1);
        var dataset = DatasetFactory.getDataset("DSFormulariodeCadastrodeFuncionario", null, constraints, null);
        //console.log(dataset);

        var dataRegist = dia+'/'+mes+'/'+ano;

        var c2 = DatasetFactory.createConstraint("matricula", matricula, matricula, ConstraintType.MUST);
        var c3 = DatasetFactory.createConstraint("date_log", dataRegist, dataRegist, ConstraintType.MUST);
        var constraints2 = new Array(c2, c3);
        var valid = DatasetFactory.getDataset("DSFormulariodeHoraExtra", null, constraints2, null);

        console.log(valid);
        
        var nRow = valid.values.length; 

        if(nRow == 0) {

            var extra = $('#he').val();
            if(extra == "") {
                extra = '00:00'
            }

            console.log(nDay);

            if (nDay != 0 && nDay != 6) {
                $('#date_log').val(dia+'/'+mes+'/'+ano);
                $('#day_log').val(diaSemana[nDay]);
                $('#he_log').val(extra);
            }
            else {
                $('#date_log').val(dia+'/'+mes+'/'+ano);
                $('#day_log').val(diaSemana[nDay]);
                $('#he_log').val(extra);
            }
            $('#day_1').removeClass('nav-close');
            $('#painel1').addClass('nav-close');
            $('#painel2').addClass('nav-close');
            
            
        }
        else {

            if(getMobile() == "true") {
                $('#banner_danger').removeClass('nav-close');
                $('#banner_danger').addClass('bannerStage1');

                setTimeout(function(){
                    $('#banner_danger').removeClass('bannerStage1');
                    $('#banner_danger').addClass('bannerStage2');
                    setTimeout(function(){
                        $('#banner_danger').addClass('nav-close');
                        $('#banner_danger').removeClass('bannerStage2');
                    }, 2000);
                }, 5000);
            } else {
                alert('Ops! Você já realizou um apontamento nessa data.');
            }
        }
    } else {
        alert('Preencha corretamente a data desejada!');
    }

}

function cancelar() {
    $("#date_log").val("");
    $("#day_log").val("");
    $("#he_log").val("");

    $('#day_1').addClass('nav-close');
}

function save() {
    var dataset = DatasetFactory.getDataset("processAttachment", null, null, null);
    var nRow = dataset.values.length;

    var nProcess = dataset.values[nRow-1]['processAttachmentPK.processInstanceId'];
    var matricula = $('#matricula').val();

    $("#desc_form").val(nProcess+' - '+matricula);
   
}

$("#btn-send").click(function(){
    save();

    if (getMobile() != "true") {
        $("#workflowActions > button:first-child", window.parent.document).click();
    } else {
        $('#day_1').addClass('nav-close');
        $('#jumbotron').addClass('nav-close');
        $('#arrow').removeClass('nav-close');
    } 
});