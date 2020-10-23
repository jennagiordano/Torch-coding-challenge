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
                  {this.props.match.url.split("/")[1] === "status" ? (
                    <p>Status: {singleSubway.status}</p>
                  ) : (
                    <p>
                      Uptime:{" "}
                      {singleSubway.totalTime - singleSubway.totalTimeDelayed}
                    </p>
                  )}
                </div>
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
