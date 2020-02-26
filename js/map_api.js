ymaps.ready(function () {
  var myMap = new ymaps.Map('map', {
          center: [59.938635, 30.323118],
          zoom: 18,
          controls: ['zoomControl', 'routeButtonControl']
      }),

      MyIconContentLayout = ymaps.templateLayoutFactory.createClass(
          '<div style="color: #9e1708; background-color: #ffffff; border-radius: 5px;' +
          'padding:5px; font-weight: bold; width: 130px; text-align: left; opacity: 90%">$[properties.iconContent]</div>'
      ),

      myPlacemarkWithContent = new ymaps.Placemark([59.938635, 30.323118], {
          iconContent: 'Большая Конюшенная ул., 19',
          hintContent: 'Большая Конюшенная ул., 19',
      }, {
          iconLayout: 'default#imageWithContent',
          iconImageHref: 'img/map-marker.png',
          iconImageSize: [22, 44],
          iconImageOffset: [-11, -44],
          iconContentOffset: [28, 22],
          iconContentLayout: MyIconContentLayout
      });

  myMap.geoObjects
      .add(myPlacemarkWithContent);
});