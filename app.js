// CONEXION A LA BASE DE DATOS DESDE NODE

const express = require('express');

const mysql = require('mysql2')

var app = express()

var bodyParser = require('body-parser');

// CONEXION A LA BASE DE DATOS
var con = mysql.createConnection({

    host : 'localhost',
    user : 'root',
    port : 8000,
    password : 'n0m3l0',
    database : 'aseguradora'

});

con.connect();

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({

    extended : true

}));

// ARCHIVOS DE LA RUTA QUE SON PUBLICOS
app.use(express.static('public'));

// METODO POST AGREGAR ORDENES DE ASEGURADORA
app.post('/agregarOrden' , (req , res) =>{

    let nombre = req.body.nombreCliente;
    let numero = req.body.numeroCliente;
    let direccion = req.body.direccionCliente;
    let modelo = req.body.modeloVehiculo;
    let marca = req.body.marcaVehiculo;

    if(nombre != '' && (parseInt(numero) && parseInt(numero) > 0) && direccion != '' && modelo != '' && marca != ''){
        
        // INSERCCION Y VALIDACION
        con.query('insert into Ordenes(ord_cli, ord_num, ord_dir, ord_mod, ord_mar) values("' + nombre + '" , "' + numero + '" , "' + direccion + '" , "' + modelo + '" , "' + marca + '")' , (err , respuesta , fields) =>{

            if(err){
                
                return console.log(error);
            
            }
            else{

                // DAR NUMERO DE ORDEN Y REGRESAR
                con.query('select Ordenes.ord_id from Ordenes where Ordenes.ord_cli = "' + nombre + '"' , (error , response , fieldss) =>{

                    // SIMILAR AL SERVLET
                    var idOrden = Object.values(response[0]);
                    res.send('<!DOCTYPE html>'+
                            '<html>'+
                                '<head>'+
                                '<meta charset="UTF-8">'+
                                '<meta http-equiv="X-UA-Compatible" content="IE=edge">'+
                                '<meta name="viewport" content="width=device-width, initial-scale=1.0">'+
                                '<title>AGREGADO CORRECTAMENTE</title>'+
                            '</head>'+
                            '<body>'+
                                '<style>'+

                                '*{'+

                                    'font-family: sans-serif;'+
                                    'padding: 0;'+
                                    'margin: 0;'+
                            
                                '}'+

                                'body{'+
                                    
                                    'background-image: url("../JPG/PALOMITA.jpg");'+
                                    'background-repeat: no-repeat;'+
                                    'background-size: 100% 100%;'+
                                
                                '}'+
                                
                                'body::before{'+
                                    'content : "";'+
                                    'width: 100%;'+
                                    'min-height: 100vh;'+
                                    'position: absolute;'+
                                    'top: 0;'+
                                    'left: 0;'+
                                    'background: linear-gradient(315deg, rgb(204, 242, 229), rgb(204, 242, 229));'+
                                    'opacity: .5;'+
                                    'z-index: -1;'+
                                '}'+

                                'header{'+
                                    
                                        'background-color: rgb(33, 101, 78);'+
                                        'padding: 2rem;'+
                                    
                                '}'+
                                
                                'div{'+

                                    'margin-left: 425px;'+
                                    'margin-top: 90px;'+
                                    'background-color: rgba(33, 101, 78, 0.64);'+
                                    'width: 675px;'+
                                    'padding: .5rem;'+
                                    'border: 10px solid rgb(33, 101, 78);'+
                                    'margin-bottom: 320px;'+

                                '}'+

                                'footer{'+
                                    
                                    'background-color: rgb(33, 101, 78);'+
                                    'padding: 1.5rem;'+
                                
                                '}'+

                                'a{'+
                                    
                                    'color: green;'+
                                    'padding-bottom: 10px;'+
                                
                                '}'+

                                '</style>'+
                                '<header>'+
                                    '<h1>ASEGURADORAS RUIZ</h1>'+
                                '</header>'+
                                '<div>'+
                                    '<h1>TU ORDEN SE REGISTRO CORRECTAMENTE CON UN IDENTIFICADOR ' + idOrden + '</h1>'+
                                    '<br><br>'+
                                    '<h1>NO PIERDAS ESTE NUMERO, CON ESTE PODRAS CONSULTAR TU ORDEN</h1>'+
                                '</div>'+
                                '<a href="http://localhost:8000/">'+
                                    'VUELVE A LA REGISTRADORA'+
                                '</a>'+
                                '<footer>'+
                                    '<b>EMILIO RUIZ BETANZOS || 5IV7</b>'+
                                '</footer>'+
                            '</body>'+
                            '</html>');

                });

            }
        
        });

    }
    else{

        // ERROR EN EL LLENADO DE DATOS
        res.sendFile(__dirname + '/PUBLIC/error.html')

    }

});

// METODO PARA ELIMINAR DATOS
app.post('/eliminarOrden' , (req , res) =>{

    // DATOS DESDE EL SERVLET DE CONSULTA
    let IDOrden = req.body.IDOrden;

    if(IDOrden != ''){

        con.query('delete from Ordenes where Ordenes.ord_id = "' + IDOrden + '"' , (e , r , f) =>{

            if(e){ return console.log(e)}

            else{

                // REDIRIGIR A LA PAGINA PRINCIPAL DE REGISTRO POR ELIMINACION EXITOSA
                res.send('<!DOCTYPE html>'+
                        '<html>'+
                            '<head>'+
                            '<meta charset="UTF-8">'+
                            '<meta http-equiv="X-UA-Compatible" content="IE=edge">'+
                            '<meta name="viewport" content="width=device-width, initial-scale=1.0">'+
                            '<title>ELIMINADO CORRECTAMENTE</title>'+
                        '</head>'+
                        '<body>'+
                            '<style>'+

                            '*{'+

                                'font-family: sans-serif;'+
                                'padding: 0;'+
                                'margin: 0;'+
                        
                            '}'+

                            'body{'+
                                
                                'background-image: url("../JPG/PALOMITA.jpg");'+
                                'background-repeat: no-repeat;'+
                                'background-size: 100% 100%;'+
                            
                            '}'+
                            
                            'body::before{'+
                                'content : "";'+
                                'width: 100%;'+
                                'min-height: 100vh;'+
                                'position: absolute;'+
                                'top: 0;'+
                                'left: 0;'+
                                'background: linear-gradient(315deg, rgb(204, 242, 229), rgb(204, 242, 229));'+
                                'opacity: .5;'+
                                'z-index: -1;'+
                            '}'+

                            'header{'+
                                
                                    'background-color: rgb(33, 101, 78);'+
                                    'padding: 2rem;'+
                                
                            '}'+
                            
                            'div{'+

                                'margin-left: 425px;'+
                                'margin-top: 90px;'+
                                'background-color: rgba(33, 101, 78, 0.64);'+
                                'width: 675px;'+
                                'padding: .5rem;'+
                                'border: 10px solid rgb(33, 101, 78);'+
                                'margin-bottom: 320px;'+

                            '}'+

                            'footer{'+
                                
                                'background-color: rgb(33, 101, 78);'+
                                'padding: 1.5rem;'+
                            
                            '}'+

                            'a{'+
                                
                                'color: green;'+
                                'padding-bottom: 10px;'+
                            
                            '}'+

                            '</style>'+
                            '<header>'+
                                '<h1>ASEGURADORAS RUIZ</h1>'+
                            '</header>'+
                            '<div>'+
                                '<h1>SE ELIMINO CORRECTAMENTE LA ORDEN</h1>'+
                                '<br><br>'+
                                '<h1>GRACIAS POR SU PREFERENCIANTE</h1>'+
                            '</div>'+
                            '<a href="http://localhost:8000/">'+
                                '<b>VUELVE A LA REGISTRADORA</b>'+
                            '</a>'+
                            '<footer>'+
                                '<b>EMILIO RUIZ BETANZOS || 5IV7</b>'+
                            '</footer>'+
                        '</body>'+
                        '</html>');

            }

        });

    }
    else{

        res.sendFile(__dirname + '/PUBLIC/error.html');

    }

});

// METODO PARA ACTUALIZACION DE DATOS
app.post('/actualizarOrden' , (req , res) =>{

    // DATOS DESDE EL SERVLET DE CONSULTA
    let IDORden = req.body.IDORden;
    let nombreActualizado = req.body.nombreOrdenConsultada;
    let numeroActualizado = req.body.numeroOrdenConsultada;
    let direccionActualizada = req.body.direccionOrdenConsultada
    let modeloActualizado = req.body.modeloOrdenConsultada;
    let marcaActualizada = req.body.marcaOrdenConsultada;

    if(nombreActualizado != '' && (parseInt(numeroActualizado) && parseInt(numeroActualizado) > 0) && direccionActualizada != '' && modeloActualizado != '' && marcaActualizada != ''){

        con.query('update Ordenes set Ordenes.ord_cli = "' + nombreActualizado + '", Ordenes.ord_num = "' + numeroActualizado + '", Ordenes.ord_dir = "' + direccionActualizada + '", Ordenes.ord_mod = "' + modeloActualizado + '", Ordenes.ord_mar = "' + marcaActualizada + '" where Ordenes.ord_id = "' + IDORden + '"' , (e , r , f) =>{

            // SERVLET DE ACTUALIZACION CORRECTA DE LOS DATOS
            res.send('<!DOCTYPE html>'+
                    '<html>'+
                        '<head>'+
                        '<meta charset="UTF-8">'+
                        '<meta http-equiv="X-UA-Compatible" content="IE=edge">'+
                        '<meta name="viewport" content="width=device-width, initial-scale=1.0">'+
                        '<title>ACTUALIZADO CORRECTAMENTE</title>'+
                    '</head>'+
                    '<body>'+
                        '<style>'+

                        '*{'+

                            'font-family: sans-serif;'+
                            'padding: 0;'+
                            'margin: 0;'+
                    
                        '}'+

                        'body{'+
                            
                            'background-image: url("../JPG/PALOMITA.jpg");'+
                            'background-repeat: no-repeat;'+
                            'background-size: 100% 100%;'+
                        
                        '}'+
                        
                        'body::before{'+
                            'content : "";'+
                            'width: 100%;'+
                            'min-height: 100vh;'+
                            'position: absolute;'+
                            'top: 0;'+
                            'left: 0;'+
                            'background: linear-gradient(315deg, rgb(204, 242, 229), rgb(204, 242, 229));'+
                            'opacity: .5;'+
                            'z-index: -1;'+
                        '}'+

                        'header{'+
                            
                                'background-color: rgb(33, 101, 78);'+
                                'padding: 2rem;'+
                            
                        '}'+
                        
                        'div{'+

                            'margin-left: 425px;'+
                            'margin-top: 90px;'+
                            'background-color: rgba(33, 101, 78, 0.64);'+
                            'width: 675px;'+
                            'padding: .5rem;'+
                            'border: 10px solid rgb(33, 101, 78);'+
                            'margin-bottom: 320px;'+

                        '}'+

                        'footer{'+
                            
                            'background-color: rgb(33, 101, 78);'+
                            'padding: 1.5rem;'+
                        
                        '}'+

                        'a{'+
                            
                            'color: green;'+
                            'padding-bottom: 10px;'+
                        
                        '}'+

                        '</style>'+
                        '<header>'+
                            '<h1>ASEGURADORAS RUIZ</h1>'+
                        '</header>'+
                        '<div>'+
                            '<h1>LA ORDEN CON IDENTIFICADOR ' + IDORden + '</h1>'+
                            '<br><br>'+
                            '<h1>SE ACUTALIZO CORRECTAMENTE</h1>'+
                        '</div>'+
                        '<a href="http://localhost:8000/">'+
                            '<b>VUELVE A LA REGISTRADORA</b>'+
                        '</a>'+
                        '<footer>'+
                            '<b>EMILIO RUIZ BETANZOS || 5IV7</b>'+
                        '</footer>'+
                    '</body>'+
                    '</html>');

        });
    
    }
    else{

        res.sendFile(__dirname + '/PUBLIC/error.html');

    }

});

// METODO PARA CONSULTA DE DATOS
app.post('/consultarOrden' , (req , res) =>{

    // ID DE LA ORDEN
    let claveOrden = req.body.claveOrden;

    if(claveOrden != ''){

        con.query('select Ordenes.ord_id, Ordenes.ord_cli, Ordenes.ord_num, Ordenes.ord_dir, Ordenes.ord_mod, Ordenes.ord_mar from Ordenes where Ordenes.ord_id = "' + claveOrden + '"' , (e , r , f) =>{

            //SIMILAR AL SERVLET
            var idOrden = Object.values(r[0]);

            if(idOrden[0] == undefined){

                res.send('<!DOCTYPE html>'+
                        '<html>'+
                            '<head>'+
                            '<meta charset="UTF-8">'+
                            '<meta http-equiv="X-UA-Compatible" content="IE=edge">'+
                            '<meta name="viewport" content="width=device-width, initial-scale=1.0">'+
                            '<title>DATOS DE LA ORDEN</title>'+
                        '</head>'+
                        '<body>'+
                            '<header>'+
                                '<h2>ASEGURADORAS RUIZ</h2>'+
                            '</header>'+
                            '<style>'+ // ESTILOS DE ACTUALIZACION Y ELIMINACION DE LA ORDEN
                            '*{'+

                                'font-family: sans-serif;'+
                                'padding: 0;'+
                                'margin: 0;'+
                            
                            '}'+
                            
                            'body{'+
                            
                                'background-image: url("../JPG/KIA.jpg");'+
                                'background-repeat: no-repeat;'+
                                'background-size: 100% 100%;'+
                            
                            '}'+
                            
                            'body::before{'+
                                'content : "";'+
                                'width: 100%;'+
                                'min-height: 130vh;'+
                                'position: absolute;'+
                                'top: 0;'+
                                'left: 0;'+
                                'background: linear-gradient(315deg, rgb(204, 242, 229), rgb(204, 242, 229));'+
                                'opacity: .5;'+
                                'z-index: -1;'+
                            '}'+
                            
                            'header{'+
                            
                                'background-color: rgb(33, 101, 78);'+
                                'padding: 2rem;'+
                            
                            '}'+
                            
                            'footer{'+
                            
                                'background-color: rgb(33, 101, 78);'+
                                'padding: 1.5rem;'+
                            
                            '}'+
                            
                            'form{'+

                                'margin-left: 425px;'+
                                'margin-top: 90px;'+
                                'background-color: rgba(33, 101, 78, 0.64);'+
                                'width: 675px;'+
                                'padding: .5rem;'+
                                'border: 10px solid rgb(33, 101, 78);'+
                            
                            '}'+
                            
                            'table{'+
                            
                                'padding: 2rem;'+
                            
                            '}'+
                            
                            '#tablaVehiculo{'+
                            
                                'margin-left: 90px;'+
                            
                            '}'+

                            '#borrarOrden{'+

                                'margin-bottom: 2rem;'+

                            '}'+
                            
                            'td{'+
                            
                                'padding: 1rem;'+
                            
                            '}'+
                            
                            '#registrarOrden{'+
                            
                                'font-family:Verdana, Geneva, Tahoma, sans-serif;'+
                                'margin-left: 16.5rem;'+
                                'padding: .5rem;'+
                                'color: black;'+
                                'background-color: rgb(76, 164, 135);'+
                                'border: 2px solid rgb(76, 164, 135);'+
                            
                            '}'+
                            
                            '#contenedorActualizacion{'+

                                'margin-left: 10rem;'+

                            '}'+

                            '#contenedorLink{'+
                            
                                'margin-top: 3rem;'+
                                'padding-bottom: 1rem;'+
                            
                            '}'+
                            
                            'a{'+
                            
                                'color: green;'+
                                'padding-bottom: 10px;'+
                            
                            '}'+
                            '</style>'+
                            '<div id="">'+
                                '<form action="/actualizarOrden" method="post">'+
                                    '<table>'+
                                        '<caption><h2>DATOS DEL CLIENTE (PUEDE MODIFICARLOS)</h2></caption>'+
                                        '<tr>'+
                                            '<th>NOMBRE</th>'+
                                            '<th>NUMERO</th>'+
                                            '<th>DIRECCION</th>'+
                                        '</tr>'+
                                        '<tr>'+
                                            '<td><input name = "nombreOrdenConsultada" value = "' + idOrden[1] + '"></td>'+
                                            '<td><input name = "numeroOrdenConsultada" value = "' + idOrden[2] + '"></td>'+
                                            '<td><input name = "direccionOrdenConsultada" value = "' + idOrden[3] + '"></td>'+
                                        '</tr>'+
                                    '</table>'+
                                    '<table id="tablaVehiculo">'+
                                        '<caption><h2>DATOS DEL VEHICULO</h2></caption>'+
                                        '<tr>'+
                                            '<th>MODELO</th>'+
                                            '<th>MARCA</th>'+
                                        '</tr>'+
                                        '<tr>'+
                                            '<td><input name = "modeloOrdenConsultada" value = "' + idOrden[4] + '"></td>'+
                                            '<td><input name = "marcaOrdenConsultada" value = "' + idOrden[5] + '"></td>'+
                                        '</tr>'+
                                    '</table>'+
                                    '<div id = "contenedorActualizacion">'+    
                                        '<label><b>QUIERES ACTUALIZAR ESTA ORDEN</b></label>'+
                                        '<br><br>'+
                                        '<input readonly = "readonly" name="IDORden" value = "' + idOrden[0] + '">'+
                                        '<br><br>'+
                                        '<input type="submit" value = "ACTUALIZAR">'+ // EN CASO DE ACTUALIZAR
                                    '</div>'+
                                '</form>'+
                                '<form id="borrarOrden" action="/eliminarOrden" method="post">'+
                                    '<div id="contenedorActualizacion">'+
                                        '<label><b>QUIERES BORRAR ESTA ORDEN</b></label>'+
                                        '<br><br>'+
                                        '<input readonly = "readonly" name="IDOrden" value = "' + idOrden[0] + '">'+
                                        '<br><br>'+
                                        '<input type="submit" value = "BORRAR">'+ // EN CASO DE ELIMINAR
                                    '</div>'+
                                '</form>'+
                                '<b><a href="http://localhost:8000/">VOLVER A LA REGISTRADORA</a></b>'+
                            '</div>'+
                            '<footer>'+
                                '<b>EMILIO RUIZ BETANZOS || 5IV7</b>'+
                            '</footer>'+
                        '</body>'+
                        '</html>');

                    }
                    else{

                        res.sendFile(__dirname + '/PUBLIC/error.html');
                
                    }

        });

    }
    else{

        res.sendFile(__dirname + '/PUBLIC/error.html');

    }

});

const port=process.env.PORT || 8000;
app.listen(port,()=>{
    console.log("Server on port "+port);
});