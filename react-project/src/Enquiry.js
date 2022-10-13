import React, {Component} from 'react';
import axios from 'axios';
import swal from 'sweetalert';
import Header from './Header';
import { constants } from './Constants';
import {serverUrl} from './Config';

class Enquiry extends Component {
  constructor (props) {
    super (props);
    this.state = {
        userName:'',
        userNameError:'',
        company:'',
        companyError:'',
        email: '',
        emailError:'',
        message:'',
        messageError:'',
    };
  }

  handleChange =(e) =>{
    const errorKey = `${e.target.name}Error`
    if(e.target.value){
        const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if(e.target.name=='email' && !emailRegex.test(e.target.value)) {
            this.setState({ emailError:constants.errorMessage['emailError1'] });
        }else{
            this.setState({ [errorKey]: '' });
        }
    }else{
        this.setState({ [errorKey]: constants.errorMessage[errorKey] });
    }
    this.setState({ [e.target.name]: e.target.value });
  }

  validator = ()=>{
    let userNameError = true;
    let companyError = true;
    let emailError = true;
    let messageError = true;
    const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if(!this.state.userName){
        userNameError = false;
        this.setState({userNameError:constants.errorMessage['userNameError']});
    }else{
        this.setState({userNameError:''});
    }
    if(!this.state.company){
        companyError = false;
        this.setState({companyError:constants.errorMessage['companyError']});
    }else{
        this.setState({companyError:''});
    }

    if(!this.state.email){
        emailError = false;
        this.setState({emailError:constants.errorMessage['emailError']});
    }else if (this.state.email && !emailRegex.test(this.state.email)) {
        emailError = false;
        this.setState({ emailError:constants.errorMessage['emailError1'] });
    }else{
        this.setState({emailError:''});
    }
    if(!this.state.message){
        messageError = false;
        this.setState({messageError:constants.errorMessage['messageError']});
    }else{
        this.setState({messageError:''});
    }

    return userNameError && companyError && emailError && messageError;
   }

  submitForm = (e)=>{
    e.preventDefault();
    const isValid = this.validator();
    if(isValid){
        
        const data = {}
        axios.post(`${serverUrl}/enquiry/create`,{userName:this.state.userName,
        company:this.state.company,
        email: this.state.email,
        message:this.state.message}).then(resp=>{
                swal({
                    text: resp.data.msg,
                    icon: 'success',
                    dangerMode: false,
                  });
                  this.clearForm();
        }).catch((err)=>{
            swal({
                text: "Your Enquiry submision failed, please try again!",
                icon: 'warning',
                dangerMode: true,
              });
            })
     }
  }

  clearForm = (e) =>{
    this.setState({
        userName:'',
        userNameError:'',
        company:'',
        companyError:'',
        email: '',
        emailError:'',
        message:'',
        messageError:'',
    });
  }

  render () {
    return (
     <>
      <Header />
      <div class="center"> 
        <form style={{ background: 'linear-gradient(rgb(0, 167, 130),#21CBF3)' }} class='container'>
        <div class="form-group" >
            <label for="userName">Name</label>
            <input
              type="text"
              class="form-control"
              id="userName"
              aria-describedby="userName"
              name="userName"
              value={this.state.userName}
              onChange={e=>this.handleChange(e)}
              placeholder="Enter userName"
            />
            <small class="form-text text-danger">
              {this.state.userNameError}
            </small>
          </div>
          <div class="form-group">
            <label for="company">Company</label>
            <input
              type="text"
              class="form-control"
              id="company"
              aria-describedby="company"
              name="company"
              value={this.state.company}
              onChange={e=>this.handleChange(e)}
              placeholder="Enter company"
            />
            <small class="form-text text-danger">
              {this.state.companyError}
            </small>
               </div>
          <div class="form-group">
            <label for="email">Email address</label>
            <input
              type="text"
              class="form-control"
              id="email"
              aria-describedby="email"
              name="email"
              value={this.state.email}
              onChange={e=>this.handleChange(e)}
              placeholder="Enter email"
            />
            <small class="form-text text-danger">
              {this.state.emailError}
            </small>
          </div>
          <div class="form-group">
            <label for="message">Message</label>
            <textarea
              type="text"
              class="form-control"
              id="message"
              aria-describedby="message"
              name="message"
              value={this.state.message}
              onChange={e=>this.handleChange(e)}
              placeholder="Enter your message"
            />
              <small class="form-text text-danger">
              {this.state.messageError}
            </small>
          </div>
          <button type="button" class="btn btn-primary mr-1" onClick={e=>this.clearForm(e)}>Clear</button>
          <button type="button" class="btn btn-primary" onClick={e=>this.submitForm(e)}>Submit</button>
          </form>
      </div></>
     
    );
  }
}

export default Enquiry;
