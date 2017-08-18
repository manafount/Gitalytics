let request = require('request');
let GitHub = require('github-api');
let Promise = require('bluebird');
let sentiment = require('sentiment');

class StatBuilder {
  constructor(login, pass) {
    this.github = new GitHub({
      username: login,
      password: pass
    });
  }

  async searchUsers() {
    
  }
  
  async getRateLimit() {
    return this.github.getRateLimit();
  } 
  
  async getAllUserCommits(username) {
    let user = await this.github.getUser(username);
    let response = await user.listRepos();
    let repoList = await response.data;
    let repos = repoList.map(repo => this.github.getRepo(repo.owner.login, repo.name));
    let result = [];
  
    let allAuthoredCommits = await Promise.all(repos.map(repo => this.getCommits(username, repo)
      .catch(err => {
        // 409 = Duplicate Request. Probably safe to ignore.
        // if (err.response.status === 409) return;
        console.log(err);
      }))).reduce((acc, cur) => acc.concat(cur), []);
  
    allAuthoredCommits.filter(commit => commit.length > 0);
    console.log(`${username} has ${allAuthoredCommits.length} total commits.`);
    return allAuthoredCommits;
  }
  
  async getCommits(username, repo) {
    let response = await repo.listCommits({author: username});
    let commits = await response.data;
    console.log(`${commits.length} commits in ${repo.__fullname}`);
    return commits;
  }
  
  async getBasicUserProfile(username) {
    let userCommits = await this.getAllUserCommits(username);
    let userEvents = await this.getEvents(username);
  
    let commitMessages = userCommits.map(c => c.commit.message);
    let userSentiment = await this.getSentimentAnalysis(commitMessages);
    let userPunchCard = await this.getPunchCard(username);
  }
  
  getSentimentAnalysis(textArray) {
    let sentimentArray = textArray.map(text => sentiment(text));
    let scores = sentimentArray.map(sent => sent.score);
    let max = Math.max.apply(null, scores);
    let min = Math.min.apply(null, scores);
    let mostPositive = {
      text: textArray.find(text => sentiment(text).score === max),
      score: max
    };
    let leastPositive = {
      text: textArray.find(text => sentiment(text).score === min),
      score: min
    };
    let avg = scores.reduce((acc, score) => acc + score) / sentimentArray.length;

    return {
      mostPositive,
      leastPositive,
      max,
      min,
      avg,
      data: sentimentArray };
  }
  
  async getPunchCard(repos) {
  
  }
  
  async getEvents(username, type) {
  
  }
}

module.exports = StatBuilder;

// let sb = new StatBuilder(process.env.GH_LOGIN, process.env.GH_PASS);

// let commits = sb.getAllUserCommits('manafount')
//   .then(data => {
//     let messages = data.map(item => item.commit.message);
//     sb.getSentimentAnalysis(messages);
//   });

