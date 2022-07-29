import '../scss/app.scss';

import axios from "axios";

class Teams {
    constructor() {
        this.fetchTeams();
    }

    fetchTeams(){
        const options = {
            method: 'GET',
            url: 'https://free-nba.p.rapidapi.com/teams',
            params: {page: '0'},
            headers: {
              'X-RapidAPI-Key': '54e8d1a6f4mshe9f62bb56442508p1ab909jsne54dd6094676',
              'X-RapidAPI-Host': 'free-nba.p.rapidapi.com'
            }
        };

        axios.request(options).then((response) => {
            this.createTeamOptions(response);
        }).catch(function (error) {
            console.error(error);
        });
    }

    createTeamOptions(response){
        const teamsSelectField = document.querySelector(".js-select-team");

        for (let team of response.data.data){
            const teamOption = document.createElement("option");
            teamOption.innerText = team.full_name;
            teamsSelectField.appendChild(teamOption);
            teamOption.dataset.teamId =  team.id;
        }

        teamsSelectField.addEventListener("change", (e) => {
            this.selectedTeamId = e.target.options[e.target.options.selectedIndex].dataset.teamId;
            this.fetchGames();
        })
    }

    fetchGames(){
        const options = {
            method: 'GET',
            url: 'https://free-nba.p.rapidapi.com/games',
            params: {page: '0', per_page: '25', team_ids: [this.selectedTeamId]},
            headers: {
              'X-RapidAPI-Key': '54e8d1a6f4mshe9f62bb56442508p1ab909jsne54dd6094676',
              'X-RapidAPI-Host': 'free-nba.p.rapidapi.com'
            }
        };

        axios.request(options).then((response) => {
            this.createGameList(response);
        }).catch(function (error) {
            console.error(error);
        });
    }

    createGameList(response){
        const teamGameList = document.querySelector(".js-list-games");
        teamGameList.innerHTML = "";

        for (let game of response.data.data){
            const teamGame = document.createElement("li");
            const buttonShowStats = document.createElement("button");
            const vs = " vs ";
            teamGame.classList = "list-group-item";
            teamGame.innerText = game.home_team.full_name+vs+game.visitor_team.full_name;
            buttonShowStats.innerText = "Show Stats";
            buttonShowStats.classList = "btn-stats";
            teamGameList.appendChild(teamGame);
            teamGame.appendChild(buttonShowStats);
            teamGame.dataset.gameId =  game.id;
        }

        const showStatsButtons = document.querySelectorAll(".btn-stats");
        showStatsButtons.forEach( (button) => {
            button.addEventListener("click", () => {
                const gameId = button.parentElement.dataset.gameId;
                this.fetchStats(gameId);
            })
        })
    }

    fetchStats(gameId){
        const options = {
            method: 'GET',
            url: 'https://free-nba.p.rapidapi.com/stats',
            params: {page: '0', per_page: '25', game_ids: [gameId]},
            headers: {
              'X-RapidAPI-Key': '54e8d1a6f4mshe9f62bb56442508p1ab909jsne54dd6094676',
              'X-RapidAPI-Host': 'free-nba.p.rapidapi.com'
            }
        };

        axios.request(options).then( (response) => {
            this.showStats(response);
        }).catch(function (error) {
            console.error(error);
        });
    }

    showStats(response){
        const statsDialog = document.querySelector(".js-stats-dialog");
        statsDialog.innerHTML = `<h2>${response.data.data[0].game.home_team_score}</h2> - <h2>${response.data.data[0].game.visitor_team_score}</h2>`;
        statsDialog.showModal();
    }
}

new Teams();
