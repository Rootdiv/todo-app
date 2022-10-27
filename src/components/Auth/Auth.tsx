import { ChangeEvent, Dispatch, FormEvent, SetStateAction, useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import style from './Auth.module.sass';

type Props = {
  setLogin: Dispatch<SetStateAction<string>>;
};

export const Auth = ({ setLogin }: Props) => {
  const [username, setUsername] = useState('');

  const handlerSubmit = (event: FormEvent<EventTarget>) => {
    event.preventDefault();
    setLogin(username);
  };

  const handlerChange = (event: ChangeEvent<EventTarget>) => {
    if (event.target instanceof HTMLInputElement) {
      setUsername(event.target.value);
    }
  };

  return (
    <div className={style.wrapper}>
      <h2 className={style.title}>Введите ваше имя</h2>
      <Form className={style.form} onSubmit={handlerSubmit}>
        <Form.Control type="text" onChange={handlerChange} />
        <Button type="submit" variant="primary" disabled={!username}>
          Войти
        </Button>
      </Form>
    </div>
  );
};
