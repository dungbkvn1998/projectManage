import React, { Component } from "react";

class Item extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  onToggleStatus = () => {
    this.props.toggleStatus(this.props.task.id);
  };

  onRemoveItem = () => {
    this.props.removeItem(this.props.task.id)
  }

  onChangeItem = () => {
    this.props.changeItem(this.props.task.id)
  }

  render() {
    const { index, task } = this.props;
    return (
      <tr>
        <td>{index + 1}</td>
        <td>{task.name}</td>
        <td className=" text-center">
          <span
            className={
              task.status ? "label label-danger" : "label label-info"
            }
            onClick={this.onToggleStatus}
          >
            {task.status ? "Kích Hoạt" : "Ẩn"}
          </span>
        </td>
        <td className=" text-center">
          <button type="button" className="btn btn-warning" onClick = {this.onChangeItem}>
            <span className="fa fa-reply mr-5" />
            Sửa
          </button>
          &nbsp;
          <button type="button" className="btn btn-danger" onClick = {this.onRemoveItem}>
            <span className="fa fa-trash mr-5" />
            Xóa
          </button>
        </td>
      </tr>
    );
  }
}

export default Item;
