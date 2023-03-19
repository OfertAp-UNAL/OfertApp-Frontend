import React, { Component } from "react";
import _ from "lodash";
import Pagination from "../common/pagination";
import withRouter from "../../services/withRouter";
import SearchBox from "../common/searchBox";
import { paginate } from "../../utils/paginate";
import { getProducts } from "../../services/productService";
import PublicationListView from "./publicationListView";

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

          <div className="card" style={{ width: "18rem" }}>
            <ul className="list-group list-group-flush">
              {publications.map((publication) => (
                <li key={publication.id} className="list-group-item">
                  {publication.title}
                  <span
                    dangerouslySetInnerHTML={{
                      __html:
                        '<svg viewBox="0 0 24 24"><path d="M20,13H12V20A2,2 0 0,1 10,22H4A2,2 0 0,1 2,20V4C2,2.89 2.89,2 4,2H10A2,2 0 0,1 12,4V11H20A2,2 0 0,1 22,13V17H20V13M12,6.5A1.5,1.5 0 0,0 10.5,8A1.5,1.5 0 0,0 12,9.5A1.5,1.5 0 0,0 13.5,8A1.5,1.5 0 0,0 12,6.5Z"/></svg>',
                    }}
                  ></span>
                </li>
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
