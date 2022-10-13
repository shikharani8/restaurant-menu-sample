import React, {Component} from 'react';
import axios from 'axios';
import Loading from './Loading';
import {menuUrl} from './Config';
import Header from './Header';
import './App.css';
import {Modal} from 'react-bootstrap';

var selectedItem = {};
class Menu extends Component {
  constructor (props) {
    super (props);
    this.state = {
      menuCategories: [],
      catgryWiseData: {},
      loading: false,
      qty: 1,
    };
  }

  componentDidMount () {
    this.setState ({loading: true});
    axios (menuUrl)
      .then (resp => {
        if (
          resp &&
          resp.data &&
          resp.data.menu &&
          resp.data.menu.items.length > 0
        ) {
          const menuCategoryList = resp.data.menu.items;
          const uniqueCatgryObj = {};
          const catgryWiseData = {};

          menuCategoryList.forEach (item => {
            if (item.type && item.type.name) {
              if (!uniqueCatgryObj[item.type.name]) {
                uniqueCatgryObj[item.type.name] = item.type.name;
                catgryWiseData[item.type.name] = [item];
              } else {
                catgryWiseData[item.type.name].push (item);
              }
            }
          });
          this.setState ({
            menuCategories: Object.values (uniqueCatgryObj),
            catgryWiseData: catgryWiseData,
            loading: false,
          });
        }
      })
      .finally (this.setState ({loading: false}));
  }

  handleChange = e => {
    // console.log()
  };

  setActiveTab = (e, itemData) => {
    selectedItem = this.state.catgryWiseData[itemData.type.name].filter (
      elm => elm.id == itemData.id
    )[0];
    this.setState ({showModalTwo: true});
  };

  handleClose = () => {
    this.setState ({
      showModalTwo: false,
    });
  };

  setActiveTabTwo = (e, itemData) => {
    selectedItem = this.state.catgryWiseData[itemData.type.name].filter (
      elm => elm.id == itemData.id
    )[0];
    this.setState ({show: true});
  };

  handleCloseTwo = () => {
    this.setState ({
      show: false,
    });
  };

  render () {
    const {menuCategories, catgryWiseData, loading} = this.state;
    // const menuCategories = ['abc', 'def'];
    return (
      <div class="divbody">
        {/* {loading ? <Loading message="Please wait page is loading..." /> : 
        <div> */}
        <Header />
        {menuCategories.map ((menuCategory, idx) => {
          return (
            <div class="m-2 p-3 w-85 mx-auto">
              <div class="card ">
                <h5 class="card-header text-white bg-success ">
                  {menuCategory}
                </h5>
                <div class="card-group">
                  <div class="row pl-4 pr-4 pb-1 pt-1">
                    {catgryWiseData[menuCategory] &&
                      catgryWiseData[menuCategory].map ((data, index) => {
                        return (
                          <div class="card position-relative p-1 border border-success col-sm-4 ">
                            <div class="media">
                              <img
                                class="align-self-start mr-3 w-25 h-30 mw-30 mh-45 img-thumbnail border-success"
                                src={data.image}
                                alt="Generic placeholder image"
                              />
                              <div class="media-body">
                                <h5 class="mt-0">{data.name}</h5>
                              </div>
                              <div>
                                <h5 class="mt-0 float-right mr-2">
                                  {data.prices.price.price} £
                                </h5>
                              </div>
                            </div>
                            <div class="ml-2 mt-1">
                              <div
                                class="btn-group-toggle float-left"
                                data-toggle="buttons"
                              >
                                <label class="btn btn-success btn-sm active">
                                  <input
                                    type="checkbox"
                                    checked
                                    autocomplete="off"
                                  />
                                  {' '}
                                  Add
                                </label>
                                <input
                                  size="1"
                                  type="text"
                                  value="1"
                                  class="text-success ml-1 .input-sm text-center"
                                  name="qty"
                                  onChange={e => this.handleChange (e)}
                                />
                              </div>
                              <div
                                class="btn-group-toggle float-left ml-1"
                                data-toggle="buttons"
                              >
                                <label class="btn btn-success btn-sm active">
                                  <input
                                    type="checkbox"
                                    checked
                                    autocomplete="off"
                                  />
                                  {' '}
                                  Remove
                                </label>
                              </div>

                              <p class="float-right mr-2">
                                &#9733; &#9733; &#9733; &#9733; &#9733;
                              </p>
                            </div>

                            <div class="card-body row">
                              <p><i>{data.details}</i></p>
                              <div class="col-sm-6">

                                <small class="text-muted">Ingredients</small>
                                <ul>
                                  <small>
                                    <li>Vegetarian: {data.vegetarian}</li>
                                    <li>Vegan: {data.vegan}</li>
                                    <li>Dairy free: {data.dairyfree}</li>
                                  </small>
                                  <small>
                                    <a
                                      class="text-info"
                                      onClick={(e, itemData) =>
                                        this.setActiveTab (e, data)}
                                    >
                                      Show more
                                    </a>
                                  </small>
                                </ul>
                              </div>
                              <div class="col-sm-6">
                                <small class="text-muted">Nutritions</small>
                                <ul>
                                  {Object.keys (
                                    data.nutritionLabelling.Item
                                  ).map ((key, index) => {
                                    if (
                                      key !== 'itemid' &&
                                      key !== 'size' &&
                                      index < 5
                                    ) {
                                      return (
                                        <li>
                                          <small>
                                            {key}
                                            {' '}
                                            :
                                            {' '}
                                            {data.nutritionLabelling.Item[key]}
                                          </small>
                                        </li>
                                      );
                                    }
                                  })}
                                  <small>
                                    <a
                                      class="text-info"
                                      onClick={(e, itemData) =>
                                        this.setActiveTabTwo (e, data)}
                                    >
                                      Show more
                                    </a>
                                  </small>
                                </ul>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                  </div>
                </div>
              </div>
            </div>
          );
        })}

        <Modal
          show={this.state.show}
          onHide={this.handleCloseTwo}
          animation={true}
          size="sm"
        >
          <Modal.Header class="bg-success">
            <Modal.Title>
              <small>Nutritions{' '}</small>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div>
              <ul>
                {Object.keys (selectedItem).length > 0 &&
                  Object.keys (
                    selectedItem.nutritionLabelling.Item
                  ).map ((key, index) => {
                    if (key !== 'itemid' && key !== 'size') {
                      return (
                        <li>
                          <small>
                            {key}
                            {' '}
                            :
                            {' '}
                            {selectedItem.nutritionLabelling.Item[key]}
                          </small>
                        </li>
                      );
                    }
                  })}
              </ul>
            </div>
          </Modal.Body>
        </Modal>

        <Modal
          show={this.state.showModalTwo}
          onHide={this.handleClose}
          animation={true}
          size="sm"
        >
          <Modal.Header class="bg-success">
            <Modal.Title>
              <small>Nutritions{' '}</small>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div>
              <ul>
                {Object.keys (selectedItem).length > 0 &&
                  <small>
                    <li>Vegetarian: {selectedItem.vegetarian}</li>
                    <li>Vegan: {selectedItem.vegan}</li>
                    <li>Dairy free: {selectedItem.dairyfree}</li>
                    <li>Gluten free: {selectedItem.glutenfree}</li>
                    <li>Halal: {selectedItem.halal}</li>
                    <li>Pregnant: {selectedItem.pregnant}</li>
                    <li>Wheat: {selectedItem.wheat}</li>
                    <li>Crustaceans: {selectedItem.crustaceans}</li>
                    <li>Eggs: {selectedItem.eggs}</li>
                    <li>Fish: {selectedItem.fish}</li>
                    <li>Peanuts: {selectedItem.peanuts}</li>
                    <li>Soybeans: {selectedItem.soybeans}</li>
                    <li>Milk: {selectedItem.milk}</li>
                    <li>Nuts: {selectedItem.nuts}</li>
                    <li>Celery: {selectedItem.celery}</li>
                    <li>Mustard: {selectedItem.mustard}</li>
                    <li>Sesame: {selectedItem.sesame}</li>
                    <li>Sulphur Dioxide: {selectedItem.sulphurDioxide}</li>
                    <li>Lupin: {selectedItem.lupin}</li>
                    <li>Molluscs: {selectedItem.molluscs}</li>
                  </small>}
              </ul>
            </div>
          </Modal.Body>
        </Modal>

      </div>
    );
  }
}

export default Menu;
