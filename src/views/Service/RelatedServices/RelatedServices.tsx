import React, { Component } from 'react';

import RelatedServicesCard from './RelatedServicesCard';
import { IService } from '../../../types/types';

import './RelatedServices.scss';
import Button from '../../../components/Button';

interface IProps {
  relatedServices: IService[];
}

interface IState {
  fullList: IService[];
  preview: IService[];
  showMore: boolean;
}

class RelatedServices extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.state = {
      fullList: [],
      preview: [],
      showMore: false,
    };
  }

  componentDidMount() {
    this.setState({
      fullList: this.props.relatedServices,
      preview: this.props.relatedServices.slice(0, 3),
    });
  }

  toggleMore = () => {
    this.setState((prevState) => ({
      showMore: !prevState.showMore,
    }));
  };

  render() {
    const { showMore, fullList, preview } = this.state;

    const relatedServices = showMore ? fullList : preview;
    return (
      <section className="related-services">
        <div className="related-services__header flex-container flex-container--justify-between flex-container--align-center">
          <div className="flex-col">
            <h2>Other results you might be interested in</h2>
          </div>
          <Button
            text={`Show ${showMore ? 'less' : 'more'} related services`}
            icon={showMore ? 'caret-up' : 'caret-down'}
            onClick={() => this.toggleMore()}
          />
        </div>

        <div className="flex-container">
          <div className="related-services__items">
            {relatedServices.map((service: IService) => (
              <RelatedServicesCard service={service} key={service.id} />
            ))}
          </div>
        </div>
      </section>
    );
  }
}

export default RelatedServices;
