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
}

new Teams();
