import React, { Component } from 'react';
import BeautyStars from 'beauty-stars';

class ShowPage extends React.Component {

  constructor(){
    super()
    this.state={
      yourRating: null
  }}

  componentDidMount(){
    this.settingStars()
  }

  Capitalize(str){
    return str.charAt(0).toUpperCase() + str.slice(1)
  }

  settingStars = () => {
    let ratings = this.props.allRatings
    let queen = this.props.selectedQueen["id"]
    if (this.props.selectedQueen) {
      let filteredRatings = ratings.filter(rating => rating["dragqueen_id"] === queen)
      let rating = filteredRatings[0]
      // let stars = filteredRatings[0].rating
      this.setState({yourRating: rating})

    }
  }

  yourStarChange = (value) => {
    this.setState({yourStars: value})
    this.handleStarChange(value)
  }

  handleStarChange = (value) => {
    let currentUser = this.props.currentUserId
    let currentQueen = this.props.selectedQueen.id
    // let yourRating = this.state.yourRating
    let body = JSON.stringify({rating: value, user_id: currentUser, dragqueen_id: currentQueen})
    this.state.yourRating ?
    fetch(`http://localhost:3000/ratings/${this.state.yourRating.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
        body: body
      })
        .then((response) => {return response.json()})
        .then((rating) => {
          console.log("patch", rating)})
    :
    fetch('http://localhost:3000/ratings', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'},
        body: body})
        .then((response) => {return response.json()})
        .then((rating) => {
          console.log("post", rating)
          this.setState({yourRating: rating})})
    }



  render(){
  	return (

      <div class="container">
  <div class="row">
    <div class="col">
    <h1>{this.props.selectedQueen.name}</h1>
    <h3>Season {this.props.selectedQueen.season}</h3>
    <p>"{this.props.selectedQueen.quote}"</p>
    <img src={this.props.selectedQueen.image} class="showpage"></img><br></br><br></br><br></br><br></br><br></br><br></br>
    </div>
    <div class="col" id="moreinfo">
      <h3>Winner?</h3>
      <p>
        {(() => {
          switch (this.props.selectedQueen.winner) {
            case false: return "Nope.";
            case true: return "Yes!";
          }
        })()}
      </p>
      <h3>Place finished?</h3>
        <p>{this.Capitalize(this.props.selectedQueen.place)}.</p>
      <h3>Miss Congeniality?</h3>
      <p>
        {(() => {
          switch (this.props.selectedQueen.misscongeniality) {
            case false: return "Nope.";
            case true: return "Yes!";
          }
        })()}
      </p>
      <h3>Spill the tea</h3>
    </div>
    <div class="col" id="moreinfo">
      <h3>How is she though?</h3><br></br>
      <BeautyStars
      value={this.props.avgValue}
      // onChange={this.props.handleStarChange}
      />
      <h4>Average rating: </h4><br></br>
      <BeautyStars
      value={this.state.yourRating && this.state.yourRating.rating || this.state.yourStars}
      onChange={this.yourStarChange}
      // onChange={this.props.handleStarChange}
      />
      <h4>Your rating</h4>
      </div>
    </div>
</div>

  	);
  }

};

export default ShowPage;