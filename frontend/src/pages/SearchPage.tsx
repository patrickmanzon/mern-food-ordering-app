import { useSearchRestaurantRequest } from '@/api/RestaurantApi';
import CuisineFilter from '@/components/CuisineFilter';
import PaginationSelector from '@/components/PaginationSelector';
import SearchBar, { SearchForm } from '@/components/SearchBar';
import SearchResultCard from '@/components/SearchResultCard';
import SearchResultsInfo from '@/components/SearchResultsInfo';
import SortOptionDropdown from '@/components/SortOptionDropdown';
import { useState } from 'react';
import { useParams } from 'react-router-dom'

export type SearchState = {
    searchQuery: string;
    page: number;
    cuisines: string[];
    sortOption: string;
}

export default function SearchPage() {

    const {city} = useParams();
    const [searchState, setSearchState] = useState<SearchState>({
        searchQuery: "",
        page: 1,
        cuisines: [],
        sortOption: "bestMatch"
    });

    const [isExpanded, setIsExpanded] = useState<boolean>(false);

    const {result, isLoading} = useSearchRestaurantRequest(searchState, city);

    const setSearchQuery = (searchFormData: SearchForm) => {

        setSearchState((prev) => {
            return {
                ...prev,
                searchQuery: searchFormData.searchQuery,
                page: 1,
                cuisines: []
            }
        });
    }

    const resetSearch = () => {
        setSearchState((prev) => {
            return {
                ...prev,
                searchQuery: "",
                page: 1,
                cuisines: []
            }
        });
    }

    const onSearchOptionChange = (sortOption: string) => {

        console.log("sortOption",sortOption);

        setSearchState((prev) => {
            return {
                ...prev,
                page: 1,
                sortOption
            }
        });
    }

    const onPageChange = (page: number) => {
        setSearchState((prev) => {
            return {
                ...prev,
                page: page
            }
        });
    }

    const onCuisineChange = (cuisines: string[]) => {
        setSearchState((prev) => {
            return {
                ...prev,
                page: 1,
                cuisines
            }
        });
    }

    if(!result?.data || !city) {
        return <span>No Results found. </span>
    }

    if(isLoading) {
        return <span>Loading ...</span>
    }

    return (
        <div className='grid grid-cols-1 lg:grid-cols-[250px_1fr] gap-5'>
            <div id="cuisines-list">
                <CuisineFilter onChange={onCuisineChange} selectedCuisines={searchState.cuisines} isExpanded={isExpanded} onExpandedClick={() => setIsExpanded((prevValue) => !prevValue)}/>
            </div>
            <div id="main-content" className='flex flex-col gap-5'>
                <SearchBar searchQuery={searchState.searchQuery} onSubmit={setSearchQuery} placeHolder='Search for restaurant name and cuisines' onReset={resetSearch}/>
                <div className='flex justify-between flex-col gap-3 lg:flex-row'>
                    <SearchResultsInfo total={result.pagination.total} city={city}></SearchResultsInfo>
                    <SortOptionDropdown onChange={(option) => onSearchOptionChange(option)} sortOption={searchState.sortOption} />
                </div>
                {result.data.map((restaurant) => 
                    <SearchResultCard restaurant={restaurant} key={restaurant._id}/>
                )}
                <PaginationSelector page={result.pagination.page} pages={result.pagination.pages} onPageChange={onPageChange} />
            </div>
        </div>
    )
}
