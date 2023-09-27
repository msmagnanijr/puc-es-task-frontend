import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: [],
      title: '',
      description: '',
      editingTaskId: null,
      editingTitle: '',
      editingDescription: '',
      news: [], 
      selectedNews: '', 
    };
  }

  componentDidMount() {
    this.loadTasks();
    this.loadNews();
  }

  loadTasks() {
    fetch('http://localhost:5000/tasks')
      .then(response => response.json())
      .then(data => {
        this.setState({ tasks: data.tasks });
      })
      .catch(error => console.error('Error fetching tasks:', error));
  }

  loadNews() {
    fetch('http://localhost:5000/tasks/get_news?keyword=personal%20tasks')
      .then(response => response.json())
      .then(data => {
        this.setState({ news: data.news.news_titles });
      })
      .catch(error => console.error('Error fetching news:', error));
  }

  addTask() {
    const { title, description } = this.state;
    fetch('http://localhost:5000/tasks', { 
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title, description }),
    })
      .then(response => {
        if (response.status === 201) {
          this.setState({ title: '', description: '' });
          this.loadTasks();
        } else {
          console.error('Error adding task:', response.statusText);
        }
      })
      .catch(error => console.error('Error adding task:', error));
  }

  deleteTask(taskId) {
    fetch(`http://localhost:5000/tasks/${taskId}`, {
      method: 'DELETE',
    })
      .then(response => {
        if (response.status === 200) {
          this.loadTasks();
        } else {
          console.error('Error deleting task:', response.statusText);
        }
      })
      .catch(error => console.error('Error deleting task:', error));
  }

  editTask(taskId) {
    const taskToEdit = this.state.tasks.find(task => task.id === taskId);
    if (taskToEdit) {
      this.setState({
        editingTaskId: taskId,
        editingTitle: taskToEdit.title,
        editingDescription: taskToEdit.description || '',
      });
    }
  }

  updateTask() {
    const { editingTaskId, editingTitle, editingDescription } = this.state;
    fetch(`http://localhost:5000/tasks/${editingTaskId}`, { 
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title: editingTitle, description: editingDescription }),
    })
      .then(response => {
        if (response.status === 200) {
          this.setState({
            editingTaskId: null,
            editingTitle: '',
            editingDescription: '',
          });
          this.loadTasks();
        } else {
          console.error('Error updating task:', response.statusText);
        }
      })
      .catch(error => console.error('Error updating task:', error));
  }

  render() {
    return (
      <div className="container mt-5">
        <h1 className="text-center mb-4">Task Manager</h1>
        <div className="row">
          <div className="col-md-4">
            <div className="mb-3">
              <label htmlFor="title">Title:</label>
              <input
                type="text"
                className="form-control"
                id="title"
                value={this.state.title}
                onChange={e => this.setState({ title: e.target.value })}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="description">Description:</label>
              <input
                type="text"
                className="form-control"
                id="description"
                value={this.state.description}
                onChange={e => this.setState({ description: e.target.value })}
              />
            </div>
            <button
              className="btn btn-primary btn-block"
              onClick={() => this.addTask()}
            >
              Add Task
            </button>
          </div>
          <div className="col-md-8">
            <ul className="list-group">
              {this.state.tasks.map(task => (
                <li className="list-group-item" key={task.id}>
                  {this.state.editingTaskId === task.id ? (
                    <div>
                      <input
                        type="text"
                        className="form-control mb-2"
                        value={this.state.editingTitle}
                        onChange={e =>
                          this.setState({ editingTitle: e.target.value })
                        }
                      />
                      <input
                        type="text"
                        className="form-control mb-2"
                        value={this.state.editingDescription}
                        onChange={e =>
                          this.setState({ editingDescription: e.target.value })
                        }
                      />
                      <button
                        className="btn btn-success btn-sm"
                        onClick={() => this.updateTask()}
                      >
                        Save
                      </button>
                    </div>
                  ) : (
                    <div>
                      <h5>{task.title}</h5>
                      <p>{task.description || ''}</p>
                      <button
                        className="btn btn-danger btn-sm float-right"
                        onClick={() => this.deleteTask(task.id)}
                      >
                        Delete
                      </button>
                      <button
                        className="btn btn-info btn-sm float-right mr-2"
                        onClick={() => this.editTask(task.id)}
                      >
                        Edit
                      </button>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="mt-5">
          <h2>News</h2>
          <select
            className="form-select"
            onChange={e => this.setState({ selectedNews: e.target.value })}
            value={this.state.selectedNews}
          >
            <option value="">Select a News Item</option>
            {this.state.news.map((newsItem, index) => (
              <option key={index} value={newsItem}>
                {newsItem}
              </option>
            ))}
          </select>
          {this.state.selectedNews !== '' && (
            <div className="mt-3">
              <h3>Selected News:</h3>
              <p>{this.state.selectedNews}</p>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default App;
