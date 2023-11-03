import { useEffect, useState } from 'react';
import LeftbarStyle from './LeftbarStyle';
import Icon from '@mui/material/Icon/Icon';

const LeftBar: React.FC = () => {
  const widgets: any = [
    {
      __typename: 'Ft',
      name: 'popular faq',
      titleForDisplay: 'Popular FAQs',
      description: null,
      ic: {
        __typename: 'Icon',
        url: '#',
        name: 'FAQOrderTracking',
        title: null,
        viewBox: '0 0 64 64'
      },
      subtitleCollection: { __typename: 'FtSubtitleCollection', items: [Array] }
    },
    {
      __typename: 'Ft',
      name: 'order tracking',
      titleForDisplay: 'Order Tracking',
      description: null,
      ic: {
        __typename: 'Icon',
        url: '#',
        name: 'FAQOrderTracking',
        title: null,
        viewBox: '0 0 64 64'
      },
      subtitleCollection: { __typename: 'FtSubtitleCollection', items: [Array] }
    },
    {
      __typename: 'Subscribe',
      subscriptionBanner: {
        __typename: 'SubscriptionBanner',
        title: 'Stay in the know with Kmail!',
        description: [Object],
        buttonText: 'Sign up',
        icon: [Object],
        image: [Object]
      },
      popupModalCollection: {
        __typename: 'SubscribePopupModalCollection',
        items: [Array]
      }
    },
    {
      __typename: 'FaqHelpText',
      title: "Can't find the answer to your question?",
      description: { __typename: 'FaqHelpTextDescription', json: [Object] },
      cta: {
        __typename: 'Cta',
        name: 'Send us your question',
        url: '/contact-us/enquire'
      }
    },
    {
      __typename: 'Ft',
      name: 'delivery',
      titleForDisplay: 'Delivery',
      description: null,
      ic: {
        __typename: 'Icon',
        url: '#',
        name: 'FAQDelivery',
        title: null,
        viewBox: '0 0 64 64'
      },
      subtitleCollection: { __typename: 'FtSubtitleCollection', items: [Array] }
    },
    {
      __typename: 'Ft',
      name: 'onepass',
      titleForDisplay: 'OnePass',
      description: null,
      ic: {
        __typename: 'Icon',
        url: '#',
        name: 'FAQOnePassPurple',
        title: null,
        viewBox: '0 0 88 19'
      },
      subtitleCollection: { __typename: 'FtSubtitleCollection', items: [Array] }
    }
  ];
  const getTopicName = (item: string) => {
    return item.indexOf(' ') > 0 ? item.replace(/ /g, '-') : item;
  };
  const [selectedMenu, setSelectedMenu] = useState('');
  const [activeChildMenu, setActiveChildMenu] = useState('');

  const handleFAQClick = (pageName: string) => {};

  const handledChildFaqClick = (parentUrl: string, childUrl: string) => {
    setActiveChildMenu(childUrl);
  };

  return (
    <LeftbarStyle data-testid="leftbar">
      <div className="faq-leftbar-block">
        <>
          <div className="faq-leftbar-container">
            <div>
              <div className="iconTitleHolder">
                <button
                  className="faq-leftbar-back-button"
                  //   onClick={() => routerPush(`/${FAQ_PATH}/`)}
                >
                  <span className="" data-testid="leftbar-menu-title">
                    Help & FAQ
                  </span>
                </button>
              </div>
            </div>
          </div>
          {widgets?.map((item1: any) => {
            return (
              item1?.__typename === 'Ft' &&
              item1?.name !== 'popular faq' && (
                <div className="faq-leftbar-container" key={item1.name}>
                  <div>
                    <div
                      data-testid="icon-title-holder"
                      className={`iconTitleHolder ${
                        selectedMenu === getTopicName(item1?.name as string)
                          ? 'iconTitleHolderActive'
                          : ''
                      }`}
                    >
                      <button
                        data-testid="title-holder"
                        className={`titleHolder ${
                          selectedMenu === getTopicName(item1?.name as string)
                            ? 'titleHolderActive toggle faq-leftbar-button '
                            : 'toggle faq-leftbar-button '
                        }`}
                        onClick={() => handleFAQClick(item1?.name as string)}
                      >
                        {' '}
                        {item1.name !== 'onepass' && (
                          <>
                            {/* <span className="svgIcons">
                              <Icon
                                loader={imageSrcResolver}
                                src={(item1?.ic?.name as string) ?? ''}
                                alt={item1?.ic?.title ?? ''}
                                key={item1?.ic?.name}
                                name={item1?.ic?.name}
                                viewBox={item1?.ic?.viewBox as string}
                                color="#222222"
                                hoverColor="#ffffff"
                              />{' '}
                            </span> */}
                            <span
                              className="faq-leftbar-title"
                              data-testid="faq-leftbar-title"
                            >
                              {item1?.titleForDisplay}
                            </span>
                          </>
                        )}
                        {item1.name === 'onepass' && (
                          <>
                            <span className="svgIcons">
                              {/* <Icon
                                loader={imageSrcResolver}
                                src={(item1?.ic?.name as string) ?? ''}
                                alt={item1?.ic?.title ?? ''}
                                key={item1?.ic?.name}
                                name={item1?.ic?.name as Icons}
                                viewBox={item1?.ic?.viewBox as string}
                                color="#9900f1"
                                hoverColor="#ffffff"
                                className="onePassFAQSVG"
                              />{' '} */}
                            </span>
                          </>
                        )}
                      </button>
                    </div>

                    <div
                      className={`${
                        selectedMenu === getTopicName(item1?.name as string) &&
                        'show'
                      } show faq-leftbar-content`}
                    >
                      {item1?.subtitleCollection?.items.map((item2: any) => {
                        return (
                          <div key={item2?.st}>
                            <button
                              className="leftbar-subtitle-button"
                              data-testid="leftbar-child-subtitle-button"
                              onClick={() =>
                                handledChildFaqClick(
                                  item1?.name as string,
                                  item2?.url as string
                                )
                              }
                            >
                              <div
                                data-testid="faq-leftbar-subtitle"
                                className={`${
                                  activeChildMenu === (item2?.url as string)
                                    ? 'underline'
                                    : ''
                                } faq-leftbar-subtitle`}
                              >
                                {item2?.st}
                              </div>
                            </button>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )
            );
          })}
        </>
      </div>
    </LeftbarStyle>
  );
};

export default LeftBar;
