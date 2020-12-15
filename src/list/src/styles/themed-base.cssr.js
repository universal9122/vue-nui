import { cTB, c, cB, cE, cM, insideModal } from '../../../_utils/cssr'

export default c([
  ({ props }) => {
    const {
      $global: {
        cubicBezierEaseInOut
      },
      $local
    } = props
    const {
      fontSize,
      textColor,
      color,
      colorModal,
      borderColor,
      borderRadius
    } = $local
    return [
      cTB('list', {
        raw: `
          font-size: ${fontSize};
          transition:
            background-color .3s ${cubicBezierEaseInOut},
            color .3s ${cubicBezierEaseInOut},
            border-color .3s ${cubicBezierEaseInOut};
          padding: 0;
          list-style-type: none;
          color: ${textColor};
        `
      }, [
        cM('bordered', {
          raw: `
            background-color: ${color};
            border-radius: ${borderRadius};
            border: 1px solid ${borderColor};
          `
        }, [
          cB('list-item', {
            raw: `
              padding: 12px 20px;
            `
          }, [
            c('&:not(:last-child)', {
              raw: `
                border-bottom: 1px solid ${borderColor};
              `
            })
          ]),
          cE('header, footer', {
            raw: `
              padding: 12px 20px;
            `
          }, [
            c('&:not(:last-child)', {
              raw: `
                border-bottom: 1px solid ${borderColor};
              `
            })
          ])
        ]),
        cE('header, footer', {
          raw: `
            padding: 12px 0;
            box-sizing: border-box;
            transition: border-color .3s ${cubicBezierEaseInOut};
          `
        }, [
          c('&:not(:last-child)', {
            raw: `
              border-bottom: 1px solid ${borderColor};
            `
          })
        ]),
        cB('list-item', {
          raw: `
            padding: 12px 0;    
            box-sizing: border-box;
            display: flex;
            flex-wrap: nowrap;
            align-items: center;
            transition: border-color .3s ${cubicBezierEaseInOut};
          `
        }, [
          cE('prefix', {
            raw: `
              margin-right: 20px;
              flex: 0;
            `
          }),
          cE('suffix', {
            raw: `
              margin-left: 20px;
              flex: 0;
            `
          }),
          cE('main', {
            raw: `
              flex: 1;
            `
          }),
          c('&:not(:last-child)', {
            raw: `
              border-bottom: 1px solid ${borderColor};
            `
          })
        ])
      ]),
      insideModal(
        cTB('list', [
          cM('bordered', {
            raw: `
              background-color: ${colorModal};
            `
          })
        ])
      )
    ]
  }
])
