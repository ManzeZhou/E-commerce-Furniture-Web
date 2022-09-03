

export const googleAutoComplete = (setStreet, setCity, setProvince, setPostalCode, setCountry) => {
    let input = document.getElementById('autoComplete');
    let options = {
        types: ['address'],
        componentRestrictions: {
            country: 'ca'
        }
    };
    const google = window.google;
    let autocomplete =
        new google.maps.places.Autocomplete(input, options);
    autocomplete.addListener('place_changed', function() {
        let place = autocomplete.getPlace().address_components
        console.log('USE EFFECT -----> place_changed', place)
        let address = ""

        for (const component of place) {
            const componentType = component.types[0];

            switch (componentType) {
                case "street_number": {
                    address = `${component.long_name} `;
                    console.log('address', address)
                    break;
                }
                case "route": {
                    address += component.short_name;
                    console.log('route', address)
                    setStreet(address)
                    break;
                }
                case "postal_code": {
                    let postcode = `${component.long_name}`;
                    console.log('postal_code', component.long_name)
                    setPostalCode(postcode)
                    break;
                }
                case "sublocality_level_1":
                    let locality = component.long_name;
                    console.log('sublocality_level_1', component.long_name)
                    setCity(locality)
                    break;

                case "administrative_area_level_1": {
                    let province = component.short_name;
                    console.log('administrative_area_level_1', component.short_name)
                    setProvince(province)
                    break;
                }
                case "country":
                    let country = component.long_name;
                    console.log('country', component.long_name)
                    setCountry(country)
                    break;
            }
        }



    })
}