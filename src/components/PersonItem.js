import React from 'react';
import { Card, CardText, CardHeader } from 'material-ui/Card';
import PersonTimeTable from './PersonTimeTable';

const PersonItem = (props) => {
    return (
        <Card>
            <CardHeader
                title={ props.person['first-name'] + ' ' + props.person['last-name'] }
                titleStyle={{ fontSize: '24px' }}
                />
            <CardText>
                <div className="row">
                    <div className="col-xs-12">
                        <PersonTimeTable person={ props.person } times={ props.times }/>
                    </div>
                </div>
                
            </CardText>
        </Card>

    );
  }

export default PersonItem;
