import React from 'react';
import notFoundImg from '../assets/404.svg';

const NotFound = () => (
  <section className="text-center">
    <img
      src={notFoundImg}
      alt="Страница не найдена"
      className="img-fluid h-25"
    />
    <h1 className="h4 text-muted">Страница не найдена</h1>
    <p className="text-muted">
      Но вы можете перейти
      {' '}
      <a href="/">на главную страницу</a>
    </p>
  </section>
);

export default NotFound;
