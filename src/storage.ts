import { ITodo } from 'ITodo';

export const getStorage = (key: string): [] => {
  if (localStorage.getItem(key)) {
    return JSON.parse(localStorage.getItem(key) || '');
  }
  return [];
};

export const setStorage = (login: string, todoList: ITodo[]): void => {
  localStorage.setItem(login, JSON.stringify(todoList));
};
