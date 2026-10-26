import { useId } from 'react';
import { useTranslation } from 'react-i18next';
import { ArrowLeft } from '../Components/Icons/Arrows';
import { PrimaryLink, SecondaryLink } from '../Components/Shared/Actions';
import { Page, Content, ErrorCode, Heading, Message, Actions } from './404Page.styles';

const Page404 = () => {
  const { t } = useTranslation('common');
  const headingId = useId();

  return (
    <Page aria-labelledby={headingId}>
      <Content>
        <ErrorCode>404</ErrorCode>
        <Heading id={headingId}>{t('notFound.title')}</Heading>
        <Message>{t('notFound.description')}</Message>
        <Actions>
          <PrimaryLink to="/">
            <span aria-hidden="true"><ArrowLeft size={16} /></span>
            {t('notFound.home')}
          </PrimaryLink>
          <SecondaryLink to="/projects">{t('notFound.projects')}</SecondaryLink>
        </Actions>
      </Content>
    </Page>
  );
};

export default Page404;
