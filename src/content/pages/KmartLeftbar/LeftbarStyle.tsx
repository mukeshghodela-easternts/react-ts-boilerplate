import { styled } from '@mui/material';

export default styled('div')(
  ({ theme }) => `
  width: 100%;
  grid-column: 1 / 4 !important;
  padding: 0 !important;
  margin: 0 !important;
  margin-bottom: 2rem !important;
  .faq-leftbar-block {
    .faq-leftbar-container {
      transition: all 0.6s;

      border-top: 1px solid #e7e7e7;
      border-bottom: 1px solid #e7e7e7;
      border-left: 2px solid #e7e7e7;
      border-right: 2px solid #e7e7e7;

      .iconTitleHolder {
        display: flex;
        justify-content: left;
        align-items: center;
        flex-direction: row;
        height: 48px;

        &:hover {
          background: #e7e7e7;
          color: #222 !important;
        }
        .faq-leftbar-main-title {
          padding: 1rem;
          width: 100%;
          background: #253746;
          color: #fff !important;
        }

        .faq-leftbar-button {
          border: none;
          background: transparent;
          width: 100%;
          height: 100%;
          padding: 0.5rem;
          margin: 0;
          text-align: left;
          text-transform: capitalize;
          display: flex;
          align-items: center;
          font-size: 1rem;
          cursor: pointer;
          ${(props: {
            theme: { breakpoints: { down: (arg0: string) => any } };
          }) => props.theme.breakpoints.down('md')} {
            padding: 0.5rem 1rem;
          }

          .faq-leftbar-title {
            padding: 1px 8px;
          }

          &:hover,
          &:hover > span * {
            color: #222;
            fill: #222;
            ${(props: {
              theme: { breakpoints: { down: (arg0: string) => any } };
            }) => props.theme.breakpoints.down('md')} {
              color: #222;
              fill: #222;
            }
          }
          .svgIcons {
            svg {
              width: 2rem;
            }
            .onePassFAQSVG {
              padding: 0.7rem 0;

              svg {
                width: 4rem;
              }
            }
          }
        }
        .faq-leftbar-back-button {
          border: none;
          background: #fff;
          width: 100%;
          height: 100%;
          padding: 1rem;
          margin: 0;
          text-align: left;
          text-transform: capitalize;
          display: flex;
          align-items: center;
          font-size: 1rem;
          color: #222;
          cursor: pointer;
          ${(props: {
            theme: { breakpoints: { down: (arg0: string) => any } };
          }) => props.theme.breakpoints.down('md')} {
          }

          .faq-leftbar-title {
            padding: 1px 8px;
          }

          &:hover,
          &:hover > span * {
            color: #222 !important;
            fill: #e7e7e7 !important;
            background: #e7e7e7;
          }
          .svgIcons {
            svg {
              width: 2rem;
            }
            .onePassFAQSVG {
              padding: 0.7rem 0;

              svg {
                width: 4rem;
              }
            }
          }
        }
      }
      .iconTitleHolderActive {
        background: #253746;
        color: #fff !important;
        svg {
          path {
            fill: #fff;
          }
        }
      }
      .titleHolderActive {
        color: #fff !important;
        ${(props: {
          theme: { breakpoints: { down: (arg0: string) => any } };
        }) => props.theme.breakpoints.down('md')} {
          background: #253746 !important;
          color: #fff !important;
          &:hover,
          &:hover > span * {
            color: #fff !important;
            fill: #fff !important;
          }
        }
      }

      .faq-leftbar-content {
        width: auto;
        height: auto;
        margin-top: 10px;
        display: none;
        justify-content: center;
        color: #222222 !important;
        text-decoration: none !important;
        .leftbar-subtitle-button {
          border: none;
          background: transparent;
          width: 100%;
          height: 100%;
          padding: 1px 8px;
          margin: 0;
          text-align: center;
          text-transform: capitalize;
          color: #222222 !important;
          font-size: 1rem;
          .underline {
            text-decoration: underline;
          }
          :hover {
            cursor: pointer;
          }
          .faq-leftbar-subtitle {
            text-align: left;
            padding-left: 2.5rem;
            margin-bottom: 8px;
          }
        }
        .faq-mobile-subtitle {
          color: #222222 !important;
          text-decoration: none !important;
        }
      }

      .show {
        display: flex;
        flex-direction: column;
        justify-content: left;
        align-items: left;
      }
    }
  }
`
);
