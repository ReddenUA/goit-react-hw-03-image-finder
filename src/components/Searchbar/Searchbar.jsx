import PropTypes from 'prop-types';
import { Component } from 'react';
import { GrSearch } from 'react-icons/gr';
import { toast } from 'react-toastify';

import { Button, Header, SearchForm, SearchInput } from './Searchbar.styled';

export class Searchbar extends Component {
  state = {
    query: '',
  };

  inputQueryChange = e => {
    this.setState({ query: e.currentTarget.value.toLowerCase() });
  };

  querySubmit = e => {
    e.preventDefault();

    if (this.state.query.trim() === '') {
      // alert('Please enter valid search query.');
      return toast.error('Please enter valid search query.');
    }

    this.props.onSubmit(this.state.query);
    this.setState({ query: '' });
    e.target.reset();
  };

  render() {
    return (
      <Header>
        <SearchForm onSubmit={this.querySubmit}>
          <Button type="submit">
            <GrSearch size="18" />
            {/* <Label>Search</Label> */}
          </Button>

          <SearchInput
            type="text"
            autocomplete="off"
            autoFocus
            placeholder="Search images and photos"
            onChange={this.inputQueryChange}
          />
        </SearchForm>
      </Header>
    );
  }
}

Searchbar.propType = {
  onSubmit: PropTypes.func.isRequired,
};
