import React, { Component } from "react";
import _ from "lodash";
import Pagination from "../common/pagination";
import withRouter from "../../services/withRouter";
import SearchBox from "../common/searchBox";
import { paginate } from "../../utils/paginate";

class MainPage extends Component {
  state = {
    publications: [
      "Juan",
      "María",
      "Pedro",
      "Lucía",
      "Carlos",
      "Ana",
      "Miguel",
      "Sofía",
      "Luis",
      "Laura",
    ],
    currentPage: 1,
    pageSize: 4,
    searchQuery: "",
  };

  async componenliidMount() {
    // const { data: houses } = await getHouses();
    // this.setState({ houses });
  }

  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };

  getPagedData = () => {
    const { pageSize, currentPage, publications, searchQuery } = this.state;

    let filtered = publications;
    if (searchQuery) {
      filtered = publications.filter((publication) =>
        publication.toLowerCase().startsWith(searchQuery.toLowerCase())
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
            {publications.map((publications) => (
              <li>{publications}</li>
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
