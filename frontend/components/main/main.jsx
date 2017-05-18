import React from 'react';

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.props.user;

    this.update = this.update.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

  }

  componentWillReceiveProps(nextProps){
    if(this.props.user.username !== nextProps.user.username){
      this.setState({
        username: nextProps.user.username,
        avatar_url: nextProps.user.avatar_url
      });
    }
  }

  update(field){
    return e => this.setState({[field]: e.target.value});
  }

  handleSubmit(e){
    e.preventDefault();
    this.props.fetchUser(this.state);
  }

  render() {
    return (
      <div>
        <h1>Username: {this.state.username}</h1>
        <img src={this.state.avatar_url}></img>
        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            value={this.state.username}
            onChange={this.update("username")}
            >
          </input>

          <input type="submit" ></input>

        </form>
      </div>
    );
  }
}

export default Main;
