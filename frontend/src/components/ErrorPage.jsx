import { useTranslation } from 'react-i18next';

const ErrorPage = () => {
  const { t } = useTranslation();
  return (
    <div className="text-center">
      <h1 className="h4 text-muted">{t('notFoundPage.pageNotFound')}</h1>
      <p className="text-muted">
        {t('notFoundPage.transition')}
        {' '}
        <a href="/">{t('notFoundPage.toMainPage')}</a>
      </p>
    </div>
  );
};
export default ErrorPage;
