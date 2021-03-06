import React, { Component } from 'react';
import AuthForm from './AuthForm';
import mutation from '../mutations/Signup';
import { graphql, compose } from 'react-apollo';
import query from '../queries/CurrentUser';
import { hashHistory } from 'react-router';

class SignupForm extends Component {
  constructor(props){
    super(props);
    this.state = { errors : []}
  }
  componentWillUpdate(nextProps){
    if(!this.props.data.user && nextProps.data.user){
      hashHistory.push('/dashboard');
    }
  }
  onSubmit({email , password}){
    const self = this;
    this.props.mutate({
      variables: {email , password},
      refetchQueries: [{query}]
    }).catch(res => {
      const errors = res.graphQLErrors.map(error => error.message);
      self.setState({errors})
    } )
  }
  render() {
    return (
      <div>
      <h3>Signup</h3>
        <AuthForm
          errors={this.state.errors}
          onSubmit={this.onSubmit.bind(this)}
          />
      </div>
    );
  }
}

export default compose(
  graphql(query),
  graphql(mutation)
)(SignupForm);
