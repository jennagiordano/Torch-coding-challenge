import React from "react";
import { connect } from "react-redux";
import { fetchSubways } from "../redux/subways";

export class AllSubways extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
    };

    this.getSubways = this.getSubways.bind(this);
  }
  componentDidMount() {
    try {
      this.getSubways();
      setInterval(this.getSubways, 1100);
    } catch (error) {
      this.setState({
        hasError: error,
      });
    }
  }

  getSubways() {
    this.props.getSubways();
    console.log(this.state.delayedSubways, this.props.delayedSubways);
  }

  render() {
    const ontimeSubways = this.props.ontimeSubways[0] || [];
    const delayedSubways = this.props.delayedSubways[0] || [];

    if (this.state.hasError) {
      return (
        <div>
          <h1>Something went wrong. </h1>
        </div>
      );
    } else {
      return (
        <div className="componentContainer">
          <h2 className="center">ONTIME SUBWAYS</h2>

          <hr />
          <div className="innerComponent">
            {ontimeSubways.map((subway) => {
              return (
                <div key={subway ? subway.id : "x"} className="componentColumn">
                  {subway && (
                    <div className="subwayItem">
                      <a href={`/status/${subway.name}`}>
                        <h2>{subway.name}</h2>
                      </a>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
          <hr />
          <h2 className="center">DELAYED SUBWAYS</h2>

          <hr />
          <div className="innerComponent">
            {delayedSubways.map((subway) => {
              return (
                <div key={subway ? subway.id : "x"} className="componentColumn">
                  {subway && (
                    <div className="subwayItem">
                      <a href={`/status/${subway.name}`}>
                        <h2>{subway.name}</h2>
                      </a>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      );
    }
  }
}

const mapState = (state) => {
  return {
    ontimeSubways: state.subways.notDelayedSubways,
    delayedSubways: state.subways.delayedSubways,
  };
};

const mapDispatch = (dispatch) => {
  return {
    getSubways: () => {
      return dispatch(fetchSubways());
    },
  };
};

export default connect(mapState, mapDispatch)(AllSubways);
