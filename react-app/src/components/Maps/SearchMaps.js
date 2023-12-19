import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getKey } from "../../store/maps";
import SearchMaps from "./SearchMaps2";

const SearchMapContainer = ({ restaurants }) => {
	const key = useSelector((state) => state.maps.key);
	const dispatch = useDispatch();

	useEffect(() => {
		if (!key) {
			dispatch(getKey());
		}
	}, [dispatch, key]);

	if (!key) {
		return null;
	}

	return <SearchMaps apiKey={key} res={restaurants} />;
};

export default SearchMapContainer;
