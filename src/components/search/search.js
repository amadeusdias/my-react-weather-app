import { AsyncPaginate } from "react-select-async-paginate";
import { GEO_API_URL, geoApiOptions } from "../../api";
import { useState } from "react";

const Search = ({ onSearchChange }) => {

    const [search, setSearch] = useState(null);

    const loadOptions = (inputValue) => {
        return fetch(
            `${GEO_API_URL}/cities?minPopulation=700000&namePrefix=${inputValue}`,
            geoApiOptions)
            .then(response => response.json())
            .then(response => {
                return {
                    options: response.data.map((city) => {
                        return {
                            value: `${city.latitude} ${city.longitude}`,
                            label: `${city.name}, ${city.countryCode}`,
                        }
                    })
                }
            })
            .catch(err => console.error(err));
    }

    const handleChange = (searchData) => {
        setSearch(searchData);
        onSearchChange(searchData);
    }
    return (
        <AsyncPaginate
            placeholder="Search for city"
            debounceTimeout={600}
            value={search}
            onChange={handleChange}
            loadOptions={loadOptions}
        ></AsyncPaginate>
    )
}

export default Search;