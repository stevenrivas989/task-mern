import React, { Component } from 'react';

class App extends Component {

    constructor() {
        //Heredamos todas las funcionalidades del componente
        super();

        //Estado de la app
        this.state = {
            title: '',
            description: '',
            tasks: [],
            _id: ''
        }
        this.handleChange = this.handleChange.bind(this);
        this.addTask = this.addTask.bind(this);
    }

    /**
     * Método que añade una tarea
     * @param {*} e 
     */
    addTask(e) {
        if (!this.state._id) {
            fetch('/api/task', {
                method: 'POST',
                body: JSON.stringify(this.state),
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }

                //Uso de promesa
            }).then(res => { res.json() })
                .then(data => {
                    M.toast({ html: 'Task Saved' });
                    this.setState({
                        title: '',
                        description: ''
                    });
                    this.fetchTask();
                })
                .catch(err => { console.error(err) });
        } else {
            fetch(`/api/task/${this.state._id}`, {
                method: 'PUT',
                body: JSON.stringify(this.state),
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
                //Uso de promesa
            }).then(res => { res.json() })
                .then(data => {
                    M.toast({ html: 'Task Updated' });
                    this.setState({
                        title:'',
                        description:'',
                        _id:''
                    })
                    this.fetchTask();
                })
                .catch(err => { console.error(err) });
        }
         //Cancelamos los eventos
         e.preventDefault();
    }

    componentDidMount() {
        this.fetchTask();
    }

    /**
     * Método que consulta una tarea
     */
    fetchTask() {
        fetch('/api/task')
            .then(res => res.json())
            .then(data => {
                console.log(data);
                this.setState({
                    tasks: data
                })
            });
    }

    //Eliminar tarea
    deleteTask(id) {
        if (confirm('Are you sure you want to delete it?')) {
            fetch(`/api/task/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            })
                .then(res => res.json())
                .then(data => {
                    M.toast({ html: 'Task Deleted' })
                    this.setState({
                        _id:''
                    })
                    this.fetchTask();
                })
        }
    }

    //Modificar tarea
    editTask(id) {
        fetch(`/api/task/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        })
            .then(res => res.json())
            .then(data => {
                this.setState({
                    title: data.title,
                    description: data.description,
                    _id: data._id
                })
            })
    }

    //Limpia los campos del form
    clearForm(){
        this.setState({
            title:'',
            description:'',
            _id:''
        })
        this.state.title = '';
        this.state.description = '';
        this.state._id = '';
    }

    //Captura los cambios en los input
    handleChange(e) {
        const { name, value } = e.target;
        this.setState({
            [name]: value
        })
    }

    render() {
        return (
            <div>
                <div>
                    {/*NAVIGATION*/}
                    <nav className="blue darken-4">
                        <div className="container">
                            <a className="brand-logo" href="/">MERN TASK</a>
                        </div>
                    </nav>
                </div>
                <div className="container" style={{ marginTop: 2 + 'em' }}>
                    {/*CONTENT*/}
                    <div className="row">
                        <div className="col s5">
                            <div className="card">
                                <div className="card-title">
                                    <div className="container" style={{ textAlign: "center" }}><b>Add task</b></div>
                                </div>
                                <div className="card-content" style={{ paddingTop: 0.6 + 'em' }}>
                                    <form onSubmit={this.addTask}>
                                        <div className="row">
                                            <div className="input-field col s12">
                                                <input name="title" value={this.state.title} onChange={this.handleChange} type="text" placeholder="Task title" required />
                                            </div>
                                            <div className="input-field col s12">
                                                <textarea className="materialize-textarea" name="description" value={this.state.description} onChange={this.handleChange} type="text" placeholder="Task description" required >
                                                </textarea>
                                            </div>
                                        </div>
                                        <div className="row buttonAdd" style={{ textAlign: "center" }}>
                                            <button style={{ margin: 2 }} type="submit" className="waves-effect btn blue darken-3">SEND</button>
                                            {/*<button style={{ margin: 2 }}  type="button" onClick={this.clearForm} className="waves-effect btn brown lighten-3">CLEAR</button>*/}
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                        <div className="col s7">
                            <table className="highlight responsive-table">
                                <thead>
                                    <tr>
                                        <th>
                                            Title
                                        </th>
                                        <th>
                                            Description
                                        </th>
                                        <th></th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        this.state.tasks.map(task => {
                                            return (
                                                <tr key={task._id}>
                                                    <td>{task.title}</td>
                                                    <td>{task.description}</td>
                                                    <td>
                                                        <button onClick={_ => this.editTask(task._id)} className="btn teal accent-3 btn-small">
                                                            <i className="material-icons">edit</i>
                                                        </button>
                                                    </td>
                                                    <td>
                                                        <button onClick={_ => this.deleteTask(task._id)} className="btn red darken-4 btn-small">
                                                            <i className="material-icons">delete</i>
                                                        </button>
                                                    </td>
                                                </tr>
                                            )
                                        })
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default App;
