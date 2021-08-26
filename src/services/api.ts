import axios from 'axios';

export const api = axios.create({
  baseURL: 'https://api.themoviedb.org/3/',
  params: {
    api_key: 'e125d46a9e74f39d2ecafa3b18ce627d',
    language: 'pt-BR',
  }
});
