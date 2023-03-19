import React, { Component } from "react";
import _ from "lodash";
import Pagination from "../common/pagination";
import withRouter from "../../services/withRouter";
import { paginate } from "../../utils/paginate";

class MainPage extends Component {
  state = {
    publications: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"],
    currentPage: 1,
    pageSize: 4,
  };

  async componenliidMount() {
    // const { data: houses } = await getHouses();
    // this.setState({ houses });
  }

  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };

  getPagedData = () => {
    const { pageSize, currentPage, publications } = this.state;
    debugger;
    const paginatedData = paginate(publications, currentPage, pageSize);

    return { totalCount: publications.length, data: paginatedData };
  };

  render() {
    const { pageSize, currentPage } = this.state;

    const { totalCount, data: publications } = this.getPagedData();

    return (
      <div className="row">
        <div className="col-3"></div>
        <div className="col">
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
