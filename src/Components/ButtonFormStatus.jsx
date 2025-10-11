import {useFormStatus} from 'react-dom'
export default function ButtonFormStatus(){
    const {pending} = useFormStatus();
    return <button className="button" disabled={pending}>{pending ? 'Submitting...' : 'Submit form'}</button>
}