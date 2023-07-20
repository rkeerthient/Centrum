import * as React from "react";
import { SearchBar, onSearchFunc } from "@yext/search-ui-react";
import {
  useSearchActions,
  useSearchState,
  useSearchUtilities,
} from "@yext/search-headless-react";
import { useEffect } from "react";
import { stringify } from "querystring";

type Link = {
  label: string;
  url: string;
};

const links: Link[] = [
  {
    label: "Home",
    url: "/",
  },
  { label: "Relief", url: "/review-relief" },
  {
    label: "Nutritions",
    url: "/nutrition",
  },
  {
    label: "All formulas",
    url: "/formulae",
  },
  {
    label: "FAQs",
    url: "/faqs",
  },
  {
    label: "Foods",
    url: "/foods",
  },
  {
    label: "Blogs",
    url: "/blogs",
  },
];

const Header = ({ _site }: any) => {
  const linkDoms = links.map((link) => (
    <div key={link.label}>
      <a href={link.url}>{link.label}</a>
    </div>
  ));
  const universalLimits = {
    products: 1,
  };
  const [path, setPath] = React.useState("");
  React.useEffect(() => {
    const currentPath = window.location.pathname;
    setPath(currentPath);
    return () => {};
  }, []);
  const state = useSearchState((state) => state.vertical.verticalKey);
  const searchActions = useSearchActions();

  const handleSearch: onSearchFunc = (searchEventData) => {
    const { query } = searchEventData;
    searchActions.setQuery(query!);
    state
      ? (searchActions.setVertical(state), searchActions.executeVerticalQuery())
      : (searchActions.setUniversal(),
        searchActions.setUniversalLimit(universalLimits),
        searchActions.executeUniversalQuery());
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const paramValue = params.get("query");
      searchActions.setQuery(paramValue!);
      state
        ? (searchActions.setVertical(state),
          searchActions.executeVerticalQuery())
        : (searchActions.setUniversal(),
          searchActions.setUniversalLimit(universalLimits),
          searchActions.executeUniversalQuery());
    }
  }, []);
  return (
    <>
      <div className="px-12 bg-white">
        <div className="flex justify-between items-center gap-12">
          <nav className="py-6 flex items-center justify-start gap-4 w-1/3">
            <div className="flex gap-x-10  font-semibold  text-sm">
              {linkDoms}
            </div>
          </nav>
          <img
            src="https://www.wholebycentrum.com/static/media/logo.6db6db58e7ce78c4c662bbcd9e806e5c.svg"
            alt="Centrum Logo"
            className="h-20"
          />
          <div className="w-1/3">
            <SearchBar
              onSearch={handleSearch}
              customCssClasses={{ searchBarContainer: "-mb-2 flex-1" }}
              hideRecentSearches={true}
            ></SearchBar>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
