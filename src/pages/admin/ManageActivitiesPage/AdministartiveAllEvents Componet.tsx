
import  { useState } from 'react';
import AdministrativeComponent from './AdministrativeComponent';
import AdministiveCalentComponet from './AdministiveCalentComponet';

function ParentComponent() {
    const [showAdministrativeComponent, setShowAdministrativeComponent] = useState(true);

    const switchComponent = (values:any) => {
        console.log(values);
        setShowAdministrativeComponent(prevState => !prevState);
    }
    return (
<div>
            {showAdministrativeComponent 
                ? <AdministrativeComponent switchComponent={switchComponent} /> 
                : <AdministiveCalentComponet switchComponent={switchComponent} />}
</div>
    );
}

export default ParentComponent;





