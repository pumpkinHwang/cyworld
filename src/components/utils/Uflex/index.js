import { UflexLayout, UflexHeader, UflexContent, UflexFooter } from './Layout';
import { UflexRow } from './Row';
import { UflexCol } from './Col';

const Uflex = props => <></>

/**
 * @param {boolean} h100 set height to 100%.
 * 
 * @param {object} props 
 * @param {string|'auto'} props.flex 
 * @param {'center'|'start'|'end'|'space-around'|'space-between'|'space-evenly'} props.justify
 * @param {'middle'|'top'|'bottom'} props.align
 * @param {object|'row'|'row-reverse'|'column'|'column-reverse'|'inherit'|'initial'|'unset'} props.direction
 * @param {number|array} props.gutter
 * @param {boolean} props.h100
 */
const Row = props => <UflexRow {...props}/>

/**
 * @param {boolean} h100 set height to 100%.
 * 
 * @param {object} props 
 * @param {string|number|'auto'} props.flex 
 * @param {'center'|'start'|'end'|'space-around'|'space-between'|'space-evenly'} props.justify
 * @param {'middle'|'top'|'bottom'} props.align
 * @param {object|'row'|'row-reverse'|'column'|'column-reverse'} props.direction
 * @param {number} props.offset
 * @param {number} props.order
 * @param {number} props.pull
 * @param {number} props.push
 * @param {number} props.span
 * @param {number|object} props.xs
 * @param {number|object} props.sm
 * @param {number|object} props.md
 * @param {number|object} props.lg
 * @param {number|object} props.xl
 * @param {number|object} props.xxl
 * @param {boolean} props.h100
 */
const Col = props => <UflexCol {...props}/>
const Layout = props => <UflexLayout {...props}/>
const Header = props => <UflexHeader {...props}/>
/**
 * @param {*} props 
 * @param {boolean} props.h100 set height to 100%.
 * @param {number|string} props.minHeight set min-height.
 */
const Content = props => <UflexContent {...props}/>
const Footer = props => <UflexFooter {...props}/>

Uflex.Row = Row
Uflex.Col = Col
Uflex.Layout = Layout
Uflex.Header = Header
Uflex.Content = Content
Uflex.Footer = Footer

export default Uflex
export { Row, Col, Layout, Header, Content, Footer }