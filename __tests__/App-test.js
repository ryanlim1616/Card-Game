/**
 * @format
 */

import 'react-native';
import React from 'react';
import MainScreen from '../src/Screen/MainScreen';


// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

let MainScreen_data =  renderer.create(<MainScreen />).getInstance();

it('Should Return an array with 12 elements and 6 different number (1 - 100)', () => {
  let ran_arr = MainScreen_data.CARD_PAIRS_VALUE();
  expect(ran_arr.length).toBe(12);
  for(let i = 0; i < ran_arr.length; i++) {
    expect(ran_arr[i]).toHaveProperty('id');
    expect(ran_arr[i]).toHaveProperty('num');
    expect(ran_arr[i].id).toBeGreaterThanOrEqual(1);
    expect(ran_arr[i].id).toBeLessThanOrEqual(100);
  }
  let only_num = [];
  for(let i = 0; i < ran_arr.length; i++) {
    if(only_num.indexOf(ran_arr[i].num) < 0)
      only_num.push(ran_arr[i].num);
  }
  expect(only_num.length).toBe(6);
  const unique_num = arr => Array.isArray(arr) && new Set(arr).size === arr.length;
  expect(unique_num(only_num)).toBeTruthy();
});

it('Should update the state (selected_pairs, selected_index) when first card flop', () => {
  MainScreen_data.state.selected_pairs = 0;
  
  let random_index = Math.floor(Math.random() * 11);
  MainScreen_data.onPress_select_card(random_index);

  expect(MainScreen_data.state.selected_pairs).toEqual(MainScreen_data.state.card_arr[random_index].num);
  expect(MainScreen_data.state.selected_index).toEqual(random_index);
 
});

it('Should update the state (show_popUp, matched_arr) when all cards are matched', async () => {

  let random_index = Math.floor(Math.random() * 11);
  MainScreen_data.state.selected_pairs = MainScreen_data.state.card_arr[random_index].num;
  MainScreen_data.state.matched_arr = [1,2,3,4,5,6,7,8,9,10];
  let length = MainScreen_data.state.matched_arr.length;
  
  MainScreen_data.onPress_select_card(random_index);
  await new Promise((r) => setTimeout(r, 1000));
  expect(MainScreen_data.state.show_popUp).toEqual(true);
  expect(MainScreen_data.state.matched_arr.length).toEqual(length + 2);
 
});

it('Should update the state (matched_arr) when cards are matched', async () => {

  let random_index = Math.floor(Math.random() * 11);
  MainScreen_data.state.selected_pairs = MainScreen_data.state.card_arr[random_index].num;
  let length = MainScreen_data.state.matched_arr.length;
  
  MainScreen_data.onPress_select_card(random_index);
  expect(MainScreen_data.state.matched_arr.length).toEqual(length + 2);
 
});

it('Should increase the steps by 1', () => {
 
  let curr_steps = MainScreen_data.state.total_steps;
  MainScreen_data.update_steps();
  expect(MainScreen_data.state.total_steps).toEqual(curr_steps + 1);
 
});
