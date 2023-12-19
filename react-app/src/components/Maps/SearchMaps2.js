import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import {
	GoogleMap,
	useJsApiLoader,
	Marker,
	InfoWindow,
} from "@react-google-maps/api";

const containerStyle = {
	width: "83.3rem",
	height: "49rem",
	borderRadius: "0.3rem",
};

const SearchMaps = ({ apiKey, res }) => {
	const [selectedPlace, setSelectedPlace] = useState(null);
	const history = useHistory();

	const center = {
		lat: 39.34906,
		lng: -101.7229,
	};

	const { isLoaded } = useJsApiLoader({
		id: "google-map-script",
		googleMapsApiKey: apiKey,
	});

	const onMarkerClick = (place, index) => {
		setSelectedPlace({ ...place, index: index + 1 });
	};
	return (
		<>
			{isLoaded && (
				<GoogleMap
					mapContainerStyle={containerStyle}
					center={center}
					zoom={4}
				>
					{res?.map((rest, index) => (
						<React.Fragment key={rest?.id}>
							<Marker
								position={{ lat: rest?.lat, lng: rest?.lng }}
								onClick={() => onMarkerClick(rest, index)}
								label={{ text: `${index + 1}`, color: "white" }}
							/>

							{selectedPlace && selectedPlace?.id === rest?.id && (
								<InfoWindow
									position={{ lat: rest?.lat, lng: rest?.lng }}
									onCloseClick={() => setSelectedPlace(null)}
								>
									<div className="marker-tester">
										<div>
											<img
												id="marker-rest-img"
												src={rest?.images[0]?.url}
												alt="preview of restaurant"
											/>
										</div>
										<div
											id="marker-rest-name"
											onClick={(e) => {
												e.preventDefault();
												history.push(
													`/restaurants/${rest?.id}`
												);
											}}
										>
											{selectedPlace?.index}. {rest?.name}{" "}
										</div>
										<div className="marker-info-window">
											<div className="marker-rating-container">
												<div>
													{!rest.reviews?.length ? (
														<div id="marker-new-text">
															New
														</div>
													) : (
														<div className="marker-star-rating-both">
															<div>
																<i
																	id="marker-star"
																	className="fa-solid fa-star"
																></i>
															</div>
															<div id="marker-rest-rating">
																<div>
																	{
																		rest.rating
																	}
																</div>
															</div>
														</div>
													)}
												</div>
												<div id="marker-center-dot">
													·
												</div>
												<div>{rest.category}</div>
												<div id="marker-center-dot">
													·
												</div>
												<div>
													{rest.price === 1
														? "$"
														: rest.price === 2
														? "$$"
														: rest.price === 3
														? "$$$"
														: rest.price === 4
														? "$$$$"
														: ""}
												</div>
											</div>
										</div>
									</div>
								</InfoWindow>
							)}
						</React.Fragment>
					))}
				</GoogleMap>
			)}
		</>
	);
};

export default React.memo(SearchMaps);
