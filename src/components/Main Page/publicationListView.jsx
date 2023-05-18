import config from "../../config";
import { getTimeLeft } from "./../../utils/getTime";
import withRouter from "../../services/withRouter";
import UserLink from "./../common/UserLink/userLink";
import "./mainPage.css";

const { mediaUrl } = config;

function PublicationListView({ publication }) {
  const { id, title, minOffer, supports, endDate, user } = publication;
  console.log(user);
  return (
    <div
      key={id}
      className="card ofertapp-publication-card"
      onClick={() => (window.location.href = "/publication/" + id)}
    >
      <div className="card-header">
        <div className="row">
          <div className="col-12 col-sm-3" style={{ textAlign: "right" }}>
            Por:
          </div>
          <div className="col-12 col-sm-9">
            <UserLink base fontSize="16" fontColor="#fff" user={user} />
          </div>
        </div>
      </div>
      <div className="card-body">
        <div className="row">
          <div className="col-12 col-sm-4 ofertapp-pub-card-support">
            {supports && supports.length > 0 ? (
              // There are supports to show, lets show any of them
              supports[0].type === "IMAGE" ? (
                // Image
                <img
                  className="ofertapp-pub-card-support-media"
                  src={mediaUrl + supports[0].data}
                  alt="Publication support"
                />
              ) : (
                // Video
                <video
                  className="ofertapp-pub-card-support-media"
                  controls
                  src={mediaUrl + supports[0].data}
                />
              )
            ) : (
              // No supports to show, show a default image
              <img
                className="ofertapp-pub-card-support-media"
                src={mediaUrl + "/defaultProfile.png"}
                alt="Publication support"
              />
            )}
          </div>
          <div className="col-12 col-sm-8">
            <div className="row">
              <div className="col-12 ofertapp-pub-card-info-title">{title}</div>
              <div className="col-12 col-sm-6 ofertapp-pub-card-info">
                Precio actual: COP ${" "}
                {minOffer
                  .toString()
                  .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")}
              </div>
              <div className="col-12 col-sm-6 ofertapp-pub-card-info">
                Tiempo faltante: {getTimeLeft(endDate)}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default withRouter(PublicationListView);
