import { Component } from "react";
import config from "./../../config";
import { getDatetimeFormatted } from "../../utils/getTime";
import UserLink from "../common/UserLink/userLink";

import "./reportsComponent.css"

const { mediaUrl } = config;

class ReportSupport extends Component {
    render() {
        const { support } = this.props;
        return (
            <div className = "col-12 col-sm-6">
                <div className="row ofertapp-reaction-support">
                    <div className="col-12 col-md-8">
                        <div className="row align-middle">
                            <div className="col-12 ofertapp-support-text">
                                <UserLink
                                    fontSize="24"
                                    user={ support.user }
                                />
                            </div>
                            <div className="col-12 ofertapp-support-text">
                                { support.body }
                            </div>
                            <div className="col-12 ofertapp-support-text">
                                { getDatetimeFormatted(support.createdAt) }
                            </div>
                        </div>
                    </div>
                    <div className="col-12 col-md-4">
                        {
                            support.type === "IMAGE" ?
                                <img
                                    src={ mediaUrl + support.data }
                                    alt={ "Soporte de reporte" }
                                    className="report-support-data"
                                />
                            :
                                <video
                                    src={ mediaUrl + support.data }
                                    controls
                                    className="report-support-data"
                                />
                        }
                    </div>
                </div>
            </div>
            
        );
    }
}

export default ReportSupport;