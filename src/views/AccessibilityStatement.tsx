import React from 'react';
import { Helmet } from 'react-helmet';
import { inject, observer } from 'mobx-react';
import get from 'lodash/get';
import ReactMarkdown from 'react-markdown';

import CMSPage from '../components/CMSPageLayout';
import CMSStore from '../stores/CMSStore';

interface IProps {
  cmsStore: CMSStore;
}

const AccessibilityStatement: React.FunctionComponent<IProps> = ({ cmsStore }) => {
  if (!cmsStore) {
    return null;
  }

  return (
    <CMSPage title={get(cmsStore, 'accessibility_statement.title')} breadcrumb="Accessibility statement">
      <Helmet>
        <title>Accessibility statement | Sutton Information Hub</title>
      </Helmet>

      <ReactMarkdown
        className="markdown"
        children={get(cmsStore, 'accessibility_statement.content')}
      />
    </CMSPage>
  );
};

export default inject('cmsStore')(observer(AccessibilityStatement));
