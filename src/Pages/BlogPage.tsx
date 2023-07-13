import { useSearchActions, useSearchState } from "@yext/search-headless-react";
import {
  ResultsCount,
  AppliedFilters,
  Pagination,
  VerticalResults,
  LocationBias,
} from "@yext/search-ui-react";
import * as React from "react";
import { useEffect } from "react";
import BlogCard from "../components/BlogCard";

const BlogPage = () => {
  const searchActions = useSearchActions();

  useEffect(() => {
    const urlSearchParams = new URLSearchParams(window.location.search);
    const query = urlSearchParams.get("query");
    query && searchActions.setQuery(query);
    searchActions.setVertical("blogs");
    searchActions.executeVerticalQuery();
  }, []);

  return (
    <>
      <div className="flex mt-4">
        <div className="flex-grow">
          <div className="flex flex-col items-baseline">
            <ResultsCount />
            <AppliedFilters />
          </div>
          <VerticalResults
            CardComponent={BlogCard}
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

export default BlogPage;
