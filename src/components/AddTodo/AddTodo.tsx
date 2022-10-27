import style from './AddTodo.module.sass';
import { Button, Form } from 'react-bootstrap';
import { useEffect, useState, ChangeEvent, FormEvent, Dispatch, SetStateAction } from 'react';
import { setStorage } from 'storage';
import { ITodo } from 'ITodo';

type Props = {
  login: string;
  todoList: ITodo[];
  setTodoList: Dispatch<SetStateAction<ITodo[]>>;
};

export const AddTodo = ({ login, todoList, setTodoList }: Props) => {
  const [task, setTask] = useState('');
  const [isTodoList, setIsTodoList] = useState(false);
  const [selectValue, setSelectValue] = useState('light');

  useEffect(() => {
    if (isTodoList && todoList.length > 0) {
      setStorage(login, todoList);
    }
  }, [login, isTodoList, todoList]);

  const handlerChange = (event: ChangeEvent<EventTarget>) => {
    if (event.target instanceof HTMLInputElement) {
      setTask(event.target.value);
    }
  };

  const selectChange = (event: ChangeEvent<EventTarget>) => {
    if (event.target instanceof HTMLSelectElement) {
      setSelectValue(event.target.value);
    }
  };

  const addTaskTodo = (event: FormEvent<EventTarget>) => {
    event.preventDefault();
    if (todoList.some(item => item.title === task)) {
      alert('Задача с таким именем уже есть');
      return;
    }
    setTodoList([
      ...todoList,
      {
        id: Math.floor(Math.random() * 10e2),
        title: task,
        priority: selectValue,
        status: false,
      },
    ]);
    setTask('');
    setIsTodoList(true);
    setSelectValue('light');
  };

  const reset = () => {
    setTask('');
    setSelectValue('light');
  };

  return (
    <Form className={style.form} onSubmit={addTaskTodo}>
      <Form.Control type="text" placeholder="Ввести задачу" value={task} onChange={handlerChange} />
      <Form.Select value={selectValue} onChange={selectChange}>
        <option value="light">Обычная</option>
        <option value="warning">Важная</option>
        <option value="danger">Срочная</option>
      </Form.Select>
      <Button variant="primary" type="submit" onClick={addTaskTodo}>
        Сохранить
      </Button>
      <Button variant="warning" type="reset" onClick={reset}>
        Очистить
      </Button>
    </Form>
  );
};
