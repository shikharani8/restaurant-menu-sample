import React, {Component} from 'react';

class Product extends Component {
  constructor (props) {
    super (props);
    this.state = {
      email: 'abc@email.com',
    };
  }

  componentDidMount () {
    var query = window.location.search.substring(1);
    var param = query.split("?");
    console.log('param',param[0]);
  }

  render () {
    return <div>{this.state.email}</div>;
  }
}

export default Product;
