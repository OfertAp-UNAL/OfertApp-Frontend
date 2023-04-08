import React, { Component } from "react";
import _ from "lodash";
import Pagination from "../common/pagination";
import SearchBox from "../common/searchBox";
import withRouter from "../../services/withRouter";
import NumberBox from "../common/numberBox";
import { paginate } from "../../utils/paginate";
import { getPublications } from "../../services/publicationService";
import PublicationListView from "./publicationListView";
import PriceRangeFilter from "./priceRangeFilter";
import ComboBox from "../common/comboBox";
import CheckBox from "../common/checkBox";
import CustomButton from "../common/Button/button";
import { toast } from "react-toastify";
import "./../common/Button/button.css";

const defaultLimit = 2;

class MainPage extends Component {

  orderbyFields = [
    {
      name: "relevance",
      label: "Relevancia"
    },
    {
      name: "price",
      label: "Precio"
    },
    {
      name: "offers",
      label: "N° Ofertas"
    },
    {
      name: "comments",
      label: "N° Comentarios"
    },
  ]

  state = {
    data : {
      titleQuery : "",
      minPriceFilter : 0,
      maxPriceFilter : Number.MAX_VALUE,
      orderBy : "relevance",
      limit: defaultLimit,
      available: true,
    },
    publications: [],
    currentPage: 1,
    pageSize: 4
  };

  async componentDidMount() {
    this.handleSubmit();
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
    let queryFiltered = publications;

    // First filter by search query
    if (searchQuery) {
      queryFiltered = publications.filter((publication) =>
        publication.title.toLowerCase().startsWith(searchQuery.toLowerCase())
      );
    }

    // Then filter by price, the last filter
    const filterResult = queryFiltered.filter((publication) =>
      _.inRange(publication.minOffer, minPriceFilter, maxPriceFilter)
    );

    // With the filtered data get the paginated items
    const paginatedData = paginate(filterResult, currentPage, pageSize);

    return { totalCount: filterResult.length, data: paginatedData };
  };

  getPagedData2 = () => {
    const {
      pageSize,
      currentPage,
      publications,
    } = this.state;
    const paginatedData = paginate(publications, currentPage, pageSize);
    return { totalCount: publications.length, data: paginatedData };
  }

  handleSubmit = async () => {
    const { titleQuery, minPriceFilter, maxPriceFilter, available, orderBy, limit } = this.state.data;
    const requestParams = {};

    // Filter by title (LIKE operator in sql databases)
    if (titleQuery && titleQuery.trim() !== "") {
      requestParams["title"] = titleQuery;
    }

    // Set availability only param
    requestParams["available"] = available;

    // Set price range
    requestParams["minPrice"] = minPriceFilter;
    requestParams["maxPrice"] = maxPriceFilter;

    // Set order by
    requestParams["orderBy"] = orderBy;

    // Set limit
    requestParams["limit"] = limit;
    
    // Send request
    try {
      const { data } = await getPublications(requestParams);
      this.setState({ publications: data["data"] });
      toast.success("Publicaciones obtenidas con éxito.")
      return;
    } catch (e) {
      console.log("Error: ", e);
    }
    
    this.setState({publications: []});
  }

  handleTitleChange = (value) => {
    this.setState({ data: {...this.state.data, titleQuery: value} });
  };

  handleMinPriceChange = (value) => {
    this.setState({ data: {...this.state.data, minPriceFilter: value} });
  };

  handleMaxPriceChange = (value) => {
    this.setState({ data: {...this.state.data, maxPriceFilter: value} });
  };

  handleLimitChange = (value) => {
    this.setState({ data: {...this.state.data, limit: value} });
  }

  handleAvailableChange = (value) => {
    this.setState({ data: {...this.state.data, available: value} });
  }

  handleOrderByChange = (value) => {
    this.setState({ data: {...this.state.data, orderBy: value }});
  }

  render() {
    const {
      pageSize,
      currentPage,
    } = this.state;

    const { totalCount, data: publications } = this.getPagedData2();

    return (
      <div className="row">
        <div className="col-12 col-sm-3 text-center">
          <div className="ofertapp-pub-filter-divider">
            <SearchBox label = "Contiene en su titulo" onChange={this.handleTitleChange} />
          </div>
          <div className="ofertapp-pub-filter-divider">
            <PriceRangeFilter
              valueMin={0}
              valueMax={Number.MAX_VALUE}
              onChangeMin={this.handleMinPriceChange}
              onChangeMax={this.handleMaxPriceChange}
            />
          </div>
          <div className="ofertapp-pub-filter-divider">
            <CheckBox name="available" label="Solo publicaciones disponibles" 
              onChange={this.handleAvailableChange} />
          </div>
          <div className="ofertapp-pub-filter-divider">
            <ComboBox name="orderby" label="Ordenar por" options={this.orderbyFields} 
              value="relevance" onChange={this.handleOrderByChange} />
          </div>
          <div className="ofertapp-pub-filter-divider">
            <NumberBox value={0} label = "Límite de publicaciones" onChange={this.handleLimitChange} />
          </div>
          <div className="ofertapp-pub-filter-divider">
            <CustomButton caption="Filtrar" type="primary" onClick={() => {
              this.handleSubmit()
            }} />
          </div>
        </div>
        <div className="col-12 col-sm-9">
          {publications.map((publication) => (
            <PublicationListView
              key={publication.id}
              publication={publication}
            />
          ))}

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
