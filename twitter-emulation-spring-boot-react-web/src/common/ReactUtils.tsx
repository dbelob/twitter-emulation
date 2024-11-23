import { useParams } from 'react-router';

export default class ReactUtils {
    static withParams(Component: any) {
        return (props: any) => <Component {...props} params={useParams()}/>;
    }
}
