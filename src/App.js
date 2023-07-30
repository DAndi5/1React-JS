import React from 'react'
import './App.css';
import {IoCloseCircleSharp, IoHammerSharp} from "react-icons/io5";

class Header extends React.Component {
    render() {
        return (<header className='header'>{this.props.title}</header>)
    }
}

class User extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            editForm: false
        };
    }

    user = this.props.user

    render() {
        return (
            <div className="user">
                <IoCloseCircleSharp onClick={() => this.props.onDelete(this.user.id)} className="delete-icon"/>
                <IoHammerSharp onClick={() => this.setState({
                    editForm: !this.state.editForm
                })} className="edit-icon"/>
                <h3>{this.user.firstname} {this.user.lastname}</h3>
                <p>{this.user.bio}</p>
                <b>{this.user.isHappy ? 'Счастлив :)' : 'Не особо :('}</b>

                {this.state.editForm && <AddUser user={this.user} onAdd={this.props.onEdit}/>}
            </div>
        )
    }
}

class AddUser extends React.Component {
    userAdd = {}

    constructor(props) {
        super(props)
        this.state = {
            firstname: "",
            lastname: "",
            bio: "",
            age: 1,
            isHappy: false
        }
    }

    render() {
        return (
            <form ref={(el) => this.myForm = el}>
                <input placeholder="Имя" onChange={(e) => this.setState({firstname: e.target.value})}/>
                <input placeholder="Фамилия" onChange={(e) => this.setState({lastname: e.target.value})}/>
                <textarea placeholder="Биография" onChange={(e) => this.setState({bio: e.target.value})}></textarea>
                <input placeholder="Возраст" onChange={(e) => this.setState({age: e.target.value})}/>
                <label htmlFor="isHappy">Счастлив?</label>
                <input type="checkbox" id="isHappy" is="isHappy"
                       onChange={(e) => this.setState({isHappy: e.target.checked})}/>
                <button type="button" onClick={() => {
                    this.myForm.reset()
                    this.userAdd = {
                        firstname: this.state.firstname,
                        lastname: this.state.lastname,
                        bio: this.state.bio,
                        age: this.state.age,
                        isHappy: this.state.isHappy,
                    }
                    if (this.props.user)
                        this.userAdd.id = this.props.user.id
                    this.props.onAdd(this.userAdd)
                }}>Добавить
                </button>
            </form>
        )
    }
}

class Users extends React.Component {
    render() {
        if (this.props.users.length > 0)
            return (<div>
                {this.props.users.map((el) => (
                    <User onEdit={this.props.onEdit} onDelete={this.props.onDelete} key={el.id} user={el}/>
                ))}
            </div>)
        else
            return (
                <div className="user">
                    <h3>Пользователей нет</h3>
                </div>
            )
    }
}

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            usersno: [],
            users: [{
                id: 1,
                firstname: 'Bob',
                lastname: 'Marley',
                bio: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit, Repella',
                age: 40,
                isHappy: true
            }, {
                id: 2,
                firstname: 'John',
                lastname: 'Doe',
                bio: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit, Repella',
                age: 22,
                isHappy: false
            }]
        }
        this.addUser = this.addUser.bind(this)
        this.deleteUser = this.deleteUser.bind(this)
        this.editUser = this.editUser.bind(this)
    }

    render() {
        return (<div>
            <Header title="Список пользователей"/>
            <main>
                <Users users={this.state.users} onEdit={this.editUser} onDelete={this.deleteUser}/>
            </main>
            <aside>
                <AddUser onAdd={this.addUser}/>
            </aside>
        </div>)
    }

    deleteUser(id) {
        this.setState({users: this.state.users.filter((el) => el.id !== id)})
    }

    editUser(user) {
        // console.log(user)
        let allUsers = this.state.users
        allUsers[user.id - 1] = user
        this.setState({users: []}, () => {
            this.setState({users: [...allUsers]})
        })
    }

    addUser(user) {
        // console.log(user)
        const id = this.state.users.length + 1
        this.setState({users: [...this.state.users, {id, ...user}]})
    }
}

export default App;

