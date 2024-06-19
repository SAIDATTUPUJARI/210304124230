const express = require('express');
const axios = require('axios');

const app = express();
const PORT = 9876;
const WINDOW_SIZE = 10;

const THIRD_PARTY_URLS = {
  'p': 'http://20.244.56.144/test/primes',
  'f': 'http://20.244.56.144/test/fibo',
  'e': 'http://20.244.56.144/test/even',
  'r': 'http://20.244.56.144/test/rand'
};
let window = [];

const fetchNumbers = async (url) => {
  try {
    const response = await axios.get(url, { timeout: 500 });
    if (response.status === 200) {
      const data = response.data;
      const numbersKey = Object.keys(data)[0];
      return data[numbersKey];
    }
  } catch (error) {
    console.error('Error fetching numbers:', error.message);
    return [];
  }
};
const updateWindow = (newNumbers) => {
    const uniqueNumbers = [...new Set(newNumbers)];
    uniqueNumbers.forEach(num => {
      if (!window.includes(num)) {
        if (window.length >= WINDOW_SIZE) {
          window.shift();
        }
        window.push(num);
      }
    });
  };
