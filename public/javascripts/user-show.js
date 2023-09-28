mapboxgl.accessToken =
	'pk.eyJ1IjoiZGV2bW5xb2JpIiwiYSI6ImNrOXZzampydzAyN3kzbW9neHVwNXhyNHIifQ.n6KBbWM55bcxhBIiLndN5Q';

const map = new mapboxgl.Map({
	container: 'map',
	style: 'mapbox://styles/mapbox/light-v10',
	center: user.geometry.coordinates,
	zoom: 15
});

// create a HTML element for our user location/markers
const el = document.createElement('div');
el.className = 'marker';

// make a marker for our location and add to the map
new mapboxgl.Marker(el)
	.setLngLat(user.geometry.coordinates)
	.setPopup(
		new mapboxgl.Popup({ offset: 25 }) // add popups
			.setHTML(`<h3>${user.name}</h3><p>${user.location}</p>`)
	)
	.addTo(map);

// add click listener for clearing of rating from edit/new form
$('.clear-rating').click(function () {
	$(this).siblings('.input-no-rate').click();
});
