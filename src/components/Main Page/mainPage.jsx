import React, { Component } from "react";
import _ from "lodash";
import Pagination from "../common/pagination";
import withRouter from "../../services/withRouter";
import SearchBox from "../common/searchBox";
import { paginate } from "../../utils/paginate";
import { getProducts } from "../../services/productService";
import PublicationListView from "./publicationListView";
import PriceRangeFilter from "./priceRangeFilter";

class MainPage extends Component {
  state = {
    publications: [],
    currentPage: 1,
    pageSize: 4,
    searchQuery: "",
    minPriceFilter: 0,
    maxPriceFilter: 10000000,
  };

  async componentDidMount() {
    const { data: publications } = await getProducts();
    this.setState({ publications });
  }

  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };

  getPagedData = () => {
    const {
      pageSize,
      currentPage,
      publications,
      searchQuery,
      minPriceFilter,
      maxPriceFilter,
    } = this.state;

    // All the publications
    let filtered = publications;

    // First filter by search query
    if (searchQuery) {
      filtered = publications.filter((publication) =>
        publication.title.toLowerCase().startsWith(searchQuery.toLowerCase())
      );
    }

    // Then filter by price
    filtered = publications.filter((publication) =>
      _.inRange(publication.minOffer, minPriceFilter, maxPriceFilter)
    );

    // With the filtered data get the paginated items
    const paginatedData = paginate(filtered, currentPage, pageSize);

    return { totalCount: filtered.length, data: paginatedData };
  };

  handleSearch = (query) => {
    this.setState({ searchQuery: query, currentPage: 1 });
  };

  handlePriceRangeChange = (valueMin, valueMax) => {
    this.setState({ minPriceFilter: valueMin, maxPriceFilter: valueMax });
  };

  render() {
    const {
      pageSize,
      currentPage,
      searchQuery,
      minPriceFilter,
      maxPriceFilter,
    } = this.state;

    const { totalCount, data: publications } = this.getPagedData();

    return (
      <div className="row">
        <div className="col-3">
          <SearchBox value={searchQuery} onChange={this.handleSearch} />
          <PriceRangeFilter
            valueMin={minPriceFilter}
            valueMax={maxPriceFilter}
            onChange={this.handlePriceRangeChange}
          />
        </div>
        <div className="col">
          <div className="card">
            <ul className="list-group list-group-flush">
              {publications.map((publication) => (
                <PublicationListView
                  key={publication.id}
                  publication={publication}
                />
              ))}
            </ul>
          </div>

          <Pagination
            itemsCount={totalCount}
            pageSize={pageSize}
            currentPage={currentPage}
            onPageChange={this.handlePageChange}
          />
        </div>
      </div>
    );
  }
}

export default withRouter(MainPage);
