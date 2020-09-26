import React, { Component } from 'react';
import { Text, View, TouchableOpacity, StyleSheet, FlatList } from 'react-native';

import {WidthDimen, HeightDimen, fontDimen, GetWidth, GetHeight} from '../UI/Dimensions';
import {MainColor, FontMainColor, FontSecondaryColor, FontThirdColor} from '../UI/Color';

import Card from '../Component/Card/Card';
import { PopUp } from '../Component/PopUp/PopUp';

class MainScreen extends Component {

    state = {
        total_steps: 0,
        card_arr: [],
        matched_arr: [],

        card_num: 12,

        selected_pairs: 0,
        selected_index: 0,

        show_popUp: false
    }

    constructor(props) {
        super(props);
        this.card_ref = {}; 
    }

    componentDidMount() {
        const temp_card_arr = this.CARD_PAIRS_VALUE();
        this.setState({card_arr: temp_card_arr});
    }

    //Generate unique number pairs between 1-100 
    CARD_PAIRS_VALUE = () => {

        var random_num = [];
        for(let i = 0; i < this.state.card_num / 2; i++) {
            var ran = Math.floor(Math.random() * 100) + 1;
            if(random_num.indexOf(ran) < 0) {
                random_num.push(ran);
            } else {
                i--;
            }
        }
     
        var temp_card_arr = [];
        for(let i = 0; i < this.state.card_num; i+=2) {
            temp_card_arr.push({
                id: i + 1,
                num: random_num[0],
            })
            temp_card_arr.push({
                id: i + 2,
                num: random_num[0],
            })
            random_num.splice(0, 1);
        }

        for (let i = temp_card_arr.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [temp_card_arr[i], temp_card_arr[j]] = [temp_card_arr[j], temp_card_arr[i]];
        }

        return temp_card_arr;

       
      
    }

    //Check matching status
    onPress_select_card = (index) => {
        if(this.state.selected_pairs === 0) {
            this.setState({
                selected_pairs: this.state.card_arr[index].num,
                selected_index: index
            });
        } else {
            if(this.state.selected_pairs === this.state.card_arr[index].num) {
                let temp_matched_arr = this.state.matched_arr;
                temp_matched_arr.push(index);
                temp_matched_arr.push(this.state.selected_index);
                if(temp_matched_arr.length == this.state.card_num) {
                    setTimeout(() => { 
                        this.setState({show_popUp: true, matched_arr: temp_matched_arr});
                    }, 1000); 
                } else {
                    this.setState({matched_arr: temp_matched_arr});
                }

            } else {
                this.wrong_match([this.state.selected_index, index]);
             
            }
            this.setState({selected_pairs: 0});
        }
    }

    //Flip card after 1 second when wrong match detected
    wrong_match = (pairs) => {
        for(let i = 0; i < pairs.length; i++) {
            setTimeout(() => { 
                this.card_ref[pairs[i]].flipCard(); 
            }, 1000);  
        }
    }

    //Flip all front facing cards
    flip_all_card = () => {
        return new Promise((resolve, reject) => {
            let temp_matched_arr = this.state.matched_arr;
            setTimeout(() => { 
                for(let i = 0; i < temp_matched_arr.length; i++) {
                    this.card_ref[temp_matched_arr[i]].flipCard(); 
                }
            }, 10);  
            setTimeout(resolve, 500);
        });
    }

    //Generate new numbers and reset all states
    restart_game = async () => {
        await this.flip_all_card();
        const temp_card_arr = this.CARD_PAIRS_VALUE();
        this.setState({
            total_steps: 0,
            card_arr: temp_card_arr,
            matched_arr: [],

            selected_pairs: 0,
            selected_index: 0,

            show_popUp: false
        });
    }

    //Update steps
    update_steps = () => {
        this.setState({
            total_steps: this.state.total_steps + 1
        })
    }

    //Renderer for score and restart button
    render_score_restart = () => {
        return (
            <View style={styles.score_container}>
                <TouchableOpacity onPress={() => this.restart_game()}>
                    <View>
                        <Text style={styles.restart}>Restart</Text>
                    </View>
                </TouchableOpacity>
                <View style={{flex: 1}}></View>
                <Text style={styles.score_topic}>STEPS: </Text>
                <Text style={styles.score}>{this.state.total_steps}</Text>
            </View>
        )
    }

    //Renderer for cards 
    render_card = () => {
        return (
            <View style={styles.card_container}>
                <FlatList
                    style={{flexGrow: 0}}
                    data={this.state.card_arr}
                    numColumns={3}
                    renderItem={({ item, index }) => (
                        <Card
                            id={index}
                            label={item.num}
                            update_steps={this.update_steps}
                            onPress_select_card={this.onPress_select_card}
                            onRef={(ref) => this.card_ref[index] = ref}
                        />
                    )}
                    keyExtractor={item => String(item.id)}
                />
            </View>
        )
        
    }

    //Renderer for result pop up
    render_popUp = () => {
        return (
            <PopUp
                toShow={this.state.show_popUp}
                label={'You win this game by ' + this.state.total_steps + ' steps!'}
                onPress={() => this.restart_game()}
            />
        )
    }

    render() {
        return (
            <View style={styles.container}>
                <this.render_score_restart/>
                <this.render_card/>
                <this.render_popUp/>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'grey'
    },
    score_container: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        margin: WidthDimen(15)
    },
    card_container: {
        flex: 1, 
        justifyContent: 'center', 
        alignItems: 'center'
    },
    score_topic: {
        fontSize: fontDimen(30),
        color: FontThirdColor
    },
    score: {
        fontSize: fontDimen(30),
        color: FontSecondaryColor
    },
    restart: {
        fontSize: fontDimen(20),
        color: FontSecondaryColor
    }

});

export default MainScreen;