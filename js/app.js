const Table = (function () {
  const data = {
    typeSelected: false,
    urlTable1: 'js/tabla_1.json',
    urlTable2: 'js/tabla_2.json',
    indexTabla1: [
      {
        id: "codigo",
        name: "Código"
      },
      {
        id: "expediente",
        name: "Expediente"
      },
      {
        id: "pais-origen",
        name: "País origen"
      },
      {
        id: "origen",
        name: "Origen"
      },
      {
        id: "destino",
        name: "destino"
      },
      {
        id: "largo-total",
        name: "Largo total"
      },
      {
        id: "ancho-total",
        name: "Ancho total"
      },
      {
        id: "alto-total",
        name: "Alto total"
      },
      {
        id: "peso-total",
        name: "Peso total"
      },
      {
        id: "vehiculo-apoyo",
        name: "Vehiculo Apoyo"
      },
      {
        id: "razon-social",
        name: "Razón social"
      },
      {
        id: "representante-legal",
        name: "Representante legal"
      },
      {
        id: "observacion",
        name: "Observación"
      },
      {
        id: "notificacion-observacion",
        name: "NotifObservación"
      },
      {
        id: "subsanado",
        name: "Subsanado"
      },
      {
        id: "notificacion-autorizacion",
        name: "Notificado Autorización"
      },
      {
        id: "especialista",
        name: "Especialista"
      },
      {
        id: "estado",
        name: "Estado"
      }
    ],
    indexTabla2: [
      {
        id: "expediente",
        name: "Expediente"
      },
      {
        id: "fecha-exp",
        name: "Fecha Exp"
      },
      {
        id: "certificado",
        name: "Certificado"
      }, 
      {
        id: "placa",
        name: "Placa"
      },
      {
        id: "categoria",
        name: "Categoría"
      },
      {
        id: "tipo",
        name: "Tipo"
      },
      {
        id: "descripcion",
        name: "Descripción"
      },
      {
        id: "ruc",
        name: "RUC"
      },
      {
        id: "razon-social",
        name: "Razon Social"
      },
      {
        id: "tipo-doc-ident",
        name: "Tipo Doc. Indentifi"
      },
      {
        id: "representante-legal",
        name: "Representante Legal"
      },
      {
        id: "observacion",
        name: "Observación"
      },
      {
        id: "notificacion-observacion",
        name: "NotifObservación"
      },
      {
        id: "subsanado",
        name: "Subsanado"
      },
      {
        id: "permiso",
        name: "Permiso"
      },
      {
        id: "notificado",
        name: "Notificado"
      },
      {
        id: "especialista",
        name: "Especialista"
      },
      {
        id: "estado",
        name: "Estado"
      },
      {
        id: "accion",
        name: "Acción"
      },
    ]
  };

  // const events = {
  //   example: function () {
  //     data.example.addEventListener('click', () => {

  //     });
  //   }
  // };

  const methods = {
    queryAxios: function (_url, _callback) {
      axios.get(_url, {
        responseType: 'json'
      })
        .then(function (res) {
          if (res.status == 200) {
            let info = res.data.result
            _callback(info)
          }
        })
        .catch(function (err) {
          console.log(err)
        });
    },
    getDataTable: function (_url, _table, _index) {
      methods.queryAxios(_url, (data) => {
        if (data != null) {
          methods.makeTableBody(data, _table, _index)
          methods.makeTableHeader(_index, _table)
        }
        else
          console.log('error')
      });
    },
    makeTableBody: function (_data, _table, _index) {
      const tBody = document.querySelector(`.${_table} table tbody`)
      for (let i = 0; i < _data.length; i++) {
        let renderInput = i == 0 ? true : false

        renderInput ?
          rowInputs = document.createElement('tr') : true
        let row = document.createElement('tr')
        for (let y = 0; y < _index.length; y++) {
          if (renderInput) {
            let cellInput = document.createElement('td')
            cellInput.appendChild(document.createElement('input'))
            rowInputs.appendChild(cellInput)
          }
          let cell = document.createElement('td')
          let textCell = document.createTextNode(_data[i][_index[y].id])
          cell.appendChild(textCell)
          row.appendChild(cell)
          if (y == _index.length - 1 && _table == 'tabla-1') {
            row.appendChild(methods.makeOptions())
          }
        }
        renderInput ? tBody.appendChild(rowInputs) : true
        tBody.appendChild(row);
      }
    },
    makeTableHeader: function (_data, _table) {
      const lengthHeader = _data.length;
      const tHead = document.querySelector(`.${_table} table thead tr`)
      for (let i = 0; i < lengthHeader; i++) {
        let cell = document.createElement('td')
        let textCell = document.createTextNode(_data[i].name)
        cell.appendChild(textCell)
        tHead.appendChild(cell)
      }
    },
    makeOptions: function () {
      let cell = document.createElement('td')
      cell.innerHTML = `<div class="more-ops">
                          <div class="circles">
                            <span>stop_circle</span>
                            <span>stop_circle</span>
                            <span>stop_circle</span>
                          </div>
                          <div>
                            <ul>
                              <li><span>description</span> Detalle de solicitud</li>
                              <li><span>folder_open</span>Detalle de Expediente</li>
                              <li><span>settings</span>Subsanación</li>
                            </ul>
                          </div>
                        </div>`
      return cell
    }
  };

  const initialize = function () {
    methods.getDataTable(data.urlTable1, 'tabla-1', data.indexTabla1)
    methods.getDataTable(data.urlTable2, 'tabla-2', data.indexTabla2)
  };

  return {
    init: initialize
  };
})();


document.addEventListener(
  'DOMContentLoaded',
  function () {
    Table.init();
  },
  false
);
