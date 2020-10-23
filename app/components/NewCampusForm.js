import React from "react";

class NewCampusForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      address: "",
      description: "",
      showSubmitError: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    if (this.props.campus) {
      this.setState({
        name: this.props.campus.name,
        address: this.props.campus.address,
        description: this.props.campus.description,
      });
    }
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    if (this.state.name === "" || this.state.addresss === "") {
      this.setState({
        showSubmitError: true,
      });
    } else {
      // eslint-disable-next-line no-lonely-if
      if (this.props.campus) {
        this.props.handleSubmit(this.props.campus.id, this.state);
      } else {
        this.props.handleSubmit(this.state);
        this.setState({
          name: " ",
          address: " ",
          description: " ",
        });
      }
    }
  }

  render() {
    return (
      <div>
        <div>
          <h2>{this.props.campus ? "Update Campus" : "Create New Campus"}</h2>
          <form onSubmit={this.handleSubmit}>
            <label htmlFor="name">* Name</label>
            <input
              type="text"
              name="name"
              onChange={this.handleChange}
              value={this.state.name}
              placeholder="Enter Name"
            />

            <label htmlFor="address">* Address</label>
            <input
              type="text"
              name="address"
              onChange={this.handleChange}
              value={this.state.address}
              placeholder="Enter Address"
            />

            <label htmlFor="description">Description</label>
            <input
              type="text"
              name="description"
              onChange={this.handleChange}
              value={this.state.description}
              placeholder="Enter Description"
            />

            <button type="submit">Submit</button>
          </form>
          {this.state.showSubmitError ? (
            <h3 className="formSubmissionError">
              Must Fill in All Required Fields.
            </h3>
          ) : (
            <div />
          )}
        </div>
      </div>
    );
  }
}

export default NewCampusForm;
