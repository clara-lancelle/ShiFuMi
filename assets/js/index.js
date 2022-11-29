// ShiFuMi 

"use strict";

// create list : pierre / feuille / ciseaux / lezard / spock
// joue jusque 3 vic

// create obj game 

let game = {
    init: function () {

        this.vicIa = 0;
        this.vicUser = 0;
        this.userChoice = 0;
        this.section = document.querySelector('.gameResult');
        //compteur de victoire :
        this.text_victory = '';
        this.count = 0;


        this.actions = {
            '1': { nom: 'Pierre' },
            '2': { nom: 'Papier' },
            '3': { nom: 'Ciseaux' },
            '4': { nom: 'Lezard' },
            '5': { nom: 'Spock' },
        };

        
        document.body.addEventListener('click', (event) => {
            if (event.target.className == 'btn' || event.target.className == 'gameImg') {

                if (event.target.className == 'gameImg') {
                    this.userChoice = event.target.parentNode.value;

                } else {
                    this.userChoice = event.target.value;
                }
                this.play(this.userChoice);
            }
            if(event.target.className == 'btn_replay') {
                this.reset();
               
            }
        },
            false);
    },


            play: function (player_bet) {
                let uc = Number(player_bet);
                // random number  
                let cc = Math.round(Math.random() * 4) + 1;

                if (this.vicIa < 3 && this.vicUser < 3)  // il faut 3 victoires
                {
                    this.sectionP = document.createElement('p');
                    this.sectionP.innerHTML += this.score(uc, cc);
                    this.section.appendChild(this.sectionP);
                    this.count++;
                }

                if ((this.vicIa >= 3 || this.vicUser >= 3))  // on a 3 victoires
                {
                    this.sectionH4 = document.createElement('h4');
                    this.sectionH4.innerHTML += this.result(this.vicUser, this.vicIa);
                    this.section.appendChild(this.sectionH4);
                    console.log(this.sectionP);
                    
                }
            },
        score: function (uc, cc) {
            // 1 bat 3 et 4 / 2 bat 1 et 5 / 3 bat 2 et 4 / 4 bat 2 et 5 / 5 bat 2 et 3
            let message = '';
            if ((uc == 1 && cc == 3) || (uc == 1 && cc == 4) ||
                (uc == 2 && cc == 1) || (uc == 2 && cc == 5) ||
                (uc == 3 && cc == 2) || (uc == 3 && cc == 4) ||
                (uc == 4 && cc == 2) || (uc == 4 && cc == 5) ||
                (uc == 5 && cc == 2) || (uc == 5 && cc == 3)) {
                // user won 
                message = 'Vous avez gagné ! <br> <br> Vous : ' + this.actions[uc].nom + '   <br> Computer : ' + this.actions[cc].nom;
                this.sectionP.classList.add('win');
                this.vicUser++;

            } else if (uc == cc) {
                //equality

                message = 'Egalité ! <br> <br> Vous : ' + this.actions[uc].nom + '   <br> Computer : ' + this.actions[cc].nom;
                this.sectionP.classList.add('equal');

            } else {
                //computer won

                message = 'Vous avez perdu.. <br> <br> Vous : ' + this.actions[uc].nom + ' <br> Computer : ' + this.actions[cc].nom;
                this.sectionP.classList.add('loose');
                this.vicIa++;

            }

            return message;

        },
        result: function (vicIa, vicUser) {
            let txtHTML = '';

            if (vicUser > vicIa) {
                this.text_victory = 'Vous avez perdu..';
                this.sectionH4.classList.add('loose');
            }
            else if (vicIa > vicUser) {
                this.text_victory = 'Vous avez gagné !';
                this.sectionH4.classList.add('win');

            } else {
                this.text_victory = '..';
            }

            txtHTML += "Résultat final (en " + this.count + " coups) : " + this.text_victory;
            txtHTML += "<button type=\"button\" class=\"btn_replay\">Rejouer ?</button><br />";
            return txtHTML;
        },

        reset:function() {
            this.txt_victory = '';

            let h4s = document.querySelectorAll('h4');
            for(let h4 of h4s) {
                h4.remove();
            }
            let ps = document.querySelectorAll('p');
            for(let p of ps) {
                p.remove();
            }
            this.vicIa = 0;
            this.vicUser = 0;
            this.count = 0;
          }
    }

// lancement du jeu : 
document.body.onload = function () {
        game.init(); // on initialise PFC
    };
