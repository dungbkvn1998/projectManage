import React, { Component } from "react";
import "./App.css";
import TaskForm from "./components/TaskForm";
import Control from "./components/Control";
import List from "./components/List";
import cryptoRandomString from "crypto-random-string";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: [],
      isDisplayForm: false,
      selectedTask: {},
      filter: {
        name: "",
        status: -1
      },
      search: "",
      sortType: "name",
      sortValue: 1
    };
  }

  componentWillMount() {
    if (localStorage && localStorage.getItem("tasks")) {
      this.setState({
        tasks: JSON.parse(localStorage.getItem("tasks"))
      });
    }
  }

  toggleForm = () => {
    if (this.state.selectedTask !== null && this.state.isDisplayForm) {
      this.setState({
        isDisplayForm: true,
        selectedTask: null
      });
    } else {
      this.setState({
        isDisplayForm: !this.state.isDisplayForm,
        selectedTask: null
      });
    }
  };

  closeForm = () => {
    this.setState({
      isDisplayForm: false
    });
  };

  openForm = () => {
    this.setState({
      isDisplayForm: true
    });
  };

  toggleStatus = id => {
    let index = this.findIndex(id);
    let tasks = this.state.tasks;
    let status = tasks[index].status;
    tasks[index].status = !status;
    this.setState({
      tasks: tasks
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
    this.closeForm();
  };

  onSubmit = data => {
    let tasks = this.state.tasks;
    console.log(data.id);
    if (data.id === "") {
      data.id = cryptoRandomString(15);
      tasks.push(data);
    } else {
      let index = this.findIndex(data.id);
      tasks[index].name = data.name;
      tasks[index].status = data.status;
    }
    this.setState({
      tasks: tasks
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
    this.closeForm();
  };

  findIndex = id => {
    let { tasks } = this.state;
    let index = -1;
    tasks.forEach((task, i) => {
      if (id === task.id) index = i;
    });

    return index;
  };

  removeItem = id => {
    let index = this.findIndex(id);
    let tasks = this.state.tasks;
    tasks.splice(index, 1);
    this.setState({
      tasks: tasks
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
    this.closeForm();
  };

  changeItem = id => {
    let index = this.findIndex(id);
    let tasks = this.state.tasks;
    this.setState({
      selectedTask: tasks[index]
    });
    this.openForm();
  };

  filter = (name, status) => {
    this.setState({
      filter: {
        name: name,
        status: status
      }
    });
  };

  search = data => {
    this.setState({
      search: data
    });
  };

  sort = (type, value) => {
    this.setState({
      sortType: type,
      sortValue: value
    });
  };

  render() {
    let {
      tasks,
      isDisplayForm,
      selectedTask,
      filter,
      search,
      sortType,
      sortValue
    } = this.state;
    if (filter) {
      if (filter.name) {
        tasks = tasks.filter(task => {
          return (
            task.name.toLowerCase().indexOf(filter.name.toLowerCase()) !== -1
          );
        });
      }
      tasks = tasks.filter(task => {
        if (filter.status === -1) return task;
        else return task.status === (filter.status === 1 ? true : false);
      });
    }
    if (search) {
      tasks = tasks.filter(task => {
        return task.name.toLowerCase().indexOf(search.toLowerCase()) !== -1;
      });
    }

    if (sortType === "name") {
      tasks.sort((a, b) => {
        if (a.name > b.name) return sortValue;
        else if (a.name < b.name) return -sortValue;
        else return 0;
      });
    } else {
      tasks.sort((a, b) => {
        if (a.status > b.status) return -sortValue;
        else if (a.status < b.status) return sortValue;
        else return 0;
      });
    }
    let elmTaskForm = isDisplayForm ? (
      <TaskForm
        closeForm={this.closeForm}
        onSubmit={this.onSubmit}
        selectedTask={selectedTask}
      />
    ) : (
      ""
    );
    return (
      <div className="container ">
        <h1 className="App">Quản lý công việc</h1>
        <hr />
        <div className="row">
          <div
            className={
              isDisplayForm ? "col-xs-4 col-sm-4 col-md-4 col-lg-4" : ""
            }
          >
            {elmTaskForm}
          </div>
          <div
            className={
              isDisplayForm
                ? "col-xs-8 col-sm-8 col-md-8 col-lg-8"
                : "col-xs-12 col-sm-12 col-md-12 col-lg-12"
            }
          >
            <button
              type="button"
              className="btn btn-primary"
              onClick={this.toggleForm}
            >
              <span className="fa fa-plus mr-5" />
              Thêm công việc
            </button>
            <Control
              search={this.search}
              sort={this.sort}
              type={sortType}
              value={sortValue}
            />
            <List
              tasks={tasks}
              toggleStatus={this.toggleStatus}
              removeItem={this.removeItem}
              changeItem={this.changeItem}
              filter={this.filter}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
