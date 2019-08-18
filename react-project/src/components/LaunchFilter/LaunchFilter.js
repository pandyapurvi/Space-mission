import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
//import launchpads from 'http://localhost:8001/launchpads'

import Select from '../Select';
import TextInput from '../TextInput';
import Button, { TYPES as BUTTON_TYPES } from '../Button';
import styles from './launch-filter.module.scss';
import LaunchItem from '../LaunchItem/LaunchItem';

// Example static option value
// the real options will need to come from the api
const options = [{ value: 'Any', label: 'Any' }];

/**
 * Launch filter holds the filter state and writes the changes to the filters
 * back up to the parent element on click of the apply button
 */
class LaunchFilter extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      keywords: '',
      launchPad: {},
      minYear: null,
      maxYear: null,
      items: [],
      launchpads: [],
    };

    const allItems = async () => {
      const results = await axios.get('http://localhost:8001/launches');
      this.setState({items : results.data});
    };
        
    allItems();
  }

  async componentDidMount() {
    const results = await axios.get('http://localhost:8001/launchpads');
    this.setState({launchpads : results.data});
  }
  // some change handlers ready for you
  handleKeywordChange = () => {};
  //handleLaunchPadChange = () => {};
  // handleMinYearChange = () => {};
  // handleMaxYearChange = () => {};

  // and example change handler for a <Select /> element
  handleChange = selectedOption => {
    this.setState({ selectedOption });
  };

  handleLaunchPadChange = ({value}) => {
    this.setState({ launchPad: {
      label: value,
      value,
    }});
  }

  handleMinYearChange = ({value}) => {
    this.setState({ minYear: {
      label: value,
      value,
    }});
  }

  handleMaxYearChange = ({value}) => {
    this.setState({ maxYear: {
      label: value,
      value,
    }});
  }
  
  // an example change handler for a <TextInput /> element
  handleInputChange = value => {
    this.setState({ keywords: value });
  };

  // handler for calling the filter update
  handleFilterUpdate = (input) => {
    // alert('Implement filter update logic');

    // event.preventDefault();
    let inputSearch = this.state.keywords;
   
     console.log("keyword123" + inputSearch);
    axios.get('http://localhost:8001/launches').then((results) => {
          console.log(results.data);
          const search_data = results.data;
          const listSearch = [];

          for (let i = 0; i < search_data.length; i++) {
            const searchData = search_data[i];
            console.log("flight number: " + searchData.rocket.rocket_name);

            if(searchData.rocket.rocket_name.toLowerCase().includes(inputSearch)){
              listSearch.push(searchData);
            }else if(searchData.flight_number.toString().includes(inputSearch)){
              listSearch.push(searchData);
            }else if(searchData.payloads[0].payload_id.includes(inputSearch)){
              listSearch.push(searchData);
            }

        }
        this.setState({items: listSearch});
      })
  };


  renderLaunchPadOptions = () => {
    const { launchpads } = this.state;

    if (!launchpads) {
      return options;
    }

    const launchPadOptions = launchpads.map(({ full_name }) => (
      {
        'value': full_name,
        'label': full_name
      }
    ));

    launchPadOptions.unshift( { value: 'Any', label: 'Any'  });
    return launchPadOptions;
  };

  renderYear = () => {
    const { items } = this.state;

    if (!items) {
      return options;
    }

    const minYearOptions = items.map(({ launch_date_local }) => (
      {
        'value': launch_date_local.slice(0,4),
        'label': launch_date_local.slice(0,4)
      }
    ));
    minYearOptions.unshift( { value: 'Any', label: 'Any'});
    return minYearOptions;
  };

  render() {
    console.log('state123', this.state);
    const {
      keywords,
      items,
      launchPad,
      minYear,
      maxYear,
    } = this.state;

    return (
      <div>

        <section className={styles.launchFilter}>
          <TextInput
            placeholder="eg. Falcon"
            label="Keyword"
            value={keywords}
            onChange={this.handleInputChange}
            uid="example-text-input"
          />
          <Select
            label="Launch Pad"
            onChange={this.handleLaunchPadChange}
            value={launchPad}
            options={this.renderLaunchPadOptions()}
            uid="launch-pad-select"
          />
          <Select
            label="Min Year"
            value={minYear}
            onChange={this.handleMinYearChange}
            options={this.renderYear()}
            uid="min-year-select"
          />
          <Select
            label="Max Year"
            value={maxYear}
            onChange={this.handleMaxYearChange}
            options={this.renderYear()}
            uid="example-select"
          />
           <SearchForm onSubmit={ this.handleFilterUpdate } />
        </section>
        {items.map(item =>
          <LaunchItem item={item} />
        )}
      </div>
    );
  }
}

class SearchForm extends React.Component {
  constructor(){
    super();
    this.state = {
      evnt: '',

    }
    this._handleSubmit = this._handleSubmit.bind(this);
  }

  _handleSubmit(event){
    event.preventDefault();
    this.props.onSubmit();
  };

  render() {
    return (
      <div>
        <form onSubmit={this._handleSubmit} className="search-form">
         
          <div>
          
          <Button type={BUTTON_TYPES.PRIMARY}>
            Apply
          </Button> 

          </div>
        </form>
      </div>
    )
  }

};

LaunchFilter.propTypes = {

  // used to let parent component know about changes
  // to the filters
  onFilterChange: PropTypes.func
}

LaunchFilter.defaultProps = {
  onFilterChange: () => {},
}

export default LaunchFilter;
