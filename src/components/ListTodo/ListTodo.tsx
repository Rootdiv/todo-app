import style from './ListTodo.module.sass';
import { Button } from 'react-bootstrap';
import { ITodo } from 'ITodo';

type Props = {
  todoList: ITodo[];
  completeTodo: (id: number) => void;
  removeTodo: (id: number) => void;
  editTodo: (id: number, title: string) => void;
};

export const ListTodo = ({ todoList, completeTodo, removeTodo, editTodo }: Props) => (
  <tbody className="align-middle">
    {todoList.map(({ id, title, priority, status }, index) => (
      <tr key={id} className={status ? 'table-success' : `table-${priority}`}>
        <td>{index + 1}</td>
        <td className="task">{title}</td>
        <td>{status ? 'Выполнена' : 'В процессе'}</td>
        <td className={style.buttons}>
          <Button variant="danger" onClick={() => removeTodo(id)}>
            Удалить
          </Button>
          <Button variant="secondary" onClick={() => editTodo(id, title)}>
            Редактировать
          </Button>
          <Button variant="success" disabled={status} onClick={() => completeTodo(id)}>
            Завершить
          </Button>
        </td>
      </tr>
    ))}
  </tbody>
);
