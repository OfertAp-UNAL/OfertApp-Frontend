import React, { Component } from "react";
import _ from "lodash";
import Pagination from "../common/pagination";
import withRouter from "../../services/withRouter";
import SearchBox from "../common/searchBox";
import { paginate } from "../../utils/paginate";
import { getProducts } from "../../services/productService";

class MainPage extends Component {
  state = {
    publications: [],
    currentPage: 1,
    pageSize: 4,
    searchQuery: "",
  };

  async componentDidMount() {
    const { data: publications } = await getProducts();
    this.setState({ publications });
  }

  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };

  getPagedData = () => {
    const { pageSize, currentPage, publications, searchQuery } = this.state;

    let filtered = publications;
    if (searchQuery) {
      filtered = publications.filter((publication) =>
        publication.title.toLowerCase().startsWith(searchQuery.toLowerCase())
      );
    }

    const paginatedData = paginate(filtered, currentPage, pageSize);

    return { totalCount: filtered.length, data: paginatedData };
  };

  handleSearch = (query) => {
    this.setState({ searchQuery: query, currentPage: 1 });
  };

  render() {
    const { pageSize, currentPage, searchQuery } = this.state;

    const { totalCount, data: publications } = this.getPagedData();

    return (
      <div className="row">
        <div className="col-3"></div>
        <div className="col">
          <SearchBox value={searchQuery} onChange={this.handleSearch} />
          <ul>
            {publications.map((publication) => (
              <div
                key={publication.id}
                style={{
                  border: "1px solid red",
                  margin: "10px 0",
                  padding: "5px",
                }}
              >
                <li style={{ color: "black" }}>{publication.title}</li>
              </div>
            ))}
          </ul>

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
