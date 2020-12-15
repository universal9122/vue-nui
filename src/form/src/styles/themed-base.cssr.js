import { cTB, c, cB, cM, createKey } from '../../../_utils/cssr'
import fadeDownTranstion from '../../../_styles/transitions/fade-down'
import { pxfy, depx } from 'seemly'

export default c([
  ({ props }) => {
    const {
      $local,
      $global: {
        cubicBezierEaseInOut
      }
    } = props
    const {
      labelTextColor,
      asteriskColor,
      feedbackTextColorError,
      feedbackTextColorWarning,
      labelPaddingHorizontal,
      labelPaddingVertical,
      labelTextAlignHorizontal,
      lineHeight
    } = $local
    return [
      cB('form', {
        width: '100%',
        lineHeight
      }, [
        cM('inline', {
          width: '100%',
          display: 'inline-flex',
          alignItems: 'flex-start',
          alignContent: 'space-around'
        }, [
          cB('form-item', {
            width: 'auto'
          }, [
            c('&:last-child', {
              marginRight: 0
            })
          ])
        ])
      ]),
      cTB('form-item', {
        width: '100%'
      }, [
        ['small', 'medium', 'large'].map(size => {
          const {
            [createKey('blankHeight', size)]: blankHeight,
            [createKey('feedbackFontSize', size)]: feedbackFontSize,
            [createKey('labelFontSizeTop', size)]: labelFontSizeTop,
            [createKey('labelFontSizeLeft', size)]: labelFontSizeLeft,
            [createKey('labelHeight', size)]: labelHeight
          } = $local
          return cM(size + '-size', [
            cM('top-labelled', [
              cM('no-label', {
                paddingTop: labelHeight
              }),
              cB('form-item-label', {
                fontSize: labelFontSizeTop,
                height: labelHeight
              })
            ]),
            cB('form-item-blank', {
              minHeight: pxfy(depx(blankHeight) + 6)
            }),
            cM('left-labelled', [
              cB('form-item-label', {
                fontSize: labelFontSizeLeft,
                height: pxfy(depx(blankHeight) + 6),
                lineHeight: pxfy(depx(blankHeight) + 6)
              })
            ]),
            cB('form-item-feedback-wrapper', {
              minHeight: $local[createKey('feedbackHeight', size)],
              fontSize: feedbackFontSize
            })
          ])
        }),
        cM('top-labelled', {
          marginRight: '18px'
        }, [
          cB('form-item-label', {
            raw: `
              display: block;
              width: 100%;
              padding: ${labelPaddingVertical};
            `
          })
        ]),
        cM('left-labelled', {
          raw: `
            display: flex;
            flex-wrap: nowrap;
          `
        }, [
          cB('form-item-label', {
            raw: `
              box-sizing: border-box;
              padding: ${labelPaddingHorizontal};
              white-space: nowrap;
              flex-shrink: 0;
              flex-grow: 0;
            `
          }),
          cB('form-item-control', {
            flexGrow: 1
          })
        ]),
        cM('right-label-aligned', [
          cB('form-item-label', {
            textAlign: labelTextAlignHorizontal
          }, [
            c('&::after', {
              display: 'none'
            })
          ])
        ]),
        cM('left-label-aligned', [
          cB('form-item-label', {
            raw: `
              text-align: left;
            `
          }, [
            c('&::before', {
              raw: `
                display: none;
              `
            })
          ])
        ]),
        cB('form-item-blank', {
          raw: `
            box-sizing: border-box;
            padding-top: 3px;
            padding-bottom: 3px;
            display: flex;
            align-items: center;
            position: relative;
          `
        }),
        cM('required', [
          cB('form-item-label', [
            c('&::after, &::before', {
              raw: `
                content: ' *';
              `,
              color: asteriskColor
            })
          ])
        ]),
        cB('form-item-label', {
          raw: `
            display: inline-block;
            box-sizing: border-box;
            transition: color .3s ${cubicBezierEaseInOut};
          `,
          color: labelTextColor
        }, [
          c('&::after', {
            transition: `color .3s ${cubicBezierEaseInOut}`
          })
        ]),
        cB('form-item-feedback-wrapper', {
          raw: `
            padding-left: 2px;
            padding-top: 0px;
            box-sizing: border-box;
            min-height: 1.25em;
            transform-origin: top left;
            line-height: 1.25;
          `
        }, [
          cB('form-item-feedback', {
            transition: `color .3s ${cubicBezierEaseInOut}`
          }, [
            cM('error', {
              color: feedbackTextColorError
            }),
            cM('warning', {
              color: feedbackTextColorWarning
            }),
            fadeDownTranstion({
              fromOffset: '-3px',
              enterDuration: '.3s',
              leaveDuration: '.2s'
            })
          ])
        ])
      ])
    ]
  }
])
