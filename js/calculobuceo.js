
const formulario = document.getElementById('form1')
formulario.onsubmit = (evento) => {
    evento.preventDefault()
    let aire = document.getElementById('AIRE').value
    let prof = document.getElementById('Profundidad').value
    let tiempo = document.getElementById('tiempo').value
    //se paso a ternario
    // de acuerdo a cual mezcla elija el usuario va realizar el calculo aparente (osea si elije EAM32 va calcular esa profundidad si estuviera usando aire)
    aire == 'Aire' ? prof = prof
        : aire == 'EAM32' ? prof = (Number(prof) + 10) * (0.68 / 0.79) - 10
            : prof = (Number(prof) + 10) * (0.64 / 0.79) - 10
    
    //tabla de tiempos
    const array0 = [60, 120, 210, 300,]
    const array1 = [35, 70, 110, 160, 225, 350]
    const array2 = [25, 50, 75, 100, 135, 180, 240, 325]
    const array3 = [20, 35, 55, 75, 100, 125, 160, 195, 245]
    const array4 = [15, 30, 15, 60, 75, 95, 120, 145, 170, 205]
    const array5 = [5, 15, 25, 40, 50, 60, 80, 100, 120, 140, 160]
    const array6 = [5, 15, 25, 30, 40, 50, 70, 80, 100, 110, 130]
    const array7 = [null, 10, 15, 25, 30, 40, 50, 60, 70]
    const array8 = [null, 10, 15, 20, 25, 30, 40, 50]
    const array9 = [null, 5, 10, 15, 20, 30, 35, 40]
    const array10 = [null, 5, 10, 15, 20, 25, 30]
    const array11 = [null, 5, 10, 12, 15, 20, 25]
    const array12 = [null, 5, 7, 10, 15, 20]
    const array13 = [null, null, 5, 10, 13, 15]
    const array14 = [null, null, 5, 10]
    const array15 = [null, null, 5]
    //GRUPOS DE NITROGENO RESIDUAL
    let arrayGrupos = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'j', 'K']
    //TIEMPOS EN SUPERFICIE
    const residualA = [12]
    const residualB = [3.20,12]
    const residualC = [1.39,4.49,12]
    const residualD = [1.09,2.38,5.48,12]
    const residualE = [0.54,1.57,3.24,6.34,12]
    const residualF = [0.45,1.29,2.28,3.57,7.05,12]
    const residualG = [0.40,1.15,1.59,2.58,4.25,7.35,12]
    const residualH = [0.36,1.06,1.41,2.23,3.20,4.49,7.59,12]
    const residualI = [0.33,0.59,1.29,2.02,2.44,3.43,5.12,8.21,12]
    const residualJ = [0.31,0.54,1.29,1.47,2.20,3.04,4.02,5.40,8.50,12]
    const residualK = [0.28,0.49,1.11,1.35,2.03,2.38,3.21,4.19,5.48,8.58,12]

    //profundidad segun tabla
    function profundidad(prof, array) {
        (prof > 0) && (prof <= 3) ? array = array0
            : (prof > 3) && (prof <= 4.5) ? array = array1
                : (prof > 4.5) && (prof <= 6) ? array = array2
                    : (prof > 6) && (prof <= 7.5) ? array = array3
                        : (prof > 7.5) && (prof <= 9) ? array = array4
                            : (prof > 9) && (prof <= 10) ? array = array5
                                : (prof > 10) && (prof <= 12) ? array = array6
                                    : (prof > 12) && (prof <= 15) ? array = array7
                                        : (prof > 15) && (prof <= 18) ? array = array8
                                            : (prof > 18) && (prof <= 21) ? array = array9
                                                : (prof > 21) && (prof <= 24) ? array = array10
                                                    : (prof > 24) && (prof <= 27) ? array = array11
                                                        : (prof > 27) && (prof <= 30) ? array = array12
                                                            : (prof > 30) && (prof <= 34) ? array = array13
                                                                : (prof > 34) && (prof <= 37) ? array = array14
                                                                    : (prof > 37) && (prof <= 40) ? array = array15
                                                                        : '!NO se puede hacer.... se pasa los limites descompresivos'
        return array
    }
    let tiempoGrupo = profundidad(prof).find(element => element >= tiempo)
    console.log(tiempoGrupo)
    grupo = profundidad(prof).indexOf(tiempoGrupo)
    console.log(profundidad(prof))
    console.log(grupo)
    /*---------------------grafico---------------*/

    let arrayPorcentaje = [9, 18, 27, 36, 45, 54, 63, 72, 81, 90, 99]

    var colors = [
        ['#DBF0DA', '#0DAB00'], ['#DBF0DA', '#17FF04'], ['#DBF0DA', '#BDFF00'], ['#DBF0DA', '#E8FF00'], ['#DBF0DA', '#FFE800'], ['#DBF0DA', '#FFC900'], ['#DBF0DA', '#FFAE00'], ['#DBF0DA', '#FF7800'], ['#DBF0DA', '#FF6100'], ['#DBF0DA', '#FF4D00'], ['#DBF0DA', '#FF1B00']
    ],
        circles = [];

    for (var i = 1; i <= 5; i++) {
        var child = document.getElementById('circles-' + i),
            porcentaje = arrayPorcentaje[grupo]
        circle = Circles.create({
            id: child.id,
            value: porcentaje,
            text: arrayGrupos[grupo] + '%',
            textClass: 'circles-text',
            duration:            1000,
            radius: getWidth(),
            width: 60,
            colors: colors[grupo]
        });

        circles.push(circle);
    }

    window.onresize = function (e) {
        for (var i = 0; i < circles.length; i++) {
            circles[i].updateRadius(getWidth());
        }
    };

    function getWidth() {
        return window.innerWidth / 18;
    }

    // alert("tu grupo de nitrogeno residual es" + "\n" + arrayGrupos[grupo])
}








//------------------------bitacora proximamennte---------------------------------------------
// const Bitacora = document.getElementById('Bitacora')
// Bitacora.onsubmit = (e) => {
//     e.preventDefault()
//     console.log('aqcaaac')
//     if (e.target.children.length > 0) {
//         for (const elemento of e.target.children) {
//             if (
//                 elemento.tagName === 'IMPUT' &&
//                 elemento.value &&
//                 elemento.type !== 'submit') {
//                 const obj = {}
//                 obj['Name'] = elemento.name
//                 obj['valor'] = elemento.Value
//                 console.log(obj)
//                 localStorage.setItem(obj.Name, obj.valor)

//             }
//         }

//     }
// }