import React, { Component } from "react";
import Item from "./Item";

class List extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filterName: "",
      filterStatus: -1
    };
  }

  onChange = event => {
    let { filterName, filterStatus } = this.state;
    let target = event.target;
    let name = target.name;
    let value = target.value;
    if (name === "filterStatus") {
      value = Number(target.value);
    }
    this.props.filter(
      name === "filterName" ? value : filterName,
      name === "filterStatus" ? value : filterStatus
    );
    this.setState({
      [name]: value
    });
  };

  render() {
    const { tasks } = this.props;
    let { filterName, filterStatus } = this.state;
    return (
      <div className="mt-15 row">
        <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
          <table className="table table-bordered table-hover">
            <thead>
              <tr>
                <th className="text-center">STT</th>
                <th className="text-center">Tên</th>
                <th className="text-center">Trạng Thái</th>
                <th className="text-center">Hành Động</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td />
                <td>
                  <input
                    type="text"
                    className="form-control"
                    name="filterName"
                    value={filterName}
                    onChange={this.onChange}
                  />
                </td>
                <td>
                  <select
                    className="form-control"
                    name="filterStatus"
                    value={filterStatus}
                    onChange={this.onChange}
                  >
                    <option value={-1}>Tất Cả</option>
                    <option value={0}>Ẩn</option>
                    <option value={1}>Kích Hoạt</option>
                  </select>
                </td>
                <td />
              </tr>
              {tasks.map((task, index) => (
                <Item
                  key={task.id}
                  task={task}
                  index={index}
                  toggleStatus={this.props.toggleStatus}
                  removeItem={this.props.removeItem}
                  changeItem={this.props.changeItem}
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default List;
