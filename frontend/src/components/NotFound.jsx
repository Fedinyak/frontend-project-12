import React from 'react';
import { useTranslation } from 'react-i18next';
import notFoundImg from '../assets/404.svg';

const NotFound = () => {
  const { t } = useTranslation();
  return (
    <section className="text-center">
      <img
        src={notFoundImg}
        alt={t('chat.pageNotFound')}
        className="img-fluid h-25"
      />
      <h1 className="h4 text-muted">{t('chat.pageNotFound')}</h1>
      <p className="text-muted">
        {t('chat.youCanGoTo')}
        {' '}
        <a href="/">{t('chat.mainPage')}</a>
      </p>
    </section>
  );
};

export default NotFound;
