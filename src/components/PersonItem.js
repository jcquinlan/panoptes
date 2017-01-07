import React from 'react';
import { Card, CardText, CardHeader } from 'material-ui/Card';

const PersonItem = (props) => {

    return (
        <Card>
            <CardHeader
                title={ props.person['first-name'] + ' ' + props.person['last-name'] }
                titleStyle={{ fontSize: '24px' }}
                />
            <CardText>
                <div className="row">
                    <div className="col-xs-6">
                        Test   
                    </div>

                    <div className="col-xs-6">
                          
                    </div>
                </div>
                
            </CardText>
        </Card>

    );
  }

export default PersonItem;
