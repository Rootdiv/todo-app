import { useState, useEffect } from 'react';
import Container from 'components/Container';
import Auth from 'components/Auth';
import AddTodo from 'components/AddTodo';
import ListTodo from 'components/ListTodo';
import { Table } from 'react-bootstrap';
import { getStorage, setStorage } from 'storage';
import { ITodo } from 'ITodo';

const App = () => {
  const [login, setLogin] = useState('');
  const [todoList, setTodoList] = useState<ITodo[]>([]);

  useEffect(() => {
    setTodoList(getStorage(login));
  }, [login]);

  useEffect(() => {
    login && setStorage(login, todoList);
  }, [login, todoList]);

  const completeTodo = (id: number): void => {
    setTodoList(
      todoList.map(todo => {
        if (todo.id !== id) {
          return todo;
        }
        return {
          ...todo,
          status: true,
        };
      }),
    );
  };

  const removeTodo = (id: number): void => {
    if (window.confirm('Удалить задачу?')) {
      setTodoList(todoList.filter(todo => todo.id !== id));
    }
  };

  const editTodo = (id: number, title: string): void => {
    const editTask: string | null = window.prompt('Отредактируйте задачу', title);
    if (typeof editTask !== 'string') return;
    setTodoList(
      todoList.map(item => {
        if (item.id !== id) {
          return item;
        }
        return {
          ...item,
          title: editTask,
        };
      }),
    );
  };

  return (
    <Container>
      <h3>Todo App</h3>
      {!login ? (
        <Auth setLogin={setLogin} />
      ) : (
        <>
          <AddTodo login={login} todoList={todoList} setTodoList={setTodoList} />
          <div className="table-wrapper">
            <Table hover bordered>
              <thead className="text-center">
                <tr>
                  <th>№</th>
                  <th>Задача</th>
                  <th>Статус</th>
                  <th>Действия</th>
                </tr>
              </thead>
              <ListTodo todoList={todoList} completeTodo={completeTodo} removeTodo={removeTodo} editTodo={editTodo} />
            </Table>
          </div>
        </>
      )}
    </Container>
  );
};

export default App;
