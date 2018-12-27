import React, { Component } from "react";
class Sort extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  onSort = (type, value) => {
    this.props.sort(type, value);
  };
  render() {
    let { type, value } = this.props;
    return (
      <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
        <div className="dropdown">
          <button
            type="button"
            className="btn btn-primary dropdown-toggle"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="true"
          >
            Sắp xếp <i className="fa fa-caret-square-down ml-5" />
          </button>
          <ul className="dropdown-menu" aria-labelledby="dropdownMenu1">
            <li onClick={() => this.onSort("name", 1)}>
              <a
                role="button"
                className={
                  type === "name" && value === 1 ? "sort_selected" : ""
                }
                href="#"
              >
                <span className="fa fa-sort-alpha-asc pr-5">Tên A-Z</span>
              </a>
            </li>
            <li onClick={() => this.onSort("name", -1)}>
              <a
                role="button"
                className={
                  type === "name" && value === -1 ? "sort_selected" : ""
                }
                href="#"
              >
                <span className="fa fa-sort-alpha-desc pr-5">Tên Z-A</span>
              </a>
            </li>
            <li role="separator" className="divider" />
            <li onClick={() => this.onSort("status", 1)}>
              <a
                role="button"
                className={
                  type === "status" && value === 1 ? "sort_selected" : ""
                }
                href="#"
              >
                Trạng Thái Kích Hoạt
              </a>
            </li>
            <li onClick={() => this.onSort("status", -1)}>
              <a
                role="button"
                className={
                  type === "status" && value === -1 ? "sort_selected" : ""
                }
                href="#"
              >
                Trạng Thái Ẩn
              </a>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}

export default Sort;
