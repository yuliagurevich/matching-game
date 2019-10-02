import React, { Component } from 'react';

import Card from '../Card/Card';

import './style.css';

class Table extends Component {
    constructor() {
        super();

        const cards = this.shafleCards([2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10]);

        this.state = {
            cards,
            turned: new Array(cards.length).fill(false),

            firstCardIndex: null,
            secondCardIndex: null,

            attempts: 0,
            score: null
        }
    }

    shafleCards(cards) {
        for (let i = cards.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * i)
            const temp = cards[i]
            cards[i] = cards[j]
            cards[j] = temp
          }
        return cards;
    }

    calculateScore = () => {
        const { attempts, cards } = this.state;

        let score = Math.floor((cards.length/attempts) * 100);

        return score;
    }

    handleClick = (index) => {
        const {firstCardIndex, secondCardIndex, turned, cards, attempts} = this.state;

        let _turned = [...turned];

        const handleFirstCard = () => {
            _turned[index] = true;
            this.setState({
                firstCardIndex: index,
                turned: _turned,
            });
        };

        const handleSecondCard = () => {
            _turned[index] = true;
            this.setState({
                turned: _turned,
                secondCardIndex: index,
                attempts: attempts + 1
            }, () => {
                if (cards[index] !== cards[firstCardIndex]) {
                    handleNotMatched();
                } else {
                    handleMatched();
                }
            });
        }

        const handleNotMatched = () => {
            setTimeout(() => {
                _turned[index] = false;
                _turned[firstCardIndex] = false;
                this.setState({
                    turned: _turned,
                    firstCardIndex: null,
                    secondCardIndex: null
                });
            }, 1000);
        }

        const handleMatched = () => {
            this.setState({
                firstCardIndex: null,
                secondCardIndex: null
            }, () => {
                let _estimate = this.state.turned.filter(card => card);
                if (_estimate.length === cards.length) {
                this.setState({
                    score: this.calculateScore()
                });
            }
            });
        }
        
        if (firstCardIndex === null) {
            handleFirstCard();
        }
        else if (firstCardIndex !== null && secondCardIndex === null) {
            handleSecondCard();
        }
    }

    renderCards(cards) {
        return cards.map((card, index) => {
            return (
                <Card
                    key={index}
                    card={card}
                    index={index}
                    isTurned={this.state.turned[index]}
                    onClick={this.handleClick}
                />);
        });
    }

    render() {
        const { cards, score } = this.state;
        return (
            <>
                <p id="score">{score !== null ? `Score: ${score}` : 'Matching game'}</p>
                <div id="table">
                    {this.renderCards(cards)}
                </div>
            </>
        );
    }
}

export default Table;