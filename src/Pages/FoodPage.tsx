import { useSearchActions, useSearchState } from "@yext/search-headless-react";
import {
  StandardFacets,
  ResultsCount,
  AppliedFilters,
  Pagination,
  VerticalResults,
  LocationBias,
  StandardCard,
} from "@yext/search-ui-react";
import * as React from "react";
import { useEffect } from "react";
import FAQCard from "../components/FAQCard";
import FormulaCard from "../components/FormulaCard";
import FoodCard from "../components/FoodCard";

const FoodPage = () => {
  const searchActions = useSearchActions();
  const faqResults = useSearchState((state) => state.vertical.results) || [];
  const loadingState =
    useSearchState((state) => state.searchStatus.isLoading) || true;

  useEffect(() => {
    const urlSearchParams = new URLSearchParams(window.location.search);
    const query = urlSearchParams.get("query");
    query && searchActions.setQuery(query);
    searchActions.setVertical("food");
    searchActions.executeVerticalQuery();
  }, []);

  return (
    <>
      <div className="flex mt-4">
        {/* <div className="w-64 shrink-0 mr-5 mt-4">
          <StandardFacets />
        </div> */}
        <div className="flex-grow">
          <div className="flex flex-col items-baseline">
            <ResultsCount />
            <AppliedFilters />
          </div>
          <VerticalResults
            CardComponent={FoodCard}
            customCssClasses={{
              verticalResultsContainer: `max-w-screen-xl grid grid-cols-1 md:grid-cols-3`,
            }}
          />
          <Pagination />
          <LocationBias />
        </div>
      </div>
    </>
  );
};

export default FoodPage;
