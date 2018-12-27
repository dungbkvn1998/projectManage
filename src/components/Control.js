import React, { Component } from "react";
import Search from "./Search";
import Sort from "./Sort";

class Control extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div className="row mt-15">
        <Search search={this.props.search} />
        <Sort
          sort={this.props.sort}
          type={this.props.type}
          value={this.props.value}
        />
      </div>
    );
  }
}

export default Control;
