import DS from 'ember-data';

export default DS.Model.extend({
  name: DS.attr('string'),

  idPropiedad: DS.attr(),
  direccionPropiedad: DS.attr(),
  zonaDireccion: DS.attr(),
  titleEn: DS.attr(),
  titleEs: DS.attr(),
  descriptionEn: DS.attr(),
  descriptionEs: DS.attr(),
  precioAntiguo: DS.attr(),
  precioAlquiler: DS.attr()


  //   mapa-lat: 39.5160831,
  // mapa-lng: -0.416378,
  // direccion-fisica: "",
  // cp: "",
  // ano-constr: 0,
  // num-habitaciones: true,
  // num-banos: true,
  // num-aseos: "",
  // m-parcela: 0,
  // m-construidos: 110,
  // num-garajes: true,
  // mapa-zoom: true,
  // pano-yaw: 0,
  // pano-pitch: 0,
  // pano-zoom: true,
  // comision: 0,
  // cuota-comunidad: 0,
  // valor-catastral: 0,
  // ref-catastral: "",
  // valor-tasacion: 0,
  // escrituras: false,
  // hipoteca: false,
  // llaves: false,
  // llaves-situacion: "",
  // observaciones-venta: "",
  // video: "",
  // precio-antiguo: 0,
  // precio-alquiler: 0,
  // temporadas: false,
  // precio-ta: 0,
  // precio-tm: 0,
  // precio-tb: 0,
  // id-etiqueta: false,
  // extras: "15,31,55,43,50",
  // id-origen-propiedad: 1,
  // url-eficiencia: "",
  // eficiencia-energia: "1",
  // yaencontre: false,
  // idealista: false,
  // pisoscom: true,
  // direccionPropiedad: DS.attr('number'),
  // repos: DS.hasMany('repo')
});
