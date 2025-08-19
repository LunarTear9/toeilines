
export const DARK_STYLE: google.maps.MapTypeStyle[] = [
  { elementType: 'geometry',        stylers: [{ color: '#222428' }] },
  { elementType: 'labels.text.fill',stylers: [{ color: '#f5f5f5' }] },
  { elementType: 'labels.text.stroke',stylers:[{ color: '#222428' }] },
  {
    featureType: 'administrative',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#9e9e9e' }]
  },
  { featureType: 'poi',   elementType: 'all',  stylers:[{ visibility:'off' }]},
  { featureType: 'road',  elementType: 'geometry', stylers:[{ color:'#373737'}]},
  { featureType: 'road',  elementType: 'labels',   stylers:[{ visibility:'off'}]},
  { featureType: 'water', elementType: 'geometry', stylers:[{ color:'#0e1626'}]}
];
