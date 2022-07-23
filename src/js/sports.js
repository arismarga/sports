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
}

new Teams();
