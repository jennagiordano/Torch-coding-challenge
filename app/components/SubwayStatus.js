import React from "react";
import { connect } from "react-redux";
import { fetchSingleSubway } from "../redux/singleSubway";

export class SingleSubway extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
    };
  }
  async componentDidMount() {
    let singleSubwayResponse = await this.props.getSingleSubway(
      this.props.match.params.subwayName
    );
    if (singleSubwayResponse === true) {
      this.setState({
        loading: false,
      });
    }
  }

  render() {
    let singleSubway = this.props.singleSubway || [];
    return (
      <div>
        {this.state.loading ? (
          <h1>Loading Subway....</h1>
        ) : (
          <div>
            {singleSubway.id ? (
              <div className="componentContainer singleSubwayContainer">
                <div id="singleSubway">
                  <h2>{singleSubway.name}</h2>
                  <br />
                </div>
                {this.props.match.url.split("/")[1] === "status" ? (
                  <h1>Status: {singleSubway.status}</h1>
                ) : (
                  <p>
                    <h1>
                      Uptime:{" "}
                      {singleSubway.totalTime - singleSubway.totalTimeDelayed}{" "}
                      minutes
                    </h1>
                  </p>
                )}
              </div>
            ) : (
              <h1>Sorry, Subway Does Not Exist.</h1>
            )}
          </div>
        )}
      </div>
    );
  }
}
const mapState = (state) => {
  return { singleSubway: state.singleSubway };
};

const mapDispatch = (dispatch) => {
  return {
    getSingleSubway: (id) => {
      return dispatch(fetchSingleSubway(id));
    },
  };
};

export default connect(mapState, mapDispatch)(SingleSubway);
