import { Component } from 'react'
import Cookies from 'js-cookie'
import calculation from '../Calculation'

import "./index.css"
import { Navigate } from 'react-router-dom'


class Home extends Component {
    state = {
        user : {},
        calList: [],
        input : '',
        ans : 0,
        log : true,
    }

    getUserRole = async() => {
        const token = Cookies.get("login_token")
        const url = 'http://localhost:3011/'
        const options = {
          method: 'GET',
          headers : {
            "authorization" : `Bearer ${token}`
          }
        }
        const response = await fetch(url, options)
        const data = await response.json()
        //console.log(data)
        if (response.ok === true) {
          //console.log(data.userDetails)
          this.setState({user: data.userDetails, calList: data.calculations})
        }
    }

    componentDidMount() {
        this.getUserRole()
    }

    onClickLogout = () => {
        Cookies.remove("login_token");
        this.setState(prevState => ({log : !prevState.log}))
    }

    onChangeInput = (event) => {
        this.setState({input: event.target.value})
    }

    getCalculations = async() => {
        const url2 = 'http://localhost:3011/get/calculation/'
        const options2 = {
          method: 'GET',
        }
        const response = await fetch(url2, options2)
        const data = await response.json()
        console.log(data)
        if (response.ok) {
            this.setState({input: "", calList: data.calculations})
          }
    }

    onClickButton = async() => {
        const {input} = this.state
        const answer = calculation(input)
        const calDetails = {
            exp : input,
            ans : answer,
        }
        const url1 = 'http://localhost:3011/post/calculation/'
        const options1 = {
          method: 'POST',
          body: JSON.stringify(calDetails),
          headers: {
            'content-type': 'application/json',
          },
        }
        const response = await fetch(url1, options1)
        if (response.ok) {
            this.getCalculations()
        }
    }

    inputSection = () => {
        const {calList, input} = this.state
        return(
            <div className='master-section-card'>
                <h1 className='recently-posted-header'>Recently Posted</h1>
                <p className='recently-posted-claculation'>Que : {calList[calList.length - 1].exp} & Ans : {calList[calList.length - 1].ans}</p>
                <div className='home-input-container'>
                    <input type="text" className='home-user-input' placeholder='Enter expression' value={input} onChange={this.onChangeInput}/>
                    <button type="button" className='ask-student-button' onClick={this.onClickButton}>Ask Student</button>
                </div>
            </div>
        )
    }


    renderHome = () => {
        const {user, calList} = this.state

        return (
            <div className='home-section-detais-card'>
                <h1 className='introduction-header'>Welcome {user.first_name} {user.last_name}</h1>
                <p className='introduction-description'>This is {user.role} portal</p>
                <div className='claculations-container'>
                    <h1 className='claculations-header'>Previous Calculations</h1>
                    <ol className='calculations-list'>
                        {calList.map(item => (<li className='calculation-item' key={item.exp}>Que : {item.exp} & Ans : {item.ans}</li>))}
                    </ol>
                </div>
                {user.role === "Master"? this.inputSection():""}
            </div>
        )
    }

    render() {
        const token = Cookies.get("login_token")
        if(token === undefined) {
            return <Navigate to="/login" />
        }
        return (
            <div className='home-section-bg-container'>
                <div className='home-header-container'>
                    <h1 className='home-card-header'>Calculations</h1>
                    <button type="button" className='home-logout-button' onClick={this.onClickLogout}>Logout</button>
                </div>
                {this.renderHome()}
            </div>
        )
    }
}

export default Home;