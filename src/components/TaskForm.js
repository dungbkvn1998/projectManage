import React, { Component } from "react";

class TaskForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      name: "",
      status: false
    };
  }

  componentWillMount() {
    if (this.props.selectedTask) {
      this.setState({
        id: this.props.selectedTask.id,
        name: this.props.selectedTask.name,
        status: this.props.selectedTask.status
      });
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.selectedTask && nextProps) {
      this.setState({
        id: nextProps.selectedTask.id,
        name: nextProps.selectedTask.name,
        status: nextProps.selectedTask.status
      });
    } else {
      this.clearForm();
    }
  }

  onCloseForm = () => {
    this.props.closeForm();
  };

  onSubmit = event => {
    event.preventDefault();
    this.props.onSubmit(this.state);
    this.clearForm();
  };

  clearForm = () => {
    this.setState({
      id: "",
      name: "",
      status: false
    });
  };

  onChange = event => {
    let target = event.target;
    let name = target.name;
    let value = target.value;
    if (name === "status") {
      value = target.value === "true" ? true : false;
    }
    this.setState({
      [name]: value
    });
  };

  render() {
    let { id } = this.state;
    return (
      <div className="panel panel-warning">
        <div className="panel-heading">
          <h3 className="panel-title">
            {!id ? "Thêm Công Việc" : "Cập Nhật Công Việc"}

            <i
              className="fa fa-times-circle text-right"
              onClick={this.onCloseForm}
            />
          </h3>
        </div>
        <div className="panel-body">
          <form onSubmit={this.onSubmit}>
            <div className="form-group">
              <label>Tên</label>
              <input
                type="text"
                className="form-control"
                placeholder="Input job name"
                value={this.state.name}
                onChange={this.onChange}
                name="name"
              />
            </div>
            <label>Trạng thái</label>
            <select
              name="status"
              className="form-control"
              value={this.state.status}
              onChange={this.onChange}
            >
              <option value={true}>Kích Hoạt</option>
              <option value={false}>Ẩn</option>
            </select>
            <br />
            <div className="text-center">
              <button type="submit" className="btn btn-warning">
                <i className="fa fa-plus mr-5" /> Lưu Lại
              </button>
              &nbsp;
              <button
                type="button"
                className="btn btn-danger"
                onClick={this.clearForm}
              >
                <i className="fa fa-times" aria-hidden="true" /> Hủy Bỏ
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default TaskForm;
