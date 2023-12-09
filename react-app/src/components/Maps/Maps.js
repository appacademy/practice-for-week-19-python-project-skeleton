import React from "react";
import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api";

const containerStyle = {
	width: "83.3rem",
	height: "25rem",
};

const Maps = ({ apiKey, latty, lngy }) => {
	const center = {
		lat: latty,
		lng: lngy,
	};

	const { isLoaded } = useJsApiLoader({
		id: "google-map-script",
		googleMapsApiKey: apiKey,
	});

	return (
		<>
			{isLoaded && (
				<GoogleMap
					mapContainerStyle={containerStyle}
					center={center}
					zoom={18}
				>
					<Marker position={center} />
				</GoogleMap>
			)}
		</>
	);
};

export default React.memo(Maps);
