// use for test purpose
import SuperInput from '@Components/fragment/SuperInput';
import { StorageExtend } from '../utils/StorageManager'
import Umobi from '@Umobi';
import { useEffect } from 'react';
import { language } from '@Language';
import { observer } from 'mobx-react-lite';

const Playground = observer(props => {

    useEffect(() => {
        console.log('has key:',language.hasKey('enroll_example_of_id_link'))
        console.log('has value:',language.hasValue('enroll_example_of_id_link'))
    }, [])

    return (
        <>
        <div style={{ margin: 50, width: 500 }}>
            <>KEY? {language.listen('enroll_example_of_id_link', { keyOnMissing: true, keyWithBrackets: false, fallbackToEnglish: false })}</><br></br>
            <>VALUE? {language.listen('enroll_example_of_id_link', { keyOnMissing: false, keyWithBrackets: false, fallbackToEnglish: false })}</>
        </div>
        </>
    )
})

export default Playground